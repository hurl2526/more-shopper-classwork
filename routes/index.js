const express = require('express');
const router = express.Router();
const Product = require('./admin/products/models/Product');
const productsArray = require('./admin/products/models/productsArray')

const paginate = (req, res, next) => {
  const perPage = 6;
  const page = req.params.pageNumber;
  Product.find()
    .skip(perPage * (page - 1))
    .limit(perPage)
    .populate('category')
    .exec((err, products) => {
      if (err) return next(err);
      Product.countDocuments().exec((err, count) => {
        if (err) return next(err);
        return res.render('main/home-products', {
          products:products,
          pages: Math.ceil(count / perPage),
          page: +page,
        });
      });
    });
};

/* GET home page. */
router.get('/', function (req, res, next) {
  if (req.user) {
    return paginate(req, res, next);
  }
  // console.log(req.session)
  return res.render('main/home',{productsArray});
});

router.get('/page/:pageNumber',(req,res,next)=>{
  return paginate(req,res,next)
})

router.get('/logout', (req, res) => {
  console.log('logout', req.session.cookie);
  // req.logout();
  res.clearCookie('connect.sid', {
    path: '/',
    httpOnly: true,
    secure: false,
    maxAge: null
  });
  req.session.destroy();
  // console.log('cookie', req.session);
  return res.redirect('/');
});

module.exports = router;
