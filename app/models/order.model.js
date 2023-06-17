module.exports = (mongoose) => {
    const schema = mongoose.Schema(
        {
            customer_id: String,
            product_id: String,
            product_qty: String,
            order_date: String,
            total_amount: String,
            payment_method: String,
            discount: String,
        },
        {
            timestamps: true
        }
    )

    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject()
        object.order_id = _id
        return object
    })

    const Order = mongoose.model("orders", schema)
    return Order
}