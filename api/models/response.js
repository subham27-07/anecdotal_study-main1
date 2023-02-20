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
  quiz: Schema.Types.Mixed,
  quiz1: Schema.Types.Mixed,
  quiz2: Schema.Types.Mixed,
  quiz3: Schema.Types.Mixed,
  quiz4: Schema.Types.Mixed,
  quiz5: Schema.Types.Mixed,
  quiz6: Schema.Types.Mixed,
  quiz7: Schema.Types.Mixed,
  quiz8: Schema.Types.Mixed,
  viz: Schema.Types.Mixed,
  viz1: Schema.Types.Mixed,
  viz2: Schema.Types.Mixed,
  cogref: Schema.Types.Mixed,
  cogref1: Schema.Types.Mixed,
  instructions: Schema.Types.Mixed,
  preq: Schema.Types.Mixed,
  postq: Schema.Types.Mixed,
  responses: Schema.Types.Mixed,
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
