const jwt = require('jsonwebtoken');
const User = require('../model/user');

exports.registration = (req, res) => {
    try {
        console.log('\n welcome to registration.controller');
        console.log(`\n req.body ${JSON.stringify(req.body)}`);
        const {
            firstname, lastname, email, password, gender, hobby, status, description, city
        } = req.body;

        /* ==================================================================
                    ::: VALIDATE USER INPUT ::::
        ===================================================================== */
        if (!(email && password && firstname && lastname)) {
            res.status(400).send('All input is required');
        }

        /* ==================================================================
                    ::: CHECK WHETHER USER ALREADY EXIST OR NOT ::::
        ===================================================================== */
        User.findOne({ email })
            .then((dbDoc) => {
                if (dbDoc) {
                    return res.status(200).send({
                        message: 'User Already Exist. Please Login.'
                    });
                }

                const user = User.create({
                    firstname,
                    lastname,
                    email: email.toLowerCase(), // sanitize: convert email to lowercase
                    password,
                    gender,
                    hobby,
                    status,
                    description,
                    city
                });
                console.log('\n user successfully created');

                /* ==================================================================
                    ::: GENERATE TOKEN FOR RESPECTIVE USER AND EMAIL ID ::::
            ===================================================================== */
                const token = jwt.sign(
                    { user_id: user._id, email },
                    process.env.TOKEN_KEY,
                    {
                        expiresIn: '2h',
                    }
                );
                console.log(`\n token ${token}`);

                /* ==================================================================
                ::: SAVE/ASSIGN TOKEN FOR RESPECTIVE USER::::
             ===================================================================== */
                // user.token = token;
                // User.save();

                res.cookie('jwt', token, { httpOnly: true, secure: true, maxAge: 3600000 });
                console.log(`\n token : ${token}`);
                console.log(`New uses registered with username as ${email} .`);
                return res.redirect('/getLogin');
            }).catch((err) => {
                console.log(err);
                res.status(500).send('Exception: There is some issue to fetch User document.');
            });
    } catch (e) {
        console.log(e);
        res.status(500).send({
            message: e.message || 'Some error occurred while registering new user.'
        });
    }
};
