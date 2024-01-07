/**
 * create(userID, data)
 * getOne(id)
 * getAll()
 * getAllByUserID(userID)
 * getAllByLocation(city_name) // search -- //!noch nicht!
 * getAllNew() -- //!noch nicht!
 * getAllOld() -- //!noch nicht!
 * getAllByTitle(title) // search --  //!noch nicht!
 * update(id, data)
 * remove(id)
 *
 */

const { EventModel } = require("../models/event.model")

const create = async (data) => await EventModel.create(data)

const getOne = async (_id) => await EventModel.findById(_id)


const getAll = async () => await EventModel.find()

const getAllByUserID = async (userID) => await EventModel.find({ user: userID })


const update = async (_id, data) => await EventModel.findByIdAndUpdate(_id, data, { new: true })


const remove = async (_id) => await EventModel.findByIdAndDelete(_id)
//
const getAllNew = async () => await EventModel.find().sort({$natural: -1}).limit(5)

const getAllOld = async () => await EventModel.find().sort().limit(5)



const getAllByLocation = async (city_name) => await EventModel.find({location: city_name})


const getAllByTitle = async (title) => await EventModel.find({title: title})



// search





module.exports.EventService = {
    create,
    getOne, getAll, getAllByUserID,
    update,
    remove,
    getAllNew,
    getAllOld,
    getAllByLocation,
    getAllByTitle,
}
