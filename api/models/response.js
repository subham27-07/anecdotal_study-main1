const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const responseSchema = new Schema({
  usertoken: {
    type: String,
    required: true,
  },
  SESSION_ID: {
    type: String,
  },
  STUDY_ID: {
    type: String,
  },
  PROLIFIC_PID: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  survey_start: {
    type: Number,
    default: Date.now
  },
  understanding_test: Schema.Types.Mixed,
  textelicitation_drugOverdose: Schema.Types.Mixed,
  attitude_Elicitation: Schema.Types.Mixed,
  topic_Involvement: Schema.Types.Mixed,
  cogref: Schema.Types.Mixed,
  cogref1: Schema.Types.Mixed,
  attitude_recallDrug: Schema.Types.Mixed,
  attitude_recallPopulation: Schema.Types.Mixed,
  attitude_recallOpioids: Schema.Types.Mixed,
  instructions: Schema.Types.Mixed,
  preq: Schema.Types.Mixed,
  postq: Schema.Types.Mixed,
  responses: Schema.Types.Mixed,
  article_responses: Schema.Types.Mixed,
  recall_responses: Schema.Types.Mixed,
  attitude_ElicitationPost: Schema.Types.Mixed,
});

// const Response = mongoose.model("tresponse", responseSchema);

// const lineDataSchema1 = new mongoose.Schema({
//   year: { type: Number, required: true },
//   value: { type: Number, required: true },
//   type: { type: String, required: true },
//   userId: { type: String, required: true },
//   createdAt: { type: Date, default: Date.now }
// });

// const lineDataSchema2 = new mongoose.Schema({
//   year: { type: Number, required: true },
//   value: { type: Number, required: true },
//   type: { type: String, required: true },
//   userId: { type: String, required: true },
//   createdAt: { type: Date, default: Date.now }
// });

// const lineDataSchema3 = new mongoose.Schema({
//   year: { type: Number, required: true },
//   value: { type: Number, required: true },
//   type: { type: String, required: true },
//   userId: { type: String, required: true },
//   createdAt: { type: Date, default: Date.now }
// });

// const LineData1 = mongoose.model('LineData', lineDataSchema1);
// const LineData2 = mongoose.model('LineData', lineDataSchema2);
// const LineData3 = mongoose.model('LineData', lineDataSchema3);

// module.exports = LineData1;
// module.exports = LineData2;
// module.exports = LineData3;

module.exports = responseSchema;
