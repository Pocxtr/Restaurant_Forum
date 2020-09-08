const express = require('express')
const handlebars = require('express-handlebars')
const app = express()
const port = 3000

app.engine('hbs', handlebars({ defaultLayout: 'main', extname: 'hbs'})) //Handlebars 註冊樣板引擎
app.set('view engine', 'hbs') //設定使用Handlebars 作為樣板引擎

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
})

require('./routes')(app)