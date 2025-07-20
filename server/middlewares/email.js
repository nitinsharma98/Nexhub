const { transporter } = require("./email.config");
const { Verification_Email_Template } = require("./emailTemplate");
const dotenv = require('dotenv');
dotenv.config();

const VERFMAIL = process.env.VERF_EMAIL;



const sendVerificationCode = async(email , verificationCode) => {
    try{
         const response = await transporter.sendMail({
                from: `"NexHub_Official" <${VERFMAIL}>`,
                to: email,
                subject: "Join Nexhub ✔",
                text: "Verify your Nexhub account", // plain‑text body
                html: Verification_Email_Template.replace("{verificationCode}" , verificationCode), // HTML body
                });
                console.log('Email send successfully' , response);
    }catch (error) {
        console.error("Error in emailjs:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}


module.exports = { sendVerificationCode}