
const supabase = require("../utility/supabase.js");
const { years, semesters, branches, subjects } = require("../utility/db.js");
const Home = (req, res) => {
  res.send(`hello world`);
};

const AllBranchesSemesters = (req, res) => {
  res.status(201).json({
    branches: branches,
    semesters: semesters,
  });
};

const getYear = (req, res) => {
  res.status(201).json(years);
};

const getBranch = (req, res) => {
  const { branch, semester } = req.params;
  const ans = subjects[branch][semester];
  if (ans) {
    res.status(201).json(ans);
  } else res.status(404).send(`backend error`);
};

const getPdf = async (req, res) => {
  const { semester, branch, subject, type, year } = req.query;

  try {
    let url = "";
    if (type == "syllabus")
      url = `${semester}/${branch}/${subject}/syllabus.pdf`;
    else url = `${semester}/${branch}/${subject}/${year}/${type}.pdf`;
    const { data } = supabase.storage
      .from("semesterQuestionBanks")
      .getPublicUrl(url);
    //console.log("data", data);
    res.status(201).json({
      url: data.publicUrl,
    });
  } catch (error) {
    res.status(500).send("internal server eroor");
  }
};

module.exports = { Home, AllBranchesSemesters, getYear, getBranch, getPdf };
