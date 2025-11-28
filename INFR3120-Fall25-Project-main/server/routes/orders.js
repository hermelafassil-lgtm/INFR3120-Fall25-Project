const express = require("express");
const router = express.Router();
const Order = require("../models/order");

// Middleware to check login
function isLoggedIn(req, res, next) {
    if (!req.session.user) {
        return res.redirect("/users/login");
    }
    next();
}

// Show user's orders (READ)
router.get("/", isLoggedIn, async (req, res) => {
    const orders = await Order.find({ userId: req.session.user.username });
    res.render("orders/list", { title: "My Orders", orders });
});

// Show Create Order Page (CREATE FORM)
router.get("/create", isLoggedIn, (req, res) => {
    res.render("orders/create", { title: "Place Order" });
});

// Handle Create Order POST
router.post("/create", isLoggedIn, async (req, res) => {
    await Order.create({
        userId: req.session.user.username,
        dish: req.body.dish,
        quantity: req.body.quantity,
        instructions: req.body.instructions,
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone
    });

    res.redirect("/orders");
});

// Show Edit Order Page (UPDATE FORM)
router.get("/edit/:id", isLoggedIn, async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (!order || order.userId !== req.session.user.username) {
        return res.redirect("/orders");
    }
    res.render("orders/edit", { title: "Edit Order", order });
});

// Handle UPDATE POST
router.post("/edit/:id", isLoggedIn, async (req, res) => {
    await Order.findByIdAndUpdate(req.params.id, {
        dish: req.body.dish,
        quantity: req.body.quantity,
        instructions: req.body.instructions,
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone
    });
    res.redirect("/orders");
});

// DELETE Order
router.get("/delete/:id", isLoggedIn, async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order && order.userId === req.session.user.username) {
        await Order.findByIdAndDelete(req.params.id);
    }
    res.redirect("/orders");
});

module.exports = router;
