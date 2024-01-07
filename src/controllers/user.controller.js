const { UserService } = require("../services/user.service")


const getOneUser = async (req, res) => {
    const result = await UserService.getOne(req.params._id)
    res.json(result)
}

const updateUser = async (req, res) => {
    let photoUrl
    if (req.file) {
        photoUrl = `http://localhost:5000/uploads/${req.file.filename}`;
    }


    const obj = req.body
    obj.avatar = photoUrl

    const result = await UserService.update(req.params._id, obj)
    res.json(obj)
}

module.exports.UserController = { getOneUser, updateUser }
