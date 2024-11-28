const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


// Define the person schema
const personSchema = new mongoose.Schema({
    name:
    {
        type: String,
        required: true,
    },
    age: {
        type: Number,
    },
    work: {
        type: String,
        enum: ["chef", "waiter", "manager"],
        required: true,
    },
    mobile: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },

    address: {
        type: String,
        required: true,
    },
    salary: {
        type: Number,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },

});

personSchema.pre('save', async function (next) {
    const person = this;
    // Haash the password only if it is modified or new
    if (!person.isModified('password')) {
        return next();
    }
    try {
        // hash password generation
        const salt = await bcrypt.genSalt(10);
        
        // hash Password
        const hashedPassword = await bcrypt.hash(person.password, salt);

        // override the plain password with hashed password
        person.password = hashedPassword;

        next();
    } catch (error) {
        return next(error);
    }
});

personSchema.methods.comparePassword = async function (candidatePassword) {
    try {
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    } catch (error) {
        throw error;
    }
};

// create the person model
const Person = mongoose.model('Person', personSchema);

module.exports = Person;