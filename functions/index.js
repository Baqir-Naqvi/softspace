const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
admin.initializeApp();

var transporter = nodemailer.createTransport({
  service: "gmail",
  port: 465,
  secure: true,
  auth: {
    user: "",
    pass: ""
  },
});

exports.sendEmail = functions.firestore
  .document("invoices/{invoiceId}")
  .onCreate((snap, context) => {
    const newInvoice = snap.data();
    const mailOptions = {
      from: "gookie712@gmail.com",
      to: newInvoice.email,
      subject: "New Invoice",
      html: `<h1>Hi ${newInvoice.fullName}!</h1>
            <p>You have a new invoice for ${newInvoice.bankdetails}.</p>
            <p>Thanks!</p>`,
    };
    return transporter.sendMail(mailOptions, (erro, info) => {
      if (erro) {
        return console.log(erro.toString());
      }
      return console.log("Sended");
    });
  });
