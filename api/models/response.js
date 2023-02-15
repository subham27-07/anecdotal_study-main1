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
  cogref: Schema.Types.Mixed,
  cogref1: Schema.Types.Mixed,
  instructions: Schema.Types.Mixed,
  preq: Schema.Types.Mixed,
  postq: Schema.Types.Mixed,
  responses: Schema.Types.Mixed,
});

// const Response = mongoose.model("tresponse", responseSchema);

module.exports = responseSchema;
