const pages = [
  "consent",
  "pre",
  "instructions1",
  "quiz",
  "quiz2",
  "quiz3",
  "quiz1",
  "cogref",
  "debrief",
];

// const pages = [
//   "consent",
//   "pre",
//   "instructions1",
//   "instructions2",
//   "instructions3",
//   "quiz",
//   "quiz1",
//   "task1",
//   "cogref",
//   "task2",
//   "instructions4",
//   "task3",
//   "post",
//   "debrief",
// ];

// gets next page path.

const pageHandler = (donePage) => {
  console.log(donePage);
  let pageIndex = pages.indexOf(donePage.replace("/", ""));
  console.log(pageIndex);
  if (pageIndex !== -1) {
    return `/${pages[pageIndex + 1]}`;
  }
};

export default pageHandler;
