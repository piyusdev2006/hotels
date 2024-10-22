const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    taste: {
        type: String,
        enum: ["sweet", "sour", "spicy"],
        default: "sweet",
        required: true,
    },
    is_drink: {
        type: Boolean,
        default: false,
    },
    ingredients: {
        type: [String],
        default : [],
        required: true,
    },
    num_sales: {
        type: Number,
        default: 0,
    },

});

const MenuItem = mongoose.model("MenuItem", menuSchema);

module.exports = MenuItem;