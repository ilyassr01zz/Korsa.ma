import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();
// Create transporter with Gmail (you can replace with any SMTP service)
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
    },
});
export const sendBookingConfirmation = async (email, bookingNumber, departure, destination, date, price) => {
    const mailOptions = {
        from: process.env.SMTP_FROM || 'noreply@korsa.ma',
        to: email,
        subject: `Booking Confirmation - ${bookingNumber}`,
        html: `
      <h2>Your Booking is Confirmed!</h2>
      <p>Thank you for booking with Korsa.</p>
      <h3>Booking Details:</h3>
      <ul>
        <li><strong>Booking Number:</strong> ${bookingNumber}</li>
        <li><strong>Route:</strong> ${departure} → ${destination}</li>
        <li><strong>Date:</strong> ${date}</li>
        <li><strong>Price:</strong> MAD ${price.toFixed(2)}</li>
      </ul>
      <p>Your confirmation has been sent to your email. Please keep this for reference at the station.</p>
      <p>Thank you for choosing Korsa!</p>
      <hr/>
      <p><small>This is an automated email. Do not reply directly.</small></p>
    `,
    };
    try {
        await transporter.sendMail(mailOptions);
        console.log(`✓ Confirmation email sent to ${email}`);
    }
    catch (error) {
        console.error('✗ Failed to send email:', error);
        // Don't throw, just log - keep the booking even if email fails
    }
};
export const sendContactReply = async (email, name, subject, reply) => {
    const mailOptions = {
        from: process.env.SMTP_FROM || 'noreply@korsa.ma',
        to: email,
        subject: `Re: ${subject}`,
        html: `
      <p>Hi ${name},</p>
      <p>${reply}</p>
      <hr/>
      <p><strong>Korsa Support Team</strong></p>
      <p>Grand Taxi Booking - Morocco</p>
    `,
    };
    try {
        await transporter.sendMail(mailOptions);
        console.log(`✓ Reply sent to ${email}`);
    }
    catch (error) {
        console.error('✗ Failed to send email:', error);
    }
};
export const sendPaymentReceipt = async (email, bookingNumber, amount, transactionId) => {
    const mailOptions = {
        from: process.env.SMTP_FROM || 'noreply@korsa.ma',
        to: email,
        subject: `Payment Receipt - ${bookingNumber}`,
        html: `
      <h2>Payment Successful!</h2>
      <p>Your payment has been processed successfully.</p>
      <h3>Receipt Details:</h3>
      <ul>
        <li><strong>Booking Number:</strong> ${bookingNumber}</li>
        <li><strong>Amount:</strong> MAD ${amount.toFixed(2)}</li>
        <li><strong>Transaction ID:</strong> ${transactionId}</li>
        <li><strong>Date:</strong> ${new Date().toLocaleDateString()}</li>
      </ul>
      <p>Your payment confirmation has been saved to your account.</p>
      <p>Thank you!</p>
    `,
    };
    try {
        await transporter.sendMail(mailOptions);
        console.log(`✓ Receipt sent to ${email}`);
    }
    catch (error) {
        console.error('✗ Failed to send email:', error);
    }
};
//# sourceMappingURL=email.js.map