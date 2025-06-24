import mongoose from "mongoose";
import Post from "../models/Post";

async function addViewsFieldToPosts() {
  try {
    await mongoose.connect(
      "mongodb+srv://alexro007:xuDZeY827oULrRGe@cluster0.xnyphfw.mongodb.net/db?retryWrites=true&w=majority&appName=Cluster0"
    );

    const result = await Post.updateMany(
      { views: { $exists: false } },
      { $set: { views: 0 } }
    );

    console.log(`✅ Updated ${result.modifiedCount} posts.`);
    await mongoose.disconnect();
  } catch (error) {
    console.error("❌ Error updating posts:", error);
  }
}

addViewsFieldToPosts();
