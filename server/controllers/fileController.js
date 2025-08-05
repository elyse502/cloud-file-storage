import File from "../models/File.js";
import cloudinary from "cloudinary";

// 📤 Upload File
const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file provided" });
    }

    const file = await File.create({
      userId: req.user.id,
      name: req.file.originalname,
      url: req.file.path,
      size: req.file.size,
      type: req.file.mimetype,
      cloudinaryId: req.file.filename,
    });

    res.status(200).json({ message: "File uploaded successfully", file });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ message: "Upload failed", error: err.message });
  }
};

// 📄 Get all uploaded files for the current user
const getFiles = async (req, res) => {
  try {
    const files = await File.find({ userId: req.user.id }).sort({ uploadedAt: -1 });
    res.json({ files });
  } catch (err) {
    console.error("Fetch files error:", err);
    res.status(500).json({ message: "Failed to retrieve files", error: err.message });
  }
};

// ❌ Delete file from both MongoDB & Cloudinary
const deleteFile = async (req, res) => {
  try {
    const fileId = req.params.id;
    const userId = req.user.id;

    const file = await File.findOne({ _id: fileId, userId });
    if (!file) {
      return res.status(404).json({ message: "File not found or access denied" });
    }

    let resourceType = "raw";
    if (file.type?.startsWith("image/")) resourceType = "image";
    else if (file.type?.startsWith("video/")) resourceType = "video";

    const result = await cloudinary.v2.uploader.destroy(file.cloudinaryId, {
      resource_type: resourceType,
    });

    if (result.result !== "ok" && result.result !== "not found") {
      return res.status(500).json({
        message: "Cloudinary deletion failed",
        error: result,
      });
    }

    await File.deleteOne({ _id: file._id });

    res.json({ message: "File deleted successfully" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ message: "Delete failed", error: err.message });
  }
};

export { uploadFile, getFiles, deleteFile };
