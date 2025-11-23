//data
const years = ["2024", "2025"];
const semesters = ["1", "2", "3", "4", "5", "6", "7", "8"];
const branches = [
  "CSE",
  "IT",
  "ECE",
  "EE",
  "ME",
  "Civil",
  "Chemical",
  "Mining",
  "Prod",
];
const subjects = {
  CSE: {
    6: ["MATH", "PHY"],
    7: ["DSA", "OOPS"],
  },
  ECE: {
    6: ["BSP", "CN", "VLSI", "IOT", "MICRO"],
    7: ["OPTICAL", "SATELLITE", "ANTENNA", "5G", "LPVLSI"],
  },
};

module.exports = { years, semesters, branches, subjects };
