const nodemailer = require('nodemailer')

//TO DO: Use Postmark when deployed and check documentation
const transport = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
});

//TO DO: Make better email template (see mjml.io)
const makeANiceEmail = text => `
  <div className="email" style="
    border: 1px solid black;
    padding: 20px;
    font-family: sans-serif;
    line-height: 2;
    font-size: 20px;
  ">
    <h2>Forgot Something?</h2>
    <p>${text}</p>

    <p>😎,\nFeiner Things</p>
    <p>P.S. I lose my keys all the time...</p>
  </div>
`

exports.transport = transport
exports.makeANiceEmail = makeANiceEmail