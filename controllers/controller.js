const nodemailer = require("nodemailer");
require("dotenv").config();

const sendEmail = async (name, email, phone, message) => {
  const usernameEmail = process.env.EMAIL;
  const passwordEmail = process.env.PASSWORD;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: usernameEmail,
      pass: passwordEmail,
    },
  });

  const mailOptions = {
    from: usernameEmail,
    to: usernameEmail,
    subject: "New Information - Portfolio Contact Page",
    html: `Hello,<br>
      You have received a new contact request with the next information:<br>
      Name: ${name}<br>
      Email: ${email}<br>
      Phone: ${phone}<br>
      Message: ${message}<br> 
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw error;
  }
};

const submitForm = async (req, res) => {
  const { firstName, lastName, email, phone, message } = req.body;
  const name = `${firstName} ${lastName}`;

  try {
    await sendEmail(name, email, phone, message);
    return res
      .status(200)
      .json({ message: "Thanks for contacting us!", data: req.body });
  } catch (error) {
    return res.status(500).json({
      error: "An error occured while sending the email.",
      details: `${error.message}`,
    });
  }
};

const sayHello = (req, res) => {
  const data = "I'm just here to say hello to you :)";
  return res.status(200).json({ success: true, data: data });
};

module.exports = {
  submitForm,
  sayHello,
};
