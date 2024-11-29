import mongoose, { Schema, Document, Types, Model, AggregatePaginateResult } from 'mongoose'
import aggregatePaginate from 'mongoose-aggregate-paginate-v2'


export interface IBuild extends Document {
  name: string
  description: string
  employees: Types.ObjectId[]
  budget: number
  deadline: Date
  status: 'pending' | 'in_progress' | 'completed' | 'canceled'
  createdAt?: Date
  updatedAt?: Date
}

interface IBuildModel extends Model<IBuild> {
  aggregatePaginate: (
    query: mongoose.Aggregate<any>,
    options: mongoose.PaginateOptions
  ) => Promise<AggregatePaginateResult<IBuild>>
}

const buildSchema: Schema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    employees: [{ type: Schema.Types.ObjectId, ref: 'users' }],
    budget: { type: Number, min: 0 },
    deadline: { type: Date },
    status: {
      type: String,
      enum: ['pending', 'in_progress', 'completed', 'canceled'],
      default: 'pending',
    },
  },
  { timestamps: true }
)

buildSchema.plugin(aggregatePaginate)

const BuildModel = mongoose.model<IBuild, IBuildModel>('builds', buildSchema)

export default BuildModel
