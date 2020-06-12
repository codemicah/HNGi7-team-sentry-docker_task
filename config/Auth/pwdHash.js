const passwordHash = require("password-hash");

module.exports = hashedPassword = (password) =>{ 
    const pwd = passwordHash.generate(password);
    return pwd;
}
