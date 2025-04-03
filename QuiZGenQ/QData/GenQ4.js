import { AnsNotIn,getRandomInt,getRandomIntMN,ArrayEqual,ArrayNotIn } from "/QuiZGenQ/QData/GobalFunction.js";

// input

let equation  = "((-1)*(u**2))/(2*(x-u*t))";
let limitRandom = {u:[40,80],x:[500,700],t:[2,3]}
const question_text_Default = "รถยนต์คันหนึ่งวิ่งด้วยความเรื่องคงที่ u เมตรต่อวินาที ขณะที่อยู่ห่างสิ่งกีดขวางเป็นระยะทาง x เมตร คนขับตัดสินใจห้ามล้อรถโดยเสียเวลา t วินาที ก่อนที่ห้ามล้อจะทำงาน เมื่อห้ามล้อทำงานแล้ว รถจะต้องลดความเร็วในอัตราเท่าใด จึงทำให้รถหยุดพอดีเมื่อสิ่งขีดขวางนั้น "
let a = 0;
//--//
let variables = [];
let randomValues = {};
let result;

function generateRandomValues() {
    // Extract variables (letters) from the equation
    const variableNames = equation.match(/[a-zA-Z_]\w*/g) || [];
    variables = Array.from(new Set(variableNames)); // Unique variable names
    randomValues = {}; // Reset previous random values

    // Generate random values for each variable
    variables.forEach((variable) => {
        const range = limitRandom[variable];
        const randomValue = Math.floor(Math.random() * (range[1] - range[0] + 1)) + range[0];
        randomValues[variable] = randomValue;
    });
}

function calculateAnswer() {
    a++;
    let evalEquation = equation;

    // Replace variables with their random values
    for (const [key, value] of Object.entries(randomValues)) {
        evalEquation = evalEquation.replace(new RegExp(`\\b${key}\\b`, 'g'), value);
    }

    try {
        // Evaluate the modified equation
        result = eval(evalEquation);

        // Check if the result is an integer
        if (!Number.isInteger(result)) {
            // If the result is not an integer, adjust random values
            generateRandomValues();
            calculateAnswer();
        }
    } catch (error) {
        console.log("There was an error evaluating the equation.");
        return;
    }
}

function calculateAnswerNotInt() {

    let evalEquation = equation;

    // Replace variables with their random values
    for (const [key, value] of Object.entries(randomValues)) {
        evalEquation = evalEquation.replace(new RegExp(`\\b${key}\\b`, 'g'), value);
    }

    try {
        // Evaluate the modified equation
        result = eval(evalEquation);
    } catch (error) {
        console.log("There was an error evaluating the equation.");
        return;
    }
}

export function GenRandomQ4(){

    generateRandomValues();
    calculateAnswer();
    // calculateAnswerNotInt()
    let question_text = question_text_Default.split(" ")

    let Ans = [];
    let textAns ;

    const namelist = ["ชิ","วิน","สายฟ้า","โฟ","ต้นตาล","ภีม","แซค"]

    // QuestionCode

    let Name = namelist[getRandomInt((namelist.length)-1)]

    variables.forEach((variable) => {
        for (let i = 0; i < question_text.length; i++) {
            if (question_text[i] == "name"){
                question_text[i] = ""
                question_text[i+1] = Name+question_text[i+1]
            }
            else if (question_text[i] == variable){
                question_text[i] = randomValues[variable]
            }
        }
    });

    // RandomAnsCode

    let choice = [result];
    let choiceAmount = 4;
    while (choice.length < choiceAmount) {
        // Generate a random number to add or subtract from the correct answer
        let randomOffset = getRandomIntMN(5, 15); // Random number between 1 and 5
        let WrongChoice = choice[getRandomIntMN(0, choice.length - 1)] + (randomOffset * ((-1) ** getRandomIntMN(0, 1)));
        
        while (WrongChoice <= 0) {
            randomOffset = getRandomIntMN(5, 15); // Regenerate random offset if necessary
            WrongChoice = choice[getRandomIntMN(0, choice.length - 1)] + (randomOffset * ((-1) ** getRandomIntMN(0, 1)));
        }
    
        if (AnsNotIn(choice, WrongChoice)) {
            choice = [...choice, WrongChoice];
        }
    }

    // PrintCode

    let questionPrint = question_text.join(" ")

    choice.sort()
    
    for (let j = 0; j < choice.length; j++) {

        textAns = ([j+1,choice[j]].join(") "))

        if (choice[j] == result){
            Ans = [...Ans,{ text: textAns, correct: true}]
        }
        else {
            Ans = [...Ans,{ text: textAns, correct: false}]
        }
    }

    let box = {
        question: questionPrint,
        answers: Ans,
        template: "Q4",
    };
    console.log(a , "attempt") // check
    // console.log(box) // check
    a = 0;
    return box ;
}

// const questionData = GenRandom();

// document.getElementById('Question').innerText = `${1}) ${questionData.question}`;
// document.getElementById('Ans1').innerText = questionData.answers[0].text;
// document.getElementById('Ans2').innerText = questionData.answers[1].text;
// document.getElementById('Ans3').innerText = questionData.answers[2].text;
// document.getElementById('Ans4').innerText = questionData.answers[3].text;