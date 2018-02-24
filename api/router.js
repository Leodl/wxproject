/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2018-02-07 13:11:46
 * @version $Id$
 */

const express = require('express');
const service = require('./service.js')
const carousel = require('./carousel_api.js')
const qiniutoken = require('./qiniutoken_api.js')




const router =express.Router();


// 该路由使用的中间件
router.use(function timeLog(req, res, next) {
  // console.log('Time: ', Date.now());
  next();
});

// 定义网站主页的路由
router.get('/wx/qiniu/:buckname',qiniutoken.getqiniutoken)

router.post('/wx/carousel/add',carousel.addcarousel)
router.get('/wx/carousel/getlist',carousel.getcarousel)
router.put('/wx/carousel/update',carousel.edicarousel)
router.delete('/wx/carousel/delete/:carouselid',carousel.deletecarousel)








module.exports = router;
