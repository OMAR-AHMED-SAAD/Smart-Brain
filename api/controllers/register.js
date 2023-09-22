const register = (db, bcrypt) => (req, res) => {
    let { username, email, password } = req.body;
    password = bcrypt.hashSync(password, null, null);
    db.transaction(trx => {
        trx.insert({
            hash: password,
            username: username
        }).into('login').returning('username').then(loginUsername => {
            return trx('users').returning('*').insert({
                email: email,
                username: loginUsername[0].username,
                joined: new Date()
            }).then(usersTable => res.json(usersTable[0])).catch(err => res.status(400).json('unable to register'))
        }).then(trx.commit).catch(err => { trx.rollback(); res.status(400).json('unable to register') })
    })
}

export default register;