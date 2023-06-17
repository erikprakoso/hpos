module.exports = (mongoose) => {
    const schema = mongoose.Schema(
        {
            category_name: String,
            category_desc: String,
        }
    )

    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject()
        object.category_id = _id
        return object
    })

    const Category = mongoose.model("categories", schema)
    return Category
}