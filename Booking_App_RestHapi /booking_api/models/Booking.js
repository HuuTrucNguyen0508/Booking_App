module.exports = function (mongoose) {
  const model = {
    name: 'booking',
    schema: {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
      locationId: { type: mongoose.Schema.Types.ObjectId, ref: 'location', required: true },
      date: { type: Date, required: true }
    },
    modelOptions: {
      autoIndex: true
    }
  };
  return model;
};
