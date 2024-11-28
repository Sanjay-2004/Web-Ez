import mongoose from "mongoose";

const componentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      default: "",
    },
    page: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Page",
      required: true,
    },
  },
  { timestamps: true }
);

const Component = mongoose.model("Component", componentSchema);

export default Component;
