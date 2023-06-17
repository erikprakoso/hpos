module.exports = (mongoose) => {
    const schema = mongoose.Schema(
        {
            customer_name: String,
            customer_phone: String,
        }
    )

    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject()
        object.customer_id = _id
        return object
    })

    const Customer = mongoose.model("customers", schema)
    return Customer
}