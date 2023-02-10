const mongoose = require('../mongo');

module.exports = {
	name: 'ready',
	once: true,
	// eslint-disable-next-line no-unused-vars
	execute(client) {
		console.log('Connected to Discord');
		mongoose();
		if (mongoose.connect) {
			console.log('Connected to MongoDB');
		}
		else {
			console.log('Couldn\'t connect to MongoDB');
		}
	},
};
