import React from "react";
import {choose} from "../../functions/functions";

export default function TreatmentSelector(){

    const pre_pages = [
        "consent",
        "pre",
        "instructions1",
        "quiz",
        "attitude_Elicitation",
        "topic_Involvement",
    ]
    const txt_pages = [
        "textelicitation_drugOverdose",
        "textelicitation_AmericanPopulation",
        "textelicitation_Opioids",
    ]
    const visual_pages = [
        "visualElicitation_drugOverdose",
        "visualElicitation_population",
        "visualElicitation_Opioids",
    ]
    const control = [
        "noelicitation_drugOverdose",
        "noelicitation_AmericanPopulation",
        "noelicitation_Opioids",
    ]
    const post_pages = [
        "cogref",
        "cogref1",
        "viz1",
        "recall_drugOverdose",
        "recall_Opioids",
        "attitude_ElicitationPost",
        "debrief",
    ]

    const treatment = choose(['txt','visual','control'])

    switch(treatment){
        case 'txt':
            return [...pre_pages, ...txt_pages, ...post_pages];
        case 'visual':
            return [...pre_pages, ...visual_pages, ...post_pages];
        case 'control':
            return [...pre_pages, ...control, ...post_pages];
        default:
            console.log(`Treatment is : ${treatment}`)
            console.log('Error with TreatmentSelector! No such treatment found!')
        break;
    }
}


