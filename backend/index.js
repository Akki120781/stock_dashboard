const express = require('express');
const port = 3001;
const app = express();

let users = [];
app.post('/user', (req, res) => {
    const { firstname, lastname, email, password,dob } = req.body;

    if (!firstname || !lastname || !email || !password || !dob) {
        res.status(400).send( 'All fields are required');
        return;
    }
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        res.status(400).send('Email already exists');
        return;
    }

    const newUser = {
        id: Date.now(),
        firstname,
        lastname,
        email,
        password,
        dob
    };
    users.push(newUser);
    res.status(201).json(newUser)

});

app.get('/', (req, res) => {
  res.send('response from backend server');
  return;
});

app.get('/hello', (req, res) => {
    const user = {
        name: 'John Doe',
        age : 30
    }
    res.json(user);
    return;
});

app.get('/search', (req, res) => {
    const query = req.query.q;
    console.log(query);
    res.send('Query received');
    return;
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

