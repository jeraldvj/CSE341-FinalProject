module.exports = (mongoose) => {
    const userSchema = mongoose.Schema({
      officeName: {
        type: String
      },
      ubication: {
        type: String
      },
      inventory: {
        type: String
      },
      order: {
        type: [mongoose.SchemaTypes.Mixed]
      }
    });
  
    return mongoose.model('office', userSchema);
  };