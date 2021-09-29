const nodemailer = require('nodemailer');

const Transporter = nodemailer.createTransport({
    service: 'SMTP',
    auth: {
        user: 'patel.jaiprakash20@gmail.com',
        pass: '',
    },
});

exports.send = async ({
    from, receivers, subject, content, cc = ''
}) => {
    if (!receivers) throw new Error('receivers is required.');
    if (!content) throw new Error('content is required.');
    if (!subject) throw new Error('subject is required,');

    const mailOptions = {
        cc,
        from, // sender address
        to: receivers, // list of receivers
        subject, // Subject line
        html: content, // html body
    };

    // send mail with defined transport object
    return new Promise((resolve, reject) => Transporter
        .sendMail(mailOptions, (err, info) => {
            if (err) {
                console.info(`sendMail error: ${JSON.stringify(err)}`);
                return reject(err);
            }
            console.info(`sendMail success: ${JSON.stringify(info)}`);
            return resolve(info);
        }));
};
