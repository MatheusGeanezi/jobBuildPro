import mongoose, { Schema, Document } from 'mongoose';

export interface IUsers extends Document {
  name: string
  pix?: string
  employee?: boolean
  condition?: string
  phone: string
  dailyRate?: number
  active?: boolean
}

const usersSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true, 
  },
  pix: {
    type: String,
    required: false,
    unique: true,
    default: null
  },
  employee: {
    type: Boolean,
    required: true,
    default: false,
  },
  condition: {
    type: String,
    required: true,
    default: null
  },
  phone: {
    type: String,
    required: true
  },
  dailyRate: {
    type: Number,
    required: false,
    default: 0,
  },
  active: {
    type: Boolean,
    required: false,
    default: true, 
  },
}, {
  timestamps: true,
});

const Users = mongoose.model<IUsers>('users', usersSchema);

export default Users