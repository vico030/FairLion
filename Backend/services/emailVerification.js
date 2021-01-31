const mailer = require("nodemailer");
require("dotenv").config();

const host = process.env.HOST
const user = process.env.EMAIL_USER;
const pass = process.env.EMAIL_PASSWORD
const port = process.env.API_PORT

const transporter = mailer.createTransport({
    //host: "smtp-mail.outlook.com", // hostname
    service: "gmail",
    //secureConnection: false, // TLS requires secureConnection to be false
    //port: 587, // port for secure SMTP
    //tls: {
    //    ciphers: 'SSLv3'
    //},
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
                html:
                    `
                <div style="height: 20rem">
                    
                    <p>
                    Danke für das Registrieren auf FairLion!<br><br>
                    Um deinen Account vollständig zu aktivieren, klicke bitte auf den Button.
                    <br><br>
                    <a style="color: white; background: #E77F23; text-decoration: none; padding: 0.5rem 1rem; border-radius: 25px; display: block; width: 7rem; font-size: 15px; text-align: center" href="${link}">Confirm email</a>
                    <br>
                    Dein FairLion-Team
                    <br><br>
                    <img src="cid:logo" width="100" height="100" />
                    </p>
                    </div>
                `,
                attachments: [{
                    filename: "logo.png",
                    path: __dirname + "/../assets/logo.png",
                    cid: 'logo'
                }]
            })
            console.log(info.messageId);
        }
        catch (err) {
            console.log(err.message)
        }
    }

}

module.exports = sendEmail;
