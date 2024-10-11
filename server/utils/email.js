// const nodemailer = require('nodemailer')

// const sendEmail = async (options) => {
//   const transporter = nodemailer.createTransport({
//     service: 'Gmail',
//     auth: {
//       user: process.env.EMAIL_USERNAME,
//       pass: process.env.EMAIL_PASSWORD
//     }
//   })

//   const emailOptions = {
//     from: 'Blog app <blogapp52@gmail.com>',
//     to: options.email,
//     subject: options.subject,
//     text: options.message
//   }

//   const email = await transporter.sendMail(emailOptions)

//   console.log('Message sent: %s', email.messageId, ' Email ', email)
// }

// module.exports = sendEmail

const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY ?? '')

const sendEmail = async (options) => {
  const msg = {
    to: options.to,
    from: 'blogapp52@gmail.com', // Use your verified SendGrid email
    subject: options.subject,
    text: options.text,
    html: options.html,
  }

  try {
    const response = await sgMail.send(msg)
    console.log('Email sent successfully')
    return response
  } catch (error) {
    console.error('Error sending email:', error)

    if (error.response) {
      console.error(error.response.body)
    }
  }
}

module.exports = sendEmail
