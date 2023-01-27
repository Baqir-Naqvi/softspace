
const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
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
      from: "",
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
