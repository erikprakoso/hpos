module.exports = (mongoose) => {
    const schema = mongoose.Schema(
        {
            order_id: String,
            product_qty: String,
        },
        {
            timestamps: true
        }
    )

    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject()
        object.product_qty_id = _id
        return object
    })

    const ProductQty = mongoose.model("product_qtys", schema)
    return ProductQty
}