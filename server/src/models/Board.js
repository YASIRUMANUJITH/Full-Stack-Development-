import mongoose from 'mongoose'

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, minlength: 2, trim: true },
    description: { type: String, default: '' },
    assignee: { type: String, default: 'SU' },
    priority: { type: String, enum: ['high', 'medium', 'low'], default: 'medium' },
    labels: { type: [String], default: [] },
    // Optimistic-concurrency counter: every write bumps it, and a PATCH that
    // sends a stale version is rejected with 409 CONFLICT in the service layer.
    version: { type: Number, default: 1 },
  },
  {
    timestamps: true,
    toJSON: {
      versionKey: false,
      transform(doc, ret) {
        ret.id = ret._id.toString()
        delete ret._id
        return ret
      },
    },
  },
)

// Columns are embedded as plain subdocuments with their own string id
// ('todo' | 'doing' | 'done') so the API contract from earlier milestones
// keeps working unchanged.
const columnSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    title: { type: String, required: true },
    tasks: { type: [taskSchema], default: [] },
  },
  { _id: false },
)

const boardSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, minlength: 2, trim: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    members: { type: [mongoose.Schema.Types.ObjectId], ref: 'User', default: [] },
    columns: { type: [columnSchema], default: [] },
  },
  {
    timestamps: true,
    toJSON: {
      versionKey: false,
      transform(doc, ret) {
        ret.id = ret._id.toString()
        ret.owner = ret.owner?.toString()
        ret.members = (ret.members || []).map((member) => member.toString())
        delete ret._id
        return ret
      },
    },
  },
)

export const Board = mongoose.model('Board', boardSchema)
export default Board
