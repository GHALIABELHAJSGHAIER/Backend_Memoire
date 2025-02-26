const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
    message: { type: String, required: true },
    dateEnvoi: { type: Date, default: Date.now },
    client: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
}, { timestamps: true });

const Notification = mongoose.model("Notification", notificationSchema);
module.exports = Notification;
