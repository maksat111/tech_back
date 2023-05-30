const Admin = require('./models/admins');
const bcrypt = require('bcryptjs');

const registerAdmin = async () => {
    const encryptedPassword = await bcrypt.hash("admin", 10);

    const createdAdmin = Admin.create({
        name: 'Admin',
        surname: 'Admin',
        email: 'admin@gmail.com',
        phone_number: '61511331',
        is_active: true,
        password: encryptedPassword,
    });

    console.log('Admin successfully created!')
}

registerAdmin();