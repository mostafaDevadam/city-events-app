const mongoose = require("mongoose");

module.exports = async () => {
    const uri = process.env.MONGODB

    try {
        await mongoose.connect(uri.toString())

    } catch (error) {
        console.error(error)
    }

}
