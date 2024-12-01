import mongoose, { Schema, Document, Types } from 'mongoose'

export interface IAttendance {
  date: string
  present: boolean
}

export interface IUsers extends Document {
  _id?: Types.ObjectId
  name: string
  pix?: string
  employee?: boolean
  condition?: string
  phone: string
  dailyRate?: number
  active?: boolean
  attendance?: IAttendance[]
}

const usersSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
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
      default: false
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
      default: 0
    },
    active: {
      type: Boolean,
      required: false,
      default: true
    },
    attendance: [
      {
        date: { type: String, required: true },
        present: { type: Boolean, required: true, default: false }
      }
    ]
  },
  {
    timestamps: true
  }
)

usersSchema.index(
  { 'attendance.date': 1 },
  { expireAfterSeconds: 7 * 24 * 60 * 60 }
)

const Users = mongoose.model<IUsers>('users', usersSchema)

export default Users
