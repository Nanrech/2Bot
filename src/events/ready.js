const mongooseConnect = require('../mongo');

module.exports = {
	name: 'ready',
	once: true,
	execute(_) {
		console.log('Connected to Discord');

		mongooseConnect().then((readyState) => {
			if (readyState === 1) {
				console.log('Connected to MongoDB');
			} else {
				console.log('Couldn\'t connect to MongoDB. Connection state:', readyState);
			}
		})
	},
};
