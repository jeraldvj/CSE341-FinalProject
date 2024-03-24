module.exports = (mongoose) => {
    const userSchema = mongoose.Schema({
      supplierName: {
        type: String
      },
      products: {
        productName: {
          type: [mongoose.SchemaTypes.Mixed]
        },
        productPicture: {
          type: [mongoose.SchemaTypes.Mixed]
        },
        cost: {
          type: [mongoose.SchemaTypes.Mixed]
        }
      }
    });
  
    return mongoose.model('supplier', userSchema);
  };