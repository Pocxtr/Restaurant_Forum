const db = require('../models')
const Restaurant = db.Restaurant
const { create } = require('express-handlebars')

const adminController = {
    getRestaurants : (req, res) => {
        return Restaurant.findAll({raw: true}).then(restaurants => {
            return res.render('admin/restaurants', { restaurants: restaurants })
        })
    },
    createRestaurant : (req, res) => {
        return res.render('admin/create')
    },
    postRestaurant : (req, res) => {
        if(!req.body.name) {
            req.flash('error_msg', "Please enter name!")
            return res.redirect('back')
        }
        return Restaurant.create({
            name: req.body.name,
            tel: req.body.tel,
            address: req.body.address,
            opening_hours: req.body.opening_hours,
            description: req.body.description
        })
        .then((restaurant) => {
            req.flash('success_msg', "Restaurants successfully created")
            res.redirect('/admin/restaurants')
        })
    }
}

module.exports = adminController