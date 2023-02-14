import { atom, selector } from "recoil";

export const questionState = atom({
  key: "questionState",
  default: "strength",
});

export const questionSelector = selector({
  key: "questionSelector",
  get: ({ get }) => {
    let questionCondition = get(questionState);
    let getQL;
    switch (questionCondition) {
      case "strength":
        getQL = (tweetText) => {
          return `What is your opinion on drug overdose in the US ?`;
        };
        return getQL;
        break;
    }
  },
  
});



export const qualQuestionSelector = selector({
  key: "qualQuestionSelector",
  get: ({ get }) => {
    let questionCondition = get(questionState);
    let getQL;
    switch (questionCondition) {
      case "strength":
        getQL = (tweetText) => {
          return `For the tweet above👆 You made the below👇 judgment when asked: "To what extent does the quoted news headline support ${tweetText.name}'s conclusion?"`;
        };
        return getQL;

        break;
    }
  },
});

export const labelSelector = selector({
  key: "labelQuestionSelector",
  get: ({ get }) => {
    let questionCondition = get(questionState);
    switch (questionCondition) {
      case "share":
        // return [
        //   "Not likely at all",
        //   "Slightly likely",
        //   "Moderately Likely",
        //   "Completely likely",
        // ];
        // return ["No", "Slightly", "Moderately", "Strongly"];
        return [
          "Definitely no",
          "Probably no",
          "Probably yes",
          "Definitely yes",
        ];
        break;
      case "strength":
        return [
          "Extremely Serious Problem",
          "Serious Problem",
          "Moderate Problem",
          "Minor Problem",
          "Not a Problem",
        ];

        break;
    }
  },
});

// export { questionState, questionSelector };
