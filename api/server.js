import express from "express";
import cors from 'cors'

const app = express();
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())
const db = {
    users: [
        {
            id: 123,
            email: "omar@gmail.com",
            username: "omar",
            password: "password",
            entries: 0,
            Date: new Date()
        },
        {
            id: 124,
            email: "omar2@gmail.com",
            username: "omar2",
            password: "password2",
            entries: 0,
            Date: new Date()
        }
    ]
}

app.get("/", (req, res) => {
    res.json(db.users)
}
)

app.post("/signin", (req, res) => {
    const { username, password } = req.body;
    let userFound = null;
    const isValid = db.users.some((user) => {
        if (user.username === username && user.password === password) {
            userFound = user
            return true
        }
    })

    isValid ? res.json(userFound) : res.status(400).json(userFound);
})

app.post("/register", (req, res) => {
    const { username, email, password } = req.body;
    db.users.push({
        id: db.users.at(-1).id + 1,
        email: email,
        username: username,
        password: password,
        entries: 0,
        Date: new Date()
    })
    res.json(db.users.at(-1))
})

app.get('/profile/:id', (req, res) => {
    const { id } = req.params
    let userFound = null;
    let isFound = db.users.some((user) => {
        if (user.id === Number(id)) {
            userFound = user;
            return true;
        }
        return false;
    })
    isFound ? res.json(userFound) : res.status(404).json('no such user');
})

app.put('/image', (req, res) => {
    const { id } = req.body
    let userFound = null;
    let isFound = db.users.some((user) => {
        if (user.id === Number(id)) {
            userFound = user;
            return true;
        }
        return false;
    })
    if (userFound) {
        userFound.entries++;
        res.json(userFound.entries)
    }
    else
        res.status(404).json('no such user')
})

app.listen(3000, () => {
    console.log("running on port 3000");
})
