const express = require('express')
const handlebars = require('express-handlebars')
const app = express()
const port = 3000
app.engine('handlebars', handlebars()) //Handlebars 註冊樣板引擎
app.set('view engine', 'handlebars') //設定使用Handlebars 作為樣板引擎

app.listen(port, () => {
    console.log(`example app listening on port ${port}!`)
})