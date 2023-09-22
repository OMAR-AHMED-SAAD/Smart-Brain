const signin = (db, bcrypt) => (req, res) => {
    const { username, password } = req.body;
    db('login').where({ username }).select('hash').then(hash => {
        bcrypt.compare(password, hash[0].hash, function (err, isPasswordValid) {
            isPasswordValid ? db('users').where({ username }).select('*').then(user => {
                user.length ? res.json(user[0]) : res.status(400).json('not found')
            }) : res.status(400).json('wrong credentials')
        })
    }).catch(err => res.status(400).json('wrong credentials'))
}

export default signin;