const jwt = require('jsonwebtoken');
const User = require('../model/user');

exports.login = (req, res) => {
    try {
        console.log('\n welcome to login.controllers');
        console.log(`\n req.body ${JSON.stringify(req.body)}`);

        const { email, password } = req.body;
        User.findOne({ email, password })
            .then((dbDoc) => {
                if (!dbDoc) {
                    return res.status(200).send('invalid email id.');
                }
                console.log(`\n user db document : ${JSON.stringify(dbDoc)}`);
                const token = jwt.sign(
                    { user_id: dbDoc._id, email: dbDoc.email },
                    process.env.TOKEN_KEY,
                    {
                        expiresIn: '2h',
                    }
                );
                res.cookie('jwt', token, { httpOnly: true, secure: true, maxAge: 3600000 });

                return User.find({}).lean()
                    .then((dbdocArr) => {
                        if (!dbdocArr) {
                            return res.status(200).send({ message: 'user documents are empty.' });
                        }
                        console.log(`\n dbdocArr: ${JSON.stringify(dbdocArr)}`);
                        return res.render('user', { title: 'user', users: dbdocArr });
                    }).catch((e) => {
                        console.log(e);
                        return res.status(500).send({
                            message: 'Exception: There is some issue to fetch User document.'
                        });
                    });
            }).catch((e) => {
                console.log(e);
                res.status(500).send({
                    message: 'Some error occurred while login.'
                });
            });
    } catch (e) {
        console.log(e);
        res.status(500).send({
            message: 'Some error occurred while login.'
        });
    }
};
