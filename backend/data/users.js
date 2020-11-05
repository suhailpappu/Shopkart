const bcrypt = require('bcryptjs');

const users = [
    {
        name:'Admin User',
        email:'admin@sample.com',
        password:bcrypt.hashSync('123456',10),
        isAdmin:true
    },
    {
        name:'Admin User',
        email:'bob@sample.com',
        password:bcrypt.hashSync('123456',10)
    },{
        name:'Admin User',
        email:'alice@sample.com',
        password:bcrypt.hashSync('123456',10)
    },
]

module.exports = users