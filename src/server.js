const users = [];
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const app = express();
const port = 3000;

const corsOptions = {
    origin: 'http://localhost:3001',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
}
app.use(express.json());
app.use(cors(corsOptions));

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'car-website-logins'
});

connection.connect((err) => {
    if (err) {
        console.error('There was a difficulty connecting to the MySQL database:', err);
    } else {
        console.log('Successfully connected to the MySQL database!');
    }
});

app.post('/api/users', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ error: 'Name, email, and password are required' });
        }

        // Check if there's a user with the same email or username in the database
        connection.query(
            'SELECT * FROM carwebsitelogindatabase WHERE email = ? OR name = ?',
            [email, name],
            async (err, results) => {
                if (err) {
                    console.error('Database query error:', err);
                    return res.status(500).json({ error: 'Internal Server Error' });
                }

                if (results.length > 0) {
                    // A user with the same email or username already exists
                    return res.status(400).json({ error: 'Email or username is already in use' });
                }

                // Hashing Passwords
                const hashedPassword = await bcrypt.hash(password, 10);
                const userId = uuidv4();
                const user = { id: userId, name, email, password: hashedPassword };

                // DATABASE INSERT QUERY
                const insertQuery = 'INSERT INTO carwebsitelogindatabase (id, name, email, password) VALUES (?, ?, ?, ?)';
                connection.query(insertQuery, [user.id, user.name, user.email, user.password], (err, result) => {
                    if (err) {
                        console.error(`There was an error inserting the user into the MySQL database: ${err}`);
                        return res.status(500).json({ error: 'Failed to add user.' });
                    }
                    console.log('User successfully inserted into MySQL database.');
                    // Respond with a success message
                    res.status(201).json({ message: 'Registration successful' });
                });
            }
        );
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.post('/api/users/login', async (req, res) => {
    const { usernameOrEmail, password } = req.body;

    if (!usernameOrEmail || !password) {
        return res.status(400).json({ error: 'Username/email and password are required' });
    }

    // Query the database to find the user by username or email
    connection.query(
        'SELECT * FROM carwebsitelogindatabase WHERE name = ? OR email = ?',
        [usernameOrEmail, usernameOrEmail],
        async (err, results) => {
            if (err) {
                console.error('Database query error:', err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }

            if (results.length === 0) {
                return res.status(400).json({ error: 'User not found' });
            }

            const user = results[0]; // Assuming there's only one user with the provided username/email

            // Compare the hashed password
            const passwordMatch = await bcrypt.compare(password, user.password);

            if (!passwordMatch) {
                return res.status(400).json({ error: 'Invalid password' });
            }

            res.json({ message: 'Login successful' });
        }
    );
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}.`);
});
