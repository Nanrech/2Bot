const { Schema, model } = require('mongoose');

const memberSchema = new Schema({
	id: { type: String },
	xp: { type: Number, default: 0 },
});

module.exports = model('Members', memberSchema);
