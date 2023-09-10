const io = require('socket.io')(8900, {
  cors: {
    origin: 'http://localhost:3000',
  },
});

let users = [];

io.on('connection', (socket) => {
  console.log('a user connected.');
  // すべてのユーザーに送信の場合
  // io.emit('welcome', 'hello this is socket server');
  // 1人のユーザーに送信の場合
  io.to(si).emit('welcome', 'hello this is socket server');

  // クライアントから情報を取得する場合、引数のsocketを取得する
  socket.on('addUser', (userId) => {});
});
