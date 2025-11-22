const express = require("express");
const router = express.Router();
const {
  AllBranchesSemesters,
  getYear,
  getBranch,
  getPdf,
} = require("../controllers/pyqController.js");

router.get("/getBranchesAndSemesters", AllBranchesSemesters);

router.get("/getYear", getYear);

router.get("/getAllSubjects/:semester/:branch", getBranch);

router.get("/getPdf", getPdf);

const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const supabase = require("../utility/supabase.js");

router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;

    if (!file) return res.status(400).json({ error: "No file uploaded" });
    //unique file name banane ke liye
    const fileName = `pdfs/${Date.now()}_${file.originalname}`;
    //bucket name=pending
    const { data, error } = await supabase.storage
      .from("pending")
      .upload(fileName, file.buffer, {
        contentType: file.mimetype,
        upsert: false,
      });

    if (error) {
      console.error(error);
      return res.status(500).json({ error: error.message });
    }

    const { data: publicUrl } = supabase.storage
      .from("pending")
      .getPublicUrl(fileName);

    return res.json({
      message: "File uploaded successfully",
      url: publicUrl.publicUrl,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
