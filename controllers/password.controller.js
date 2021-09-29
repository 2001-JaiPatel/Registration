const User = require('../model/user');
const emailService = require('../utils/sendEmail');

exports.send = (req, res) => {
    try {
        console.log('\n welcome to passworController.send');
        console.log(`\n req.body ${JSON.stringify(req.query)}`);
        const { email } = req.query;

        // generate auto generated password string
        const newPassword = Math.random().toString(36).substring(2, 10);
        console.log(` new password string is ${newPassword}`);

        const filterCond = { email };
        const userDoc = {
            password: newPassword
        };

        User.findOneAndUpdate(filterCond, userDoc, { new: true })
            .then((upadatedNewDoc) => {
                if (!upadatedNewDoc) {
                    return res.status(404).send({
                        message: `user not found with email ${email}`
                    });
                }
                console.log(` updated new Document ${JSON.stringify(upadatedNewDoc)}`);
                const tempEmailObj = {
                    receivers: 'patel.jaiprakash20@gmail.com',
                    subject: 'Registration appliation new password',
                    content: `Your new password is : ${newPassword}`
                };
                emailService.send(tempEmailObj);
                return res.status(200).send('success');
            }).catch((err) => {
                console.log(err);
                return res.status(500).send({
                    message: `Something wrong to sending password link ${email}`
                });
            });
    } catch (e) {
        console.log(e);
        res.status(500).send({
            message: e.message || 'Some error occurred while registering new user.'
        });
    }
};
