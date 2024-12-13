const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
    title: String,
    announcementImage: String ,

    description: String,
});

module.exports = mongoose.model('Announcement', announcementSchema);