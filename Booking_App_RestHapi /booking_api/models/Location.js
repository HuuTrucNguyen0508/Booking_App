module.exports = function (mongoose) {
  const model = {
    name: 'location',
    schema: {
      name: { type: String, required: true },
      price: { type: Number, required: true },
      available: { type: Boolean, default: true }
    },
    modelOptions: {
      autoIndex: true
    }
  };
  return model;
};
