const mongoose = require('mongoose');
const { mongoURL } = require('./config.json');

module.exports = async () => {
	await mongoose.connect(mongoURL, { keepAlive: true });
	mongoose.set('strictQuery', true);
	console.log('Connected to MongoDB');
	return mongoose;
};
