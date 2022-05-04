const statusCheck = (req, res) =>{
    return res.send('Good to go...')
}

const index = (req, res) => {
    return res.send('Student Archive: Home')
}

const about = (req, res) => {
    return res.send('Student Archive: About')
}

module.exports = {
    statusCheck, index, about
}