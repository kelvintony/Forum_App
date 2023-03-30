import nodemailer from 'nodemailer';

const sendEmail = async (email, subject, message) => {
	try {
		const transporter = nodemailer.createTransport({
			service: 'gmail',
			host: 'smtp.gmail.email',
			port: 587,
			secure: true, // true for 465, false for other ports
			auth: {
				user: 'kelvintonyph@gmail.com', // generated ethereal user
				pass: 'clsocvtmzcasqwhc' // generated ethereal password
			}
		});

		await transporter.sendMail({
			from: 'kelvintonyph@gmail.com',
			to: email,
			subject: subject,
			text: message
		});

		console.log('email sent successfully');
	} catch (error) {
		console.log('email not sent');
		console.log(error);
	}
};

export default sendEmail;
