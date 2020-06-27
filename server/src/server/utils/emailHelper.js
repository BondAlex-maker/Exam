const jwt = require('jsonwebtoken');
const db = require('../models/index.js');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
    service: 'SendinBlue',
    auth: {
        user: 'bondarenko.alex.sergeevich@gmail.com',
        pass: 'qGSI2ykd4hL39zc5'
    }
});







module.exports.inputEmailAndPassword = async (req, res) => {
    res.send('<div style="background-color: #3ea9f5; height: 100vh; display: flex; justify-content: center;' +
        'flex-direction: column; align-items: center"><form name="myForm" id="myForm" action="/passwordreset" method="POST">' +
        '<div style="display: flex; flex-direction: column">' +
        '<input style="height: 34px; border: 1px; padding: 10px; margin: 10px; width: 400px; border-radius: 5px" type="email" name="email" value="" placeholder="Enter your email address..." />' +
        '<input style="height: 34px; border: 1px; padding: 10px; margin: 10px; width: 400px; border-radius: 5px" type="password" name="password" value="" placeholder="Enter your new password..." />' +
        '<input style="height: 34px; border: 1px; padding: 10px; margin: 10px; width: 400px; border-radius: 5px" type="submit" name="btnSubmit" id="btnSubmit" value="Send Email"/>' +
        '</form></div></div>'
    );
};

module.exports.getUserAndSendEmail = async (req, res, next) => {
    if (req.body.email !== undefined) {
        var emailAddress = req.body.email;
        let User;
        try {
            User = await db.Users.findOne(
                {
                    where: { email: emailAddress},
                }
            )
            ; }
        catch (e) {
            next(e);
        }

        var payload = {
            id: User.id,        // User ID from database
            email: emailAddress
        };
        var secret = User.password + '-' + User.role;

        var token = jwt.sign(payload, secret);



        var mailOptions = {
            from: 'PabloEscabare@gmail.com',
            to: `bondarenko.alex.sergeevich@gmail.com`,
            subject: 'Sending Email using Node.js',
            text: '<a href="http://localhost:9632/resetpassword/' + payload.id + '/' + token + '/' + req.body.password +'">Reset password</a>!'
        };

        await transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
        res.send('<h1> Email sent </h1>');
    } else {
        res.send('Email address is missing.');
    }
};

module.exports.decryptToken =  async (req, res, next) => {

    if (req.params.id !== undefined) {
        var userId = req.params.id;
        let User;
        try {
            User = await db.Users.findOne(
                {
                    where: { id: userId},
                }
            )
            ; }
        catch (e) {
            next(e);
        }

        var secret = User.password + '-' + User.role;

        var payload = jwt.decode(req.params.token, secret);

        // TODO: Gracefully handle decoding issues.
        // Create form to reset password.
        res.send('' +
            '<div style="background-color: #3ea9f5; height: 100vh; display: flex; justify-content: center;' +
            'flex-direction: column; align-items: center"><form action="/resetpassword" method="POST">' +
            '<input type="hidden" name="id" value="' + payload.id + '" />' +
            '<input type="hidden" name="token" value="' + req.params.token + '" />' +
            '<input type="hidden" name="password" value="'+ req.params.password +'" placeholder="Enter your new password..." />' +
            '<input style="height: 34px; border: 1px; padding: 10px; margin: 10px; width: 400px; border-radius: 5px" type="submit" value="Submit: Reset Password" />' +
            '</form></div>');
    }};

module.exports.setNewPassword = async (req, res, next) => {


    // TODO: Fetch user from database using
    if (req.body.id !== undefined) {
        var userId = req.body.id;
        let User;
        try {
            User = await db.Users.findOne(
                {
                    where: { id: userId},
                }
            )
            console.log(User);
            ; }
        catch (e) {
            next(e);
        }

        var secret = User.password + '-' + User.role;


        var payload = jwt.decode(req.body.token, secret);
        const PassHash = req.hashPass = await bcrypt.hash(req.body.password, 5);


        try {
            User.password = await db.Users.update({
                password : PassHash
            }, {
                where: {
                    id: User.id
                },
            })

            ; }
        catch (e) {
            next(e);
        }
        console.log(PassHash)

        // TODO: Gracefully handle decoding issues.
        // TODO: Hash password from
        // req.body.password
        res.send('<a href="http://localhost:3000/">Go to home page</a>');
    }};
