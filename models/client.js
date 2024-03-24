module.exports = (mongoose) => {
    const userSchema = mongoose.Schema({
      name: {
        type: String
      },
      lastName: {
        type: String
      },
      email: {
        type: String
      },
      phoneNumber: {
        type: String
      },
      birthday: {
        type: String
      },
      profilePicture: {
        type: String
      },
      status: {
        type: String
      },
      procedureHistory: {
        procedureName: {
          type: [mongoose.SchemaTypes.Mixed]
        },
        picture: {
          type: [mongoose.SchemaTypes.Mixed]
        },
        materialUsed: {
        type: [mongoose.SchemaTypes.Mixed]
        }
      }
    });
  
    return mongoose.model('client', userSchema);
  };