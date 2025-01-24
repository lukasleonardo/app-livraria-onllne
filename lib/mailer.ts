import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port:587,
    secure: false,
    auth: {
        //Margarette Howe
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASSWORD
    }       
});

export async function sendEmail(to: string, subject: string, html: string) {
    const mailOptions = {
        from: '"myBookstore" <no-reply@bookstore.com>',
        to,
        subject,
        html
    }

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
    }
}