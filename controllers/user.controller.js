const User = require('../model/user');

exports.getAll = (req, res) => {
    try {
        console.log('\n welcome to getAllUserInfo');
        User.find({}).lean()
            .then((dbdocArr) => {
                if (!dbdocArr) {
                    return res.status(200).send({ message: 'user document is empty.' });
                }
                console.log(`\n dbdocArr: ${JSON.stringify(dbdocArr)}`);
                return res.render('user', { title: 'user', users: dbdocArr });
            }).catch((e) => {
                console.log(e);
                return res.status(500).send({
                    message: 'Exception: There is some issue to fetch User document.'
                });
            });
        return res.status(200).send({ message: 'user document is empty.' });
    } catch (e) {
        console.log(e);
        return res.status(500).send({
            message: e.message || "Some error occurred while fetching the all user's doc."
        });
    }
};

exports.get = (req, res) => {
    try {
        console.log('welcome to getUser ');
        console.log(`getUser -req.params ${JSON.stringify(req.params)}`);

        const { email } = req.params;

        User.findOne({ email }).lean()
            .then((dbDoc) => {
                if (!dbDoc) {
                    return res.status(200).send('Invalid entry');
                }
                console.log(`\n user db document : ${JSON.stringify(dbDoc)}`);
                return res.render('edit_user', { title: 'user', user: dbDoc });
            }).catch((e) => {
                console.log(e);
                res.status(500).send('Exception: There is some issue to fetch User document.');
            });
    } catch (e) {
        console.log(e);
        res.status(500).send({
            Messge: 'Exception: There is some issue to fetch User document.'
        });
    }
};

exports.delete = (req, res) => {
    try {
        console.log('\n deleteUser');
        console.log(`\n req.query ${JSON.stringify(req.query)}`);
        const { email, _id } = req.query;

        /*= ==================================================
            ::: FIND I/P EMAIL AND DELETE RESPECTIVE DOCUMENT
        ===================================================== */
        User.findByIdAndRemove({ _id })
            .then((dbDoc) => {
                if (!dbDoc) {
                    return res.status(404).send({
                        message: `user not found with email: ${email}`
                    });
                }
                console.log(`\n dbDoc ${dbDoc}`);
                return res.status(200).send('Deleted');
            }).catch((e) => {
                console.log(e);
                return res.status(500).send({
                    message: `Could not delete note with email ${email}`
                });
            });
    } catch (e) {
        console.log(e);
        res.status(500).send({
            Messge: 'Exception: There is some issue to delete User document.'
        });
    }
};

exports.save = (req, res) => {
    console.log('welcome to save ');
    console.log(`save -req.body ${JSON.stringify(req.body)}`);
    const {
        firstname, lastname, email, password, gender, hobby, status, description, city
    } = req.body;
    /*= ==================================================
        ::: PREPARE FILTER CONDITION AND SAVE THE DOCUMET
    ===================================================== */
    const filterCond = { email };
    const userDoc = {
        firstname,
        lastname,
        email: email.toLowerCase(),
        password,
        gender,
        hobby,
        status,
        description,
        city

    };
    User.findOneAndUpdate(filterCond, userDoc, { new: true })
        .then((upadatedNewDoc) => {
            if (!upadatedNewDoc) {
                return res.status(404).send({
                    message: `user not found with email ${email}`
                });
            }
            return User.find({}).lean()
                .then((dbDocArr) => {
                    if (!dbDocArr) {
                        return res.status(200).send({ message: 'user documents are empty.' });
                    }
                    console.log(`\n dbdocArr: ${JSON.stringify(dbDocArr)}`);
                    return res.render('user', { title: 'user', users: dbDocArr });
                }).catch((e) => {
                    console.log(e);
                    return res.status(500).send({
                        message: 'Exception: There is some issue to fetch User document.'
                    });
                });
        }).catch((e) => {
            console.log(e);
            return res.status(500).send({
                message: `Could not delete user with email ${email}`
            });
        });
};

exports.check = (req, res) => {
    console.log('\n checkForUseExist');
    console.log(`\n req.body ${JSON.stringify(req.query)}`);
    const { email } = req.query;
    User.findOne({ email })
        .then((dbDoc) => {
            console.log(`dbDoc ${JSON.stringify(dbDoc)}`);
            if (!dbDoc) {
                return res.status(200).send('valid');
            }
            return res.status(200).send('User already exist.Please another email id for registration.');
        }).catch((e) => {
            console.log(e);
            return res.status(500).send({
                message: 'Exception: There is some issue to check User documentw with email $({email})'
            });
        });
};
