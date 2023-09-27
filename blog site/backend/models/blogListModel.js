import mongoose from "mongoose";

const blogListSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        caption: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const registrationSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        }
    }
)

const Blog = mongoose.model('blogList',blogListSchema);
const User = mongoose.model('User',registrationSchema);

export {
    Blog,
    User
}