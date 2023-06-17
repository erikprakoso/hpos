module.exports = (mongoose) => {
    const schema = mongoose.Schema(
        {
            category_id: String,
            product_name: String,
            product_desc: String,
            product_price: String,
            product_qty: String,
            product_image: {
                data: Buffer,
                contentType: String
            }
        }
    )

    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject()
        object.product_id = _id
        return object
    })

    const Product = mongoose.model("products", schema)
    return Product
}