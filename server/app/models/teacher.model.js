module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      username: String,
      email: String,
      password: String,
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Teacher = mongoose.model("Teacher", schema);
  return Teacher;
};