const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema(
  {
    // memberのみ
    conversationId: {
      type: String,
    },
    // 送信者のid
    sender: {
      type: String,
    },
    // テキスト
    text: {
      type: String,
    },
  },

  { timestamps: true },
);

module.exports = mongoose.model('Message', MessageSchema);
