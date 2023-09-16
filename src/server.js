const bcrypt = require('bcrypt');
const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const app = express();

const users = [];
const port = 3000;

const corsOptions = {
    origin: 'http://localhost:3001', // Replace with the actual URL of your frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
};
app.use(express.json());
app.use(cors(corsOptions)); // Enable CORS for all routes

app.get('/users', (req, res) => {
    res.json(users);
});

// CREATING ACCOUNT
app.post('/users', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ error: 'Name, email, and password are required' });
        }

        // Check if there's a user with same email
        const existingEmail = users.find(user => user.email === email);
        if (existingEmail) {
            return res.status(400).json({ error: 'Email address is already in use' });
        }
        const existingUser = users.find(user => user.name === name);
        if (existingUser) {
            return res.status(400).json({ error: 'Username is already in use' });
        }

        // Hashing Passwords
        const hashedPassword = await bcrypt.hash(password, 10);
        const userId = uuidv4();
        const user = { id: userId, name, email, password: hashedPassword };
        // NEXT LINE PUSHES THE userId, email and hashedPassword into the users array
        users.push(user);
        // shows that the POST request has been successful
        console.log('Received POST request to /users:', name); // Logging the username
        res.status(201).json({ message: 'Registration successful' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});




// POSTING LOGIN INPUT FROM LOGIN FORM
app.post('/users/login', async (req, res) => {
    const { usernameOrEmail, password } = req.body;

    if (!usernameOrEmail || !password) {
        return res.status(400).json({ error: 'Username/email and password are required' });
    }

    const user = users.find((user) => (user.name === usernameOrEmail || user.email === usernameOrEmail) && bcrypt.compareSync(password, user.password));

    if (!user) {
        return res.status(400).json({ error: 'User not found' });
    }

    res.json({ message: 'Login successful' });
});


app.listen(port, () => {
    console.log(`Server is listening on port ${port}.`);
});
