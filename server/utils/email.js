const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    }
  })

  const emailOptions = {
    from: 'Blog app <blogapp52@gmail.com>',
    to: options.email,
    subject: options.subject,
    text: options.message
  }

  const email = await transporter.sendMail(emailOptions)

  console.log('Message sent: %s', email.messageId, ' Email ', email)
}

module.exports = sendEmail