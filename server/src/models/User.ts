import mongoose, {Schema} from "mongoose";

const userSchema = new Schema(
  {
    firebaseUID: {type:String, required:true,unique:true},
    firstName: { type: String, required: true, trim:true },
    lastName: { type: String, required: true, trim:true },
    email: { type: String, required: true, unique: true, trim:true, lowercase:true },
    password:{type:String, required:true},
    phoneNumber: {type: String, trum:true},
    registeredAt: {type: Date , default:Date.now},
    role: { type: String, enum: ["user", "admin"], default: "user" },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);