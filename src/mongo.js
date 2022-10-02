const mongoose = require('mongoose');
const { mongoPath } = require('./config.json');

module.exports = async () => {
	await mongoose.connect(mongoPath, { keepAlive: true, keepAliveInitialDelay: 5000 });
	console.log('[IMPORTANT] Succesfully connected to MongoDB');
	return mongoose;
};
