module.exports = (mongoose) => {
    const schema = mongoose.Schema(
        {
            order_id: String,
            product_name: String,
        },
        {
            timestamps: true
        }
    )

    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject()
        object.product_name_id = _id
        return object
    })

    const ProductName = mongoose.model("product_names", schema)
    return ProductName
}