module.exports = function (mongoose) {
  const model = {
    name: 'user',
    schema: {
      name: { type: String, required: true },
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true }
    },
    modelOptions: {
      autoIndex: true
    }
  };
  return model;
};
