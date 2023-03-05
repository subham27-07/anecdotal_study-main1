// const pages = [
//   "consent",
//   "pre",
//   "instructions1",
//   "quiz",
//   "attitude_Elicitation",
//   "topic_Involvement",
//   "textelicitation_drugOverdose",
//   "textelicitation_AmericanPopulation",
//   "textelicitation_Opioids",
//   "noelicitation_drugOverdose",
//   "noelicitation_AmericanPopulation",
//   "noelicitation_Opioids",
//   "visualElicitation_drugOverdose",
//   "visualElicitation_population",
//   "visualElicitation_Opioids",
//   "cogref",
//   "cogref1",
//   "instructionPost_Elicitation",
//   "instructionPost_Recall",
//   "viz1",
//   "recall_drugOverdose",
//   "recall_Opioids",
//   "attitude_ElicitationPost",
//   "debrief",
// ];

// gets next page path.

const pageHandler = (pages, donePage) => {
  console.log(donePage);
  let pageIndex = pages.current.indexOf(donePage.replace("/", ""));
  console.log(pageIndex);
  if (pageIndex !== -1) {
    console.log(`/${pages.current[pageIndex + 1]}`);
    return `/${pages.current[pageIndex + 1]}`;
  }
};

export default pageHandler;
