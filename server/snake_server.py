#!/usr/bin/env python

import socket, struct, hashlib, threading, cgi, base64

lock = threading.Lock()

def decode_key (key):
	guid = ""
	guid = "258EAFA5-E914-47DA-95CA-C5AB0DC85B11"
	newkey = key + guid
	sha = hashlib.sha1(newkey)
	return base64.b64encode(sha.digest())

def recv_data (client, length):
	data = client.recv(length)
	if not data: return data
#	print "Data Received: ", data
	begin = 2
	message = data[begin+4:len(data)]
	code = data[begin:begin+4]
	parsed_message = ""
	for i in range(0, len(message)):
		parsed_message += chr(ord(message[i])^ord(code[i%4]))
	return parsed_message

def send_data (client, data):
#	print "Sending Data"
	string = chr(129)
	string += chr(len(data))
	string += data
#	print "Sending %s to %s" % (data, client)
	return client.send(string)

def parse_headers (data):
	headers = {}
	lines = data.splitlines()
#	print "Headers as they are supposed to be:"
	for l in lines:
#		print l
		parts = l.split(": ", 1)
		if len(parts) == 2:
			headers[parts[0]] = parts[1]
	return headers

def handshake (client):
#	print 'Handshaking...'
	data = client.recv(1024)
	headers = parse_headers(data)
#	print 'Parsed headers:'
#	for k, v in headers.iteritems():
#		print k, ':', v
	shake = ""
	shake += "HTTP/1.1 101 Switching Protocols\r\n"
 	shake += "Upgrade: websocket\r\n" 
	shake += "Connection: Upgrade\r\n"
	shake += "Sec-WebSocket-Accept: %s\r\n" % decode_key(headers['Sec-WebSocket-Key'])
	shake += "\r\n"
#	print "Response Headers:"
#	print shake
	client.send(shake)

def handle (client, addr):
	global lock, prev, pairs
	handshake(client)
	if prev == 0:
			send_data(client, "start2")
			send_data(pairs[client], "start1")
	while 1:
		data = recv_data(client, 1024)
		if not data: break
#		print "Data processed: ", data
#		data = cgi.escape(data)
#		print "CGI DATA: ", data
#		lock.acquire()
#		print prev
		if prev == 0:
			send_data(client, data)
			send_data(pairs[client], data)
#		lock.release()
	print 'Client closed:', addr
	if prev == client:
		prev = 0
	prev = pairs[client]
	pairs.pop(client)
	pairs.pop(prev)
#	lock.acquire()
#	clients.remove(client)
#	lock.release()
#	client.close()
	
def start_server ():
	global pairs, prev
	s = socket.socket()
	s.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
	s.bind(('', 9110))
	s.listen(1)
	while True:
		conn, addr = s.accept()
		print 'Connection from: ', addr
		if prev == 0:
			prev = conn
		else:
			pairs[prev] = conn
			pairs[conn] = prev
			prev = 0
#		handle(conn, addr)
		threading.Thread(target = handle, args = (conn, addr)).start()

pairs = {}
prev = 0
print "Starting Server..."
try:
	start_server()
except KeyboardInterrupt:
	pass