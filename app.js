const express = require('express')
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const db = require('./models')
const flash = require('connect-flash')
const session = require('express-session')
const passport = require('./config/passport')
const methodOverride = require('method-override')

const app = express()
const port = process.env.PORT || 3000
if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

app.engine('hbs', handlebars({ defaultLayout: 'main', extname: 'hbs'})) //Handlebars 註冊樣板引擎
app.set('view engine', 'hbs') //設定使用Handlebars 作為樣板引擎
app.use(bodyParser.urlencoded({extended: true}))
app.use(session({ secret: 'secret', resave: false, saveUninitialized: false }))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.user = req.user
    next()    
})

app.use(methodOverride('_method'))

app.use('/upload', express.static(__dirname + '/upload'))

app.listen(port, () => {
    db.sequelize.sync()
    console.log(`Example app listening on port ${port}!`)
})

require('./routes')(app, passport)