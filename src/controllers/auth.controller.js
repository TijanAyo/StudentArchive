//  POST /auth/register/contributor
const register = (req, res) => {
    return res.send('sending register details')
}

// POST /auth/login/contributor
const login = (req, res) => {
    return res.send('authorizing user entry')
}

module.exports = {
    register, login
}