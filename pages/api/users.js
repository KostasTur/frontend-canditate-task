const registeredUsers = [
	{ email: 'frontend@isawesome.com', password: 'cool' },
	{ email: 'test@mail.com', password: '123' },
];

export default async function handler(req, res) {
	console.log(req.body);
	if (req.method === 'POST') {
		try {
			// await would be necessary if this would be call to database
			// for latency simulation
			await new Promise((resolve) => setTimeout(resolve, 500));
			const user = registeredUsers.find(
				(user) =>
					user.email === req.body.email && user.password === req.body.password
			);
			if (user) res.status(200).json({ data: user });
			else {
				res.status(401).json({ message: 'User not found!' });
			}
		} catch (error) {
			res.status(500).json({ message: 'internal server error' });
		}
	} else {
		// Handle any other HTTP method
		res.status(200).json({ message: 'api not configured' });
	}
}
