const bcrypt = require('bcrypt');
const mysql = require('mysql');
const express = require('express');
const session = require('express-session')
const MySQLStore = require('express-mysql-session')(session)
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const app = express();
const port = 8080;

const cookieTimer = 1000 * 60 * 60 * 3; // 3 hours

// ALLOWS CORS TO ACCEPT DATA FROM PORT 3000 WHICH IS THE WEBSITE
const corsOptions = {
    origin: `http://localhost:3000`,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
}

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
app.use(express.json());
app.use(cors(corsOptions));

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'login-database'
});

connection.connect((err) => {
    if (err) {
        console.error('There was a difficulty connecting to the MySQL database:', err);
    } else {
        console.log('Successfully connected to the MySQL database!');
    }
});

app.post('/api/newsletter', async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ error: 'Please enter your email.' });
        }

        // Check if the email is already in the database
        connection.query(`SELECT * FROM newsletter WHERE email = ?`, [email], async (err, results) => {
            if (err) {
                console.error("Newsletter database query error: ", err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
            if (results.length > 0) {
                // The email is already in the newsletter database
                return res.status(400).json({ error: 'Email is already in use' });
            }
            // Insert the email into the newsletter database
            const insertQuery = 'INSERT INTO newsletter (email) VALUES (?)';
            connection.query(insertQuery, [email], (err, result) => {
                if (err) {
                    console.error('There was an error entering the email into the newsletter MySQL database: ', err);
                    return res.status(500).json({ error: 'Failed to add email to newsletter ' });
                }
                console.log('Email successfully added into newsletter database.');
                res.status(201).json({ message: 'Subscription successful' }); // Send success response
            });
        });
    } catch (error) {
        console.error('Error entering email into newsletter: ', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
});

app.post('/api/users', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ error: 'Username, email, and password are required' });
        }

        // Check if there's a user with the same email or username in the database
        connection.query(
            'SELECT * FROM logins WHERE email = ? OR username = ?',
            [email, username],
            async (err, results) => {
                if (err) {
                    console.error('Login database query error:', err);
                    return res.status(500).json({ error: 'Internal Server Error' });
                }

                if (results.length > 0) {
                    // A user with the same email or username already exists
                    return res.status(400).json({ error: 'Email or username is already in use' });
                }

                // Hashing Passwords
                const hashedPassword = await bcrypt.hash(password, 10);
                const userId = uuidv4();
                const user = { userId: userId, username, email, password: hashedPassword };

                // DATABASE INSERT QUERY
                const insertQuery = 'INSERT INTO logins (userId, username, email, password) VALUES (?, ?, ?, ?)';
                connection.query(insertQuery, [user.userId, user.username, user.email, user.password], (err, result) => {
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
        'SELECT * FROM logins WHERE username = ? OR email = ?',
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