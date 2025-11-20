const express = require("express");
const router = express.Router();
const {
  Home,
  AllBranchesSemesters,
  getYear,
  getBranch,
  getPdf,
} = require("../controllers/allcontroller.js");
const chat = require("../controllers/geminiController.js");

router.get("/", Home);
router.get("/getBranchesAndSemesters", AllBranchesSemesters);
router.get("/getYear", getYear);
router.get("/getAllSubjects/:semester/:branch", getBranch);
router.get("/getPdf", getPdf);
router.post("/chat", chat);

import multer from "multer";
const upload = multer({ storage: multer.memoryStorage() });
const supabase = require("../utility/supabase.js");

router.post("/upload-pdf", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;

    if (!file) return res.status(400).json({ error: "No file uploaded" });

    // unique file name
    const fileName = `pdfs/${Date.now()}_${file.originalname}`;

    const { data, error } = await supabase.storage
      .from("pending") // your bucket name
      .upload(fileName, file.buffer, {
        contentType: "application/pdf",
        upsert: false,
      });

    if (error) {
      console.error(error);
      return res.status(500).json({ error: error.message });
    }

    // get public URL
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
