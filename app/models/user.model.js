module.exports = (mongoose) => {
    const schema = mongoose.Schema(
        {
            user_email: String,
            user_password: String,
            user_name: String,
            user_role: String,
        }
    )

    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject()
        object.user_id = _id
        return object
    })

    const User = mongoose.model("users", schema)
    return User
}