const express = require('express')
const { handleGenerteNewShortURL,handleGetAnalytics,handleGetRedirectedURL } = require('../controllers/url')
const Router = express.Router()

Router.post('/',handleGenerteNewShortURL)

Router.get('/:shortId',handleGetRedirectedURL)

Router.get('/analytics/:shortID',handleGetAnalytics)

module.exports = Router;