const nodemailer = require('nodemailer');

// create transport for nodemailer

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: 587,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

exports.handler = async (event, context) => {
  // Test send an email
  const info = await transporter.sendMail({
    from: "Slick's Slices <slick@poop.com>",
    to: 'orders@example.com',
    subject: 'New Order!',
    html: `<p>Your new pizza is here!</p>`,
  });

  return {
    statusCode: 200,
    body: JSON.stringify(info),
  };
};
