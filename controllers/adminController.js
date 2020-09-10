const db = require('../models')
const adminController = {
    getRestaurants : (req, res) => {
        return Restaurants.findAll({raw: true}).then(restaurants => {
            return res.render('admin/restaurants', { restaurants: restaurants })
        })
        return res.render('admin/restaurants')
    }
}

module.exports = adminController