import mongoose, {Schema} from "mongoose";

const userSchema = new Schema(
  {
    firebaseUID: {type:String, required:true,unique:true},
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);