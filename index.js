require("dotenv").config()
const express = require("express")
const socket_io = require("socket.io")
const cookie = require("cookie-parser")
const session = require("express-session")
const accountRouter = require("./routes/account")
const siteRouter = require('./routes/site')
const chatRouter = require('./routes/chat')
const passport = require("passport")
const flash = require("express-flash")
require("./service/passport")

const app = express()

app.set('view engine', 'ejs')

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cookie())
app.use(session({secret: 'secret'}))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())

app.use('/', siteRouter)
app.use('/account', accountRouter)
app.use('/chat', chatRouter)

const PORT = process.env.PORT || 3000
const http = app.listen(PORT, () => {
  console.log('Server runnig http://localhost:' + PORT)
})

const io = socket_io(http)

require('./service/socket')(io)






