import mongoose from 'mongoose'
const { Schema, model } = mongoose

const petSchema = new Schema(
    {
    name: {
        type: String,
        required: [true, "The name is required"]
    },
    type: {
        type: String,
        required: [true, "The type is required"]
    },
    description: {
        type: String,
        required: [true, "The description is required"]
    },
    skill1: {
        type: String
    },
    skill2: {
        type: String
    },
    skill3: {
        type: String
    },
    created_at: {
        type: Date,
        default: () => Date.now(),
        immutable: true
    }
});

const Pet = model("Pet", petSchema)

export default Pet