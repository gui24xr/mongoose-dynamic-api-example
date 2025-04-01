import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String, default: 'Product'},
    price: {type: Number, default: 1000 },
    sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Seller', required: false,  },
});

const cartSchema = new mongoose.Schema({products:[{
    product:{ type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
    quantity: { type: Number }
    }]
})

const customerSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    cartId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cart', default: null,  }
})

const orderSchema = new mongoose.Schema({
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
    details: [{
                productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true,  },
                quantity: { type: Number, required: true },
             }],
    totalPrice: { type: Number, required: true },
})

const sellerSchema = new mongoose.Schema({
    name: { type: String, default: 'Seller Name'},
    email: { type: String, default: 'seller@gmail.com'}
  })

const Product = mongoose.model("Product", productSchema);
const Cart = mongoose.model("Cart", cartSchema)
const Customer = mongoose.model("Customer", customerSchema)
const Order = mongoose.model("Order", orderSchema);
const Seller = mongoose.model("Seller", sellerSchema);

export { Product, Cart, Customer, Order, Seller };

