const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  alarme: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Alarme',
    required: true
  },
  notif_msg: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Notification = mongoose.model("Notification", notificationSchema);
module.exports = Notification;
