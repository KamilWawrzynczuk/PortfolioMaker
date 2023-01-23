import { model, Schema } from 'mongoose'

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
  changeAt: {
    type: Date,
  },
  hash: String,
  salt: String
})

const User = model('User', userSchema);

export default User;