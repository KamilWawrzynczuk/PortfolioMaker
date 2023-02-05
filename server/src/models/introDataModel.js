import { model, Schema } from 'mongoose';
import User from './userModel.js';
const introSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  name: {
    type: String,
  },
  greeting: {
    type: String,
  },
  header: {
    type: String,
  },
  specialty: {
    type: String,
  },
  current: {
    type: String,
  },
});

const IntroData = model('Intro', introSchema);

export default IntroData;
