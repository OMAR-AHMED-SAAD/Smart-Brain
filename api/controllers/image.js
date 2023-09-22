const image = (db) => (req, res) =>{
    const { id } = req.body
    db('users').where({ id }).increment('entries', 1).returning('entries').then(entries => {
        entries.length ? res.json(entries[0].entries) : res.status(400).json('not found')
    }).catch(err => res.status(400).json('unable to get entries'))
}

export default image;