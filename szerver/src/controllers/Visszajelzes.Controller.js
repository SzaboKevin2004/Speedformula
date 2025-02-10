import nodemailer from 'nodemailer';
import dotenv from 'dotenv';


dotenv.config({ path:"C:/Users/david/Documents/szerver/src/.env"});


const sendEmail =(email, message) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: email,
    to: 'speedformulahu@gmail.com',
    subject: 'Új visszajelzés',
    text: `Email: ${email}\n\nÜzenet: ${message}`,
  };

  return transporter.sendMail(mailOptions);
};
export default{
 VisszajelzesPostController: async (req, res) => {
  const { email, message } = req.body;

  if (!email || !message) {
    return res.status(400).json({ message: 'Hiányzó adat!' });
  }

  sendEmail(email, message)
    .then(() => {
      res.status(200).json({ message: 'Visszajelzés sikeresen elküldve!' });
    })
    .catch((error) => {
      console.error('Email küldési hiba:', error);
      res.status(500).json({ message: 'Hiba történt az üzenet küldésekor!' });
    });
  }
};
