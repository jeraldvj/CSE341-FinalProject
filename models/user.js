const bcrypt = require('bcrypt-nodejs');
module.exports = (mongoose) => {
  const userSchema = mongoose.Schema({
      username: {
        type: String
      },
      password: {
        type: String
      },
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
      specialty: {
        type: String
      },
      profile: {
        experience: {
          type: [mongoose.SchemaTypes.Mixed]
        },
        education: {
          type: [mongoose.SchemaTypes.Mixed]
        },
        references: {
          type: [mongoose.SchemaTypes.Mixed]
        }
      }
    });

    userSchema.methods.encryptPassword = (password) => {
      return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    };

    return mongoose.model('users', userSchema);
};