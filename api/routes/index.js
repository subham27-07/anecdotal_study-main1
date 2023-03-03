const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const responseSchema = require("../models/response");
const csv = require("csvtojson");
const path = require("path");
const fs = require("fs");
const _ = require("lodash");
// const Response = require("../models/response");
const randomstring = require("randomstring");
const { json } = require("express/lib/response");
// API calls
let test = false;
let collection = "response";

const Response = mongoose.model(collection, responseSchema);

router.get("/consent", (req, res) => {
  if (!req.session.consent) {
    // let usertoken = randomstring.generate(8);
    let PROLIFIC_PID = req.query.PROLIFIC_PID;
    let STUDY_ID = req.query.STUDY_ID;
    let SESSION_ID = req.query.SESSION_ID;
    let usertoken = randomstring.generate(8);
    console.log(usertoken);
    console.log(PROLIFIC_PID);
    if (PROLIFIC_PID !== "null") {
      usertoken = req.query.PROLIFIC_PID;
    }
    console.log(usertoken);

    req.session.consent = true;
    req.session.completed = false;
    req.session.usertoken = usertoken;

    let newResponse = new Response({
      usertoken: usertoken,
      STUDY_ID: STUDY_ID,
      SESSION_ID: SESSION_ID,
      PROLIFIC_PID: PROLIFIC_PID,
    });
    console.log(newResponse);

    newResponse.save(function (err) {
      if (err) console.log(err);
      res.send({
        token: usertoken,
      });
    });
  } else {
    res.send({
      token: req.session.usertoken,
    });
  }
});

router.post("/preq", (req, res) => {
  console.log(req.body);
  let usertoken = req.session.usertoken;
  Response.findOneAndUpdate(
    { usertoken: usertoken },
    { preq: req.body },
    (err, doc) => {
      if (err) req.status(404).send(err);
      else res.json(req.body);
    }
  );
});

router.post("/cogref", (req, res) => {
  console.log(req.body);
  let usertoken = req.session.usertoken;
  Response.findOneAndUpdate(
    { usertoken: usertoken },
    { cogref: req.body },
    (err, doc) => {
      if (err) req.status(404).send(err);
      else res.json(req.body);
    }
  );
});

router.post("/cogref1", (req, res) => {
  console.log(req.body);
  let usertoken = req.session.usertoken;
  Response.findOneAndUpdate(
    { usertoken: usertoken },
    { cogref1: req.body },
    (err, doc) => {
      if (err) req.status(404).send(err);
      else res.json(req.body);
    }
  );
});

router.post("/instructionPost_Elicitation", (req, res) => {
  console.log(req.body);
  let usertoken = req.session.usertoken;
  Response.findOneAndUpdate(
    { usertoken: usertoken },
    { instructionPost_Elicitation: req.body },
    (err, doc) => {
      if (err) req.status(404).send(err);
      else res.json(req.body);
    }
  );
});



router.post("/instructionPost_Recall", (req, res) => {
  console.log(req.body);
  let usertoken = req.session.usertoken;
  Response.findOneAndUpdate(
    { usertoken: usertoken },
    { instructionPost_Recall: req.body },
    (err, doc) => {
      if (err) req.status(404).send(err);
      else res.json(req.body);
    }
  );
});

router.post("/instructionPre", (req, res) => {
  console.log(req.body);
  let usertoken = req.session.usertoken;
  Response.findOneAndUpdate(
    { usertoken: usertoken },
    { instructionPre: req.body },
    (err, doc) => {
      if (err) req.status(404).send(err);
      else res.json(req.body);
    }
  );
});

router.post("/instruction", (req, res) => {
  console.log(req.body);
  let usertoken = req.session.usertoken;
  Response.findOneAndUpdate(
    { usertoken: usertoken },
    { instructions: req.body },
    (err, doc) => {
      if (err) req.status(404).send(err);
      else res.json(req.body);
    }
  );
});

router.post("/quiz", (req, res) => {
  console.log(req.body);
  let usertoken = req.session.usertoken;
  Response.findOneAndUpdate(
    { usertoken: usertoken },
    { quiz: req.body },
    (err, doc) => {
      if (err) req.status(404).send(err);
      else res.json(req.body);
    }
  );
});

router.post("/quiz1", (req, res) => {
  console.log(req.body);
  let usertoken = req.session.usertoken;
  Response.findOneAndUpdate(
    { usertoken: usertoken },
    { quiz1: req.body },
    (err, doc) => {
      if (err) req.status(404).send(err);
      else res.json(req.body);
    }
  );
});

router.post("/textelicitation_AmericanPopulation", (req, res) => {
  console.log(req.body);
  let usertoken = req.session.usertoken;
  Response.findOneAndUpdate(
    { usertoken: usertoken },
    { textelicitation_AmericanPopulation: req.body },
    (err, doc) => {
      if (err) req.status(404).send(err);
      else res.json(req.body);
    }
  );
});

router.post("/textelicitation_Opioids", (req, res) => {
  console.log(req.body);
  let usertoken = req.session.usertoken;
  Response.findOneAndUpdate(
    { usertoken: usertoken },
    { textelicitation_Opioids: req.body },
    (err, doc) => {
      if (err) req.status(404).send(err);
      else res.json(req.body);
    }
  );
});

router.post("/noelicitation_drugOverdose", (req, res) => {
  console.log(req.body);
  let usertoken = req.session.usertoken;
  Response.findOneAndUpdate(
    { usertoken: usertoken },
    { noelicitation_drugOverdose: req.body },
    (err, doc) => {
      if (err) req.status(404).send(err);
      else res.json(req.body);
    }
  );
});

router.post("/noelicitation_AmericanPopulation", (req, res) => {
  console.log(req.body);
  let usertoken = req.session.usertoken;
  Response.findOneAndUpdate(
    { usertoken: usertoken },
    { noelicitation_AmericanPopulation: req.body },
    (err, doc) => {
      if (err) req.status(404).send(err);
      else res.json(req.body);
    }
  );
});

router.post("/noelicitation_Opioids", (req, res) => {
  console.log(req.body);
  let usertoken = req.session.usertoken;
  Response.findOneAndUpdate(
    { usertoken: usertoken },
    { noelicitation_Opioids: req.body },
    (err, doc) => {
      if (err) req.status(404).send(err);
      else res.json(req.body);
    }
  );
});

router.post("/recall_drugOverdose", (req, res) => {
  console.log(req.body);
  let usertoken = req.session.usertoken;
  Response.findOneAndUpdate(
    { usertoken: usertoken },
    { recall_drugOverdose: req.body },
    (err, doc) => {
      if (err) req.status(404).send(err);
      else res.json(req.body);
    }
  );
});

router.post("/viz1", (req, res) => {
  console.log(req.body);
  let usertoken = req.session.usertoken;
  Response.findOneAndUpdate(
    { usertoken: usertoken },
    { viz1: req.body },
    (err, doc) => {
      if (err) req.status(404).send(err);
      else res.json(req.body);
    }
  );
});

router.post("/visualElicitation_drugOverdose", (req, res) => {
  console.log(req.body);
  let usertoken = req.session.usertoken;
  Response.findOneAndUpdate(
    { usertoken: usertoken },
    { visualElicitation_drugOverdose: req.body },
    (err, doc) => {
      if (err) req.status(404).send(err);
      else res.json(req.body);
    }
  );
});

router.post("/visualElicitation_population", (req, res) => {
  console.log(req.body);
  let usertoken = req.session.usertoken;
  Response.findOneAndUpdate(
    { usertoken: usertoken },
    { visualElicitation_population: req.body },
    (err, doc) => {
      if (err) req.status(404).send(err);
      else res.json(req.body);
    }
  );
});

router.post("/visualElicitation_Opioids", (req, res) => {
  console.log(req.body);
  let usertoken = req.session.usertoken;
  Response.findOneAndUpdate(
    { usertoken: usertoken },
    { visualElicitation_Opioids: req.body },
    (err, doc) => {
      if (err) req.status(404).send(err);
      else res.json(req.body);
    }
  );
});

router.post("/recall_Opioids", (req, res) => {
  console.log(req.body);
  let usertoken = req.session.usertoken;
  Response.findOneAndUpdate(
    { usertoken: usertoken },
    { recall_Opioids: req.body },
    (err, doc) => {
      if (err) req.status(404).send(err);
      else res.json(req.body);
    }
  );
});

router.post("/recall_population", (req, res) => {
  console.log(req.body);
  let usertoken = req.session.usertoken;
  Response.findOneAndUpdate(
    { usertoken: usertoken },
    { recall_population: req.body },
    (err, doc) => {
      if (err) req.status(404).send(err);
      else res.json(req.body);
    }
  );
});



router.post("/attitude_Elicitation", (req, res) => {
  console.log(req.body);
  let usertoken = req.session.usertoken;
  Response.findOneAndUpdate(
    { usertoken: usertoken },
    { attitude_Elicitation: req.body },
    (err, doc) => {
      if (err) req.status(404).send(err);
      else res.json(req.body);
    }
  );
});

router.post("/topic_Involvement", (req, res) => {
  console.log(req.body);
  let usertoken = req.session.usertoken;
  Response.findOneAndUpdate(
    { usertoken: usertoken },
    { topic_Involvement: req.body },
    (err, doc) => {
      if (err) req.status(404).send(err);
      else res.json(req.body);
    }
  );
});

router.post("/instructionsGeneral", (req, res) => {
    console.log(req.body);
    let usertoken = req.session.usertoken;
    Response.findOneAndUpdate(
        { usertoken: usertoken },
        { instructionsGeneral: req.body },
        (err, doc) => {
            if (err) req.status(404).send(err);
            else res.json(req.body);
        }
    );
});

router.post("/viz", (req, res) => {
  console.log(req.body);
  let usertoken = req.session.usertoken;
  Response.findOneAndUpdate(
    { usertoken: usertoken },
    { viz: req.body },
    (err, doc) => {
      if (err) req.status(404).send(err);
      else res.json(req.body);
    }
  );
});

router.post("/attitude_recallDrug", (req, res) => {
  console.log(req.body);
  let usertoken = req.session.usertoken;
  Response.findOneAndUpdate(
    { usertoken: usertoken },
    { attitude_recallDrug: req.body },
    (err, doc) => {
      if (err) req.status(404).send(err);
      else res.json(req.body);
    }
  );
});

router.post("/attitude_recallPopulation", (req, res) => {
  console.log(req.body);
  let usertoken = req.session.usertoken;
  Response.findOneAndUpdate(
    { usertoken: usertoken },
    { attitude_recallPopulation: req.body },
    (err, doc) => {
      if (err) req.status(404).send(err);
      else res.json(req.body);
    }
  );
});

router.post("/attitude_recallOpioids", (req, res) => {
  console.log(req.body);
  let usertoken = req.session.usertoken;
  Response.findOneAndUpdate(
    { usertoken: usertoken },
    { attitude_recallOpioids: req.body },
    (err, doc) => {
      if (err) req.status(404).send(err);
      else res.json(req.body);
    }
  );
});

router.post("/attitude_ElicitationPost", (req, res) => {
  console.log(req.body);
  let usertoken = req.session.usertoken;
  Response.findOneAndUpdate(
    { usertoken: usertoken },
    { attitude_ElicitationPost: req.body },
    (err, doc) => {
      if (err) req.status(404).send(err);
      else res.json(req.body);
    }
  );
});

router.get("/debrief", (req, res) => {
  if (req.session.completed) {
    res.status(200).json({ token: req.session.usertoken });
  } else {
    res.status(200).send({
      token: "you have skiped pages. Please complete the study first.",
    });
  }
});

router.post("/postq", (req, res) => {
  console.log(req.body);
  let usertoken = req.session.usertoken;
  req.session.completed = true;
  Response.findOneAndUpdate(
    { usertoken: usertoken },
    { postq: req.body },
    (err, doc) => {
      if (err) req.status(404).send(err);
      else res.status(200).json(req.body);
    }
  );
});

router.post("/articles", (req, res) => {
    console.log(req.body);
    let usertoken = req.session.usertoken;
    req.session.completed = true;
    Response.findOneAndUpdate(
        { usertoken: usertoken },
        { postq: req.body },
        (err, doc) => {
            if (err) req.status(404).send(err);
            else res.status(200).json(req.body);
        }
    );
});





router.post("/response", (req, res) => {
  console.log(req.body);
  let usertoken = req.session.usertoken;
  Response.findOneAndUpdate(
    { usertoken: usertoken },
    { responses: req.body },
    (err, doc) => {
      if (err) req.status(404).send(err);
      else res.status(200).json({ usertoken: req.session.usertoken });
    }
  );
});

router.get("/data", async (req, res) => {
  let data = await randomize_data();
  res.status(200).json(data);
});

async function randomize_data() {
  let p = path.join(__dirname, "/../../public/");
  console.log("paaaath", p);
  const jsonArray = await csv().fromFile(
    path.join(p + "anecdotal evidence.csv")
  );
  let facesPath = path.join(p, "/faces");
  console.log(facesPath);
  const peopleImages = shuffle(fs.readdirSync(facesPath));
  jsonArray.forEach((entry, ind) => {
    let fileName = peopleImages[ind];
    let person_name = fileName.replace(".png", "");
    entry["person_image_path"] = `/faces/${fileName}`;
    entry["person_name"] = person_name;
  });

  let quads = nestArray(jsonArray, 4);
  let groups = quads.map((quad) => {
    return nestArray(quad, 2);
  });

  // console.log(groups);
  //
  let phase_1 = [];
  let phase_2 = [];
  // console.log(groups[0][0][0]);
  groups.forEach((group) => {
    let firstIndex = getRandomInt(2);
    let secondIndex = firstIndex ^ 1;
    // console.log(firstIndex, secondIndex);
    // console.log(group);
    phase_1.push(group[0][firstIndex]);
    phase_1.push(group[1][secondIndex]);
    phase_2.push(group[0][secondIndex]);
    phase_2.push(group[1][firstIndex]);
  });
  let indices = shuffle([...Array(phase_1.length).keys()]);
  phase_1 = indices.map((ind) => phase_1[ind]);
  phase_2 = indices.map((ind) => phase_2[ind]);
  return [phase_1, phase_2];
}

randomize_data();

function nestArray(array, size) {
  let arrayCopy = [...array];
  let nest = [];
  while (arrayCopy.length > 0) nest.push(arrayCopy.splice(0, size));
  return nest;
}

function choose(choices) {
  var index = Math.floor(Math.random() * choices.length);
  return choices[index];
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

module.exports = router;
