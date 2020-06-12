//This file will generate an account ID and an Authentication token for every user created
module.exports = generateDetails = () =>{
    const alpha = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
    //Here we generate a 5-digit account ID
    const generateAcc = () =>{
        let account_id = "ID-";
        for (var i = 0; i < 4; i++) {
            const randomDigit = Math.round(Math.random() * 10);
            const randomAlpha = Math.round(Math.random() * 25);
            account_id += randomDigit;
            account_id += alpha[randomAlpha].toLocaleUpperCase();
        }
        return account_id;
    }
    const generateToken = () =>{
        //Here we generate a 10-digit authentication token unique to the user
        let auth_token = ""
        for (var i = 0; i < 6; i++) {
            const randomDigit = Math.round(Math.random() * 10);
            const randomAlpha = Math.round(Math.random() * 25);
            auth_token += randomDigit;
            auth_token += alpha[randomAlpha].toLocaleUpperCase();
        }
        return auth_token;
    } 
    return [generateAcc(), generateToken()]
}