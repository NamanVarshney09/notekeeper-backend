const express = require('express');
const router = express.Router();
const User = require('../models/User')

// express-validator is a set of express.js middlewares that wraps validator.js validator and sanitizer functions.
const { body, validationResult } = require('express-validator');

/* 
    Create a User using POST "/api/auth"
    *Doesn't require authentication
*/
router.post('/', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be at least 8 characters long').isLength({ min: 8 }),

], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    }).then(user => res.json(user))
        .catch(err => res.json({ error: 'This email is already registered.', message: err.message }));
})

module.exports = router