const db = require('../models')
const Category = db.Category

const categoryService = require('../services/categoryService.js')

const categoryController = {
    getCategories: (req, res) => {
        categoryService.getCategories(req, res, (data) => {
            return res.render('admin/categories, data')
        })
    },
    postCategory: (req, res) => {
        if(data['status'] === 'error') {
            req.flash('error_msg', data['message'])
            return res.redirect('back')   
        }
        req.flash('success_msg', data['message'])
        res.redirect('/admin/categories')
    },
    putCategory: (req, res) => {
        categoryService.putCategory(req, res, (data) => {
            if (data['status'] === 'error') {
                req.flash('error_msg', data['message'])
                return res.redirect('back')
            }
            req.flash('success_msg', data['message'])
            res.redirect('/admin/categories')
        })
    },
    deleteCategory: (req, res) => {
        categoryService.deleteCategory(req, res, data => {
            if (data['status'] === 'success') {
                return res.redirect('/admin/categories')
            }
        })
    }
}

module.exports = categoryController