const express = require('express');
const nodemailer = require('nodemailer');

const router = express.Router();

let transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER, // generated ethereal user
    pass: process.env.SMTP_PASS, // generated ethereal password
  },
});

router.get('/:to', (req, res, next) => {

  transporter.sendMail({
    from: `No-Reply Laendrun <${process.env.SMTP_USER}>`, // sender address
    to: req.params.to, // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  }, (err, info) => {
    res.json({
      message: info,
      error: err,
    });
  })
})

module.exports = router;