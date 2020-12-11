const mailer = require("nodemailer");
require("dotenv").config();

const host = process.env.HOST
const user = process.env.OUTLOOK_USER;
const pass = process.env.OUTLOOK_PASSWORD
const port = process.env.API_PORT

const transporter = mailer.createTransport({
    host: "smtp-mail.outlook.com", // hostname
    secureConnection: false, // TLS requires secureConnection to be false
    port: 587, // port for secure SMTP
    tls: {
        ciphers: 'SSLv3'
    },
    auth: {
        user,
        pass
    }
})

const sendEmail = async (to, hash, type) => {
    if (type === "pwreset") {
        try {
            const info = await transporter.sendMail({
                from: user,
                to,
                subject: "New password",
                text: `New password: ${hash}`
            })
            console.log(info.messageId);
        }
        catch (err) {
            console.log(err.message)
        }
    }
    else {
        const link = `http://${host}:${port}/auth/verify/${hash}`;
        try {
            const info = await transporter.sendMail({
                from: user,
                to,
                subject: "Confirm Email",
                html: `<a href="${link}">Confirm email</a>`
            })
            console.log(info.messageId);
        }
        catch (err) {
            console.log(err.message)
        }
    }

}

module.exports = sendEmail;
