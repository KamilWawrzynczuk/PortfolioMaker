import { model, Schema } from 'mongoose'
import passportLocalMongoose from 'passport-local-mongoose';
import findOrCreate from 'mongoose-findorcreate';


const userSchema = new Schema({
  fName: {
    type: String,
    require: [true, 'First name is required.']
  },
  lName: {
    type: String,
    require: [true, 'Last name is required.']
  },
  email: {
    type: String,
    required: [true, 'Email is required.'],
    unique: [true, 'This email is already in use.'],
    lowercase: true,
  },
  password: {
    type: String,
    require: [true, 'Password is required.'],
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  verificationString: {
    type: String,
    default: null
  },
  changeAt: Date
})

// use passport-local-mongoose
//to hash password and salt and save users into db
userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate)


const User = model('User', userSchema);

export default User;