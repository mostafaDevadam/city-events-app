
/**
 * title, description, Date/(start-date, end-date) , location/city, owner(user), people/members/interesting[user],
 */
const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    date: { type: String },
    location: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},

}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
})


const model = mongoose.model("Event", schema)

module.exports.EventModel = model
