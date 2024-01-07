
/**
 *
 * email, password, name, avatar, active
 */

const bcrypt = require('bcrypt')

const mongoose = require("mongoose");

const Schema = new mongoose.Schema({

    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    name: { type: String, required: false },
    city: { type: String, required: false },
    avatar: { type: String, required: false },

})

Schema.pre("save", async function (next) {
    var user = this
    if (!user.isModified('password')) return next()
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)
})

const Model = mongoose.model("User", Schema)

module.exports.UserModel = Model
