const io = require('socket.io')(8900, {
  cors: {
    origin: 'http://localhost:3000',
  },
});

let users = [];

// soketIdとuser._idをセットにして入れる。user._idから特定のsocketIdをもつuserを検索することができる
const addUser = (userId, socketId) => {
  // some　配列が条件を一つでも満たしていればtrue
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};
const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on('connection', (socket) => {
  // 接続した時
  console.log('a user connected.');

  // クライアントから情報を取得する場合、引数のsocketを取得する
  socket.on('addUser', (userId) => {
    addUser(userId, socket.id);
    io.emit('getUsers', users);
  });

  // send and get message
  socket.on('sendMessage', ({ senderId, receiverId, text }) => {
    // receiverIdから受信者のsocket.idを取得
    const user = getUser(receiverId);

    // 受信者を特定しclientへ送信
    io.to(user.socketId).emit('getMessage', { senderId, text });
  });

  // 切断する時;
  socket.on('disconnect', () => {
    console.log('a user disconnected');
    removeUser(socket.id);
    io.emit('getUsers', users);
  });
});
