const express = require('express')
const app = express()
require('dotenv').config()
const port = process.env.PORT || 5000
const cors = require('cors')
const bodyParser = require('body-parser')
const dbConfig = require('./src/config/db.config')
const { Routes } = require('./src/routes/routes.index')
const path = require('path')
const multer = require('multer')
const { verifyAuth } = require('./src/middlewares/auth.middleware')
const { upload } = require('./src/common/upload')

// !important!
// you need to install the following libraries |express|[dotenv > if required]
// or run this command >> npm i express dotenv

app.use(express.static('./public'));
app.use('/static', express.static('./public'));
app.use('/temp', express.static('./public'));

app.use('/uploads', express.static('./public/uploads'));

app.use('/uploads', express.static(path.join(__dirname, './public/uploads')))
app.use('/tmp', express.static(path.join(__dirname, '/public')))

//app.use('/uploads', express.static('./uploads'))


dbConfig()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
//app.use(bodyParser.json({ limit: '30mb', extended: true }))
//app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }))

app.use('/api', Routes)

//



app.post('/upload', verifyAuth, upload.single('avatar'), async (req, res, next) => {
    console.log("file:", req.file)

    const photoUrl = `http://localhost:5000/uploads/${req.file.filename}`;

    const obj = req.body
    obj.photoUrl = photoUrl



    if (req.file) {
        res.json({ file: photoUrl, data: obj })
    } else {
        res.json({ success: false })
    }

})




app.listen(port, () => console.log('> Server is up and running on port : ' + port))
