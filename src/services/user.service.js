const { UserModel } = require("../models/user.model")



// create()
const create = async (data) => {
    await (await UserModel.create(data)).save()
    return true
}

// getOne(id)
const getOne = async (_id) => await UserModel.findById(_id, { password: 0 })

// getOneByEmail("email")
const getOneByEmail = async (email) => await UserModel.findOne({ email: email })

// update(id, data)
const update = async (_id, data) => await UserModel.findByIdAndUpdate(_id, data)

// remove(id)
const remove = async (_id) => await UserModel.findByIdAndDelete(_id)

// active(id)


module.exports.UserService = { create, getOneByEmail, getOne, update }
