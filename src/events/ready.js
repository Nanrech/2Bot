const mongooseConnect = require('../mongo');

module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		console.log(`Connected to Discord as ${client.user.username}#${client.user.discriminator} (${client.user.id})`);

		mongooseConnect().then((mgClient) => {
			const readyState = mgClient.connection.readyState;

			if (readyState === 1) {
				console.log('Connected to MongoDB');
			} else {
				console.log('Couldn\'t connect to MongoDB');
				console.log(`Connection state: ${readyState} (${mgClient.STATES[readyState]})`);
			}
		})
	},
};
