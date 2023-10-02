const catchError = require('../utils/catchError');
const Purchase = require('../models/Purchase');
const cartRouter = require('../routes/cart.router');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const Image = require('../models/Image');

const getAll = catchError(async(req, res) => {
    const userId = req.user.id
    const purchases = await Purchase.findAll({
        include:{
            model: Product,
            include: Image
        },
        where:{ userId }
        
    });
    return res.json(purchases)
});

const create = catchError(async(req, res)=>{
    const userId = req.user.id
    const carts = await Cart.findAll({
        where:{ userId },
        attributes:['userId', 'productId', 'quantity'],
        raw: true,
    });
    const purchases = await Purchase.bulkCreate(carts);
    await Cart.destroy({ where: { userId } })
    return res.status(201).json(purchases);
})

module.exports = {
    getAll,
    create
}