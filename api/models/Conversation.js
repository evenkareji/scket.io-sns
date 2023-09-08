const mongoose = require('mongoose');

const ConversationSchema = new mongoose.Schema(
  {
    // 会話のid
    members: {
      type: Array,
    },
  },

  { timestamps: true },
);

module.exports = mongoose.model('Conversation', ConversationSchema);
