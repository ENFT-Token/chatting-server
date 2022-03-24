import 'package:socket_io_client/socket_io_client.dart' as IO;

main() {
  print("Hell0");
  // Dart client
  IO.Socket socket = IO.io('http://localhost:3000/', <String, dynamic>{
    'transports': ['websocket']
  });

  socket.onConnect((_) {
    print('connect');
    socket.emit('msg', 'test');
  });
  socket.on('event', (data) => print(data));
  socket.on('textMessage', (data) => print(data));
  socket.on('imageMessage', (data) => print(data));
  socket.onDisconnect((_) => print('disconnect'));
  socket.on('fromServer', (_) => print(_));
}