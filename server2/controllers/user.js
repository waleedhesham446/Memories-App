const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if(!existingUser) return res.status(404).json({ message: 'User does not exist' });  //  check if the user not exists

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);    //  checking password

        if(!isPasswordCorrect) return res.status(400).json({ message: 'Invalid Credintials' }); //  wrong password

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'test', { expiresIn: '1h' });    //  creating token to send it back to the client        //  'test' is a secret string

        res.status(200).json({ result: existingUser, token });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
}

const signup = async (req, res) => {
    const { email, password, confirmPassword, firstName, lastName } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if(existingUser) return res.status(400).json({ message: 'User already exists' });   //  check if the user exists

        if(password !== confirmPassword) return res.status(400).json({ message: 'Passwords do not match' });    //  checking the password and confirm password

        const hashedPassword = await bcrypt.hash(password, 12); //  hashing password    //  12 here is called salt

        const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });    //  creating user

        const token = jwt.sign({ email: result.email, id: result._id }, 'test', { expiresIn: '1h' });    //  creating token to send it back to the client        //  'test' is a secret string
        
        res.status(200).json({ result, token });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
}

module.exports = { signin, signup };