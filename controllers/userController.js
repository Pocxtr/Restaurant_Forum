const bcrypt = require('bcryptjs')
const db = require('../models')
const User = db.User

const userController = {
    signUpPage: (req, res) => {
        return res.render('signup')
    },
    signUp: (req, res) => {
        if(req.body.passwordCheck !== req.body.password) {
            req.flash('error_msg', '密碼與確認密碼不符!')
            return res.redirect('/signup')
        }else {
            User.findOne({where: {email: req.body.email} }).then(user => {
                if(user) {
                    req.flash('error_msg', '此信箱已註冊!')
                    return res.redirect('/signup')
                }else {
                    User.create({
                        name: req.body.name,
                        email: req.body.email,
                        password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10), null)
                    })
                    .then(user => {
                        req.flash('success_msg', '註冊成功!')
                        return res.redirect('/signin')
                    }) 
                }
            })
        }
    },
    signInPage: (req, res) => {
        return res.render('signin')
    },
    signIn: (req, res) => {
        req.flash('success_msg', '成功登入!')
        res.redirect('/restaurants')
    },
    logout: (req, res) => {
        req.flash('success_msg', '登出成功!')
        req.logout()
        res.redirect('/signin')
    },
    getUser: (req, res) => {
        return User.findByPk(req.params.id)
        .then(user => {
            return res.render('users/profile', { profile: user })
        })
    }
}

module.exports = userController