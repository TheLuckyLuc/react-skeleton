const path = require('path');
const express = require('express');

const app = express();

const port = process.env.PORT || 3000;

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/dist'));

	app.get('*', (req, res) => {
		res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
	});
}

app.listen(port, () => console.log(`Listening on port ${port}`));
