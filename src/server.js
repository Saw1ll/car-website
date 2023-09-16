const bcrypt = require('bcrypt');
const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const app = express();

const users = [];
const port = 3000;

app.use(express.json());
app.use(cors()); // Enable CORS for all routes

app.get('/users', (req, res) => {
    res.json(users);
});

// CREATING ACCOUNT
// CREATING ACCOUNT
app.post('/users', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ error: 'Name, email, and password are required' });
        }

        // Check if a user with the same email already exists
        const existingUser = users.find(user => user.email === email);
        if (existingUser) {
            return res.status(400).json({ error: 'Email address is already in use' });
        }

        // Hash the password on the server-side
        const hashedPassword = await bcrypt.hash(password, 10);

        const userId = uuidv4();
        const user = { id: userId, name, email, password: hashedPassword };
        users.push(user);
        console.log('Received POST request to /users:', name); // Logging the username
        res.status(201).json({ message: 'Registration successful' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});




// POSTING LOGIN INPUT FROM LOGIN FORM
app.post('/users/login', async (req, res) => {
    const { name, email, password } = req.body;

    if ((!name && !email) || !password) {
        return res.status(400).json({ error: 'Name/email and password are required' });
    }

    const user = users.find((user) => (user.name === name || user.email === email) && bcrypt.compareSync(password, user.password));

    if (!user) {
        return res.status(400).json({ error: 'User not found' });
    }

    res.json({ message: 'Login successful' });
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}.`);
});
