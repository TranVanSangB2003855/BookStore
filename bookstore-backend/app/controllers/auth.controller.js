const config = require("../config/index");
const USER = require("../models/user.model");
const ROLE = require("../models/role.model");
const CARD = require("../models/card.model");
const ORDER = require("../models/order.model");
const BOOK = require("../models/book.model");

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
  let roles ;
  if (req.body.roles) {
    const roless = await ROLE.find(
      {
        name: { $in: req.body.roles },
      });
      roles = roless.map((role) => role._id);
      // res.send({ message: "User was registered successfully!" });
    } else {
      const role = await ROLE.findOne({ name: "user" })
      roles = [];
      roles.push(role._id);
    }
    const user = new USER({
      full_name: req.body.full_name,
      phone: req.body.phone,
      address: req.body.address,
      password: bcrypt.hashSync(req.body.password, 8),
      roles: roles
    });
    await user.save();

  res.send({ message: "User was registered successfully!" });

};

exports.signin = (req, res) => {
  USER.findOne({
    phone: req.body.phone,
  })
    .populate("roles", "-__v")
    .exec(async (err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      console.log(user.password, req.body.password)

      if (!passwordIsValid) {
        return res.status(401).send({ message: "Invalid Password!" });
      }

      var token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: 86400, // 24 hours
      });

      var authorities = [];

      for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      }

      req.session.token = token;

      let orderPupolate = [];

      let orderT = user.orders;
      const lengthOrder = orderT.length;

      for (let i = 0; i < lengthOrder; i++) {
        let order = await ORDER.findById(orderT[i]);
        let orderProducts = [];
        const lengthProducts = order.products.length;
        for (let i = 0; i < lengthProducts; i++) {
          let tempt = await BOOK.findById(order.products[i].book_id, {
            title: 1
          })
          // order.products[i].title = tempt.title;
          orderProducts.push({
            book_id: order.products[i].book_id,
            quantity: order.products[i].quantity,
            price: order.products[i].price,
            title: tempt.title
          })
        }
        // order.products = orderProducts;
        // console.log("orderProducts",orderProducts)
        // console.log("order",order)

        orderPupolate.push({
          _id: order._id,
          status: order.status,
          time: order.time,
          address: order.address,
          totalPrice: order.totalPrice,
          products: orderProducts
        })
      }

      let cardPupolate = await CARD.findById(user.card);
      console.log("cardPupolate", cardPupolate)
      let cardProducts = [];
      const lengthCard = cardPupolate.products.length;
      for (let i = 0; i < lengthCard; i++) {
        let tempt = await BOOK.findById(cardPupolate.products[i].book_id, {
          image: 1,
          title: 1
        })
        cardProducts.push({
          book_id: cardPupolate.products[i].book_id,
          quantity: cardPupolate.products[i].quantity,
          price: cardPupolate.products[i].price,
          title: tempt.title,
          image: tempt.image[0]
        })
      }

      // cardPupolate.products = cardProducts;
      // console.log(cardPupolate)

      res.status(200).send({
        id: user._id,
        phone: user.phone,
        full_name: user.full_name,
        address: user.address,
        orders: orderPupolate,
        card: {
          "_id": cardPupolate._id,
          user: cardPupolate.user,
          products: cardProducts,
          totalPrice: cardPupolate.totalPrice
        },
        roles: authorities,
        accessToken: token,
      });
    });
};

exports.signout = async (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({ message: "You've been signed out!" });
  } catch (err) {
    this.next(err);
  }
};