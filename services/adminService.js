const db = require('../models')
const Restaurant = db.Restaurant
const Category = db.Category

const imgur = require('imgur-node-api')
const IMGUR_CLIENT_ID = process.env.IMGUR_CLIENT_ID

const adminService = {
  getRestaurants: (req, res, callback) => {
    return Restaurant.findAll({ raw: true, nest:true, include: [Category] }).then(restaurants => {
      callback({ restaurants: restaurants })
    })
  },
  getRestaurant : (req, res, callback) => {
    return Restaurant.findByPk(req.params.id, { raw: true, nest: true, include:[Category] })
    .then(restaurant => {
        callback({ restaurant: restaurant })
    })
  },
  postRestaurant: (req, res, callback) => {
    if(!req.body.name){
      return callback({ status: 'error', message: "Name didn't exist"})
    }
    const { file } = req
    if (file) {
      imgur.setClientID(IMGUR_CLIENT_ID);
      imgur.upload(file.path, (err, img) => {
        return Restaurant.create({
          name: req.body.name,
          CategoryId: req.body.categoryId,
          tel: req.body.tel,
          address: req.body.address,
          opening_hours: req.body.opening_hours,
          description: req.body.description,
          image: file ? img.data.link : null,
        }).then((restaurant) => {
          return callback({ status: 'success', message: "Restaurant Successfully created"})
        })
      })
    }
    else {
      return Restaurant.create({
        name: req.body.name,
        CategoryId: req.body.categoryId,
        tel: req.body.tel,
        address: req.body.address,
        opening_hours: req.body.opening_hours,
        description: req.body.description,
        image: null
      }).then((restaurant) => {
        return callback({ status: 'success', message: "Restaurant Successfully created"})
      })
     }
  },
  putRestaurant: (req, res) => {
    if(!req.body.name){
      callback({ status: 'error', message:"Name didn't exist"})
    }
  
    const { file } = req
    if (file) {
      imgur.setClientID(IMGUR_CLIENT_ID);
      imgur.upload(file.path, (err, img) => {
        return Restaurant.findByPk(req.params.id)
          .then((restaurant) => {
            restaurant.update({
              name: req.body.name,
              CategoryId: req.body.categoryId,
              tel: req.body.tel,
              address: req.body.address,
              opening_hours: req.body.opening_hours,
              description: req.body.description,
              image: file ? img.data.link : restaurant.image,
            })
            .then((restaurant) => {
              callback({ status:'success', message: 'Restaurant successfully updated' })
            })
          })
      })
    }
    else {
      return Restaurant.findByPk(req.params.id)
        .then((restaurant) => {
          restaurant.update({
            name: req.body.name,
            CategoryId: req.body.categoryId,
            tel: req.body.tel,
            address: req.body.address,
            opening_hours: req.body.opening_hours,
            description: req.body.description,
            image: restaurant.image
          })
          .then((restaurant) => {
            callback({ status:'success', message: 'Restaurant successfully updated' })
          })
        })
    }
  },
  deleteRestaurant: (req, res, callback) => {
    return Restaurant.findByPk(req.params.id)
            .then((restaurant) => {
                restaurant.destroy()
                .then((restaurant) => {
                    callback({ status: 'success', message: ''})
                })
            })
  }
}

module.exports = adminService