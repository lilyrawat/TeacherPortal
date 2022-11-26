module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      name: String,
      email: String,
      contact_number: String,
      DOB: String,
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Student = mongoose.model("student", schema);
  return Student;
};