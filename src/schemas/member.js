const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
	id: { type: String },
	xp: { type: Number, default: 0 },
});

module.exports = mongoose.model('Members', memberSchema);
