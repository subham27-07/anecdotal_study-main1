const mongoose = require("mongoose");
const { stringify } = require("querystring");

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
  condition:{
    type: String
  },


  quiz: Schema.Types.Mixed,
  attitude_Elicitation: Schema.Types.Mixed,
  topic_Involvement: Schema.Types.Mixed,
  cogref: Schema.Types.Mixed,
  cogref1: Schema.Types.Mixed,
  attitude_recallDrug: Schema.Types.Mixed,
  attitude_recallPopulation: Schema.Types.Mixed,
  attitude_recallOpioids: Schema.Types.Mixed,
  preq: Schema.Types.Mixed,
  postq: Schema.Types.Mixed,
  attitude_ElicitationPost: Schema.Types.Mixed,
  article_responses: Schema.Types.Mixed,
  recall_responses: Schema.Types.Mixed
});


module.exports = responseSchema;
