const mongoose = require('mongoose');
const { mongoURL } = require('./config.json');

module.exports = async () => {
	mongoose.set('strictQuery', true);
	await mongoose.connect(mongoURL, { keepAlive: true });
	return mongoose;
};
