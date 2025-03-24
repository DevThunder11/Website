import { AnsNotIn,getRandomInt,getRandomIntMN,ArrayEqual,ArrayNotIn } from "/QuiZGenQ/QData/GobalFunction.js";

// input

let equation  = "v";
let limitRandom = {m:[1,25],v:[1,30],s:[1,20]}
const question_text_Default = "ปล่อยวัตถุ ก มวล m และวัตถุ ข มวล 2m ให้ตกลงมาตรง ๆ จากที่สูงแห่งหนึ่ง พร้อมกันที่ระยะ s เมตร ก่อนกระทบพื้นดิน วัตถุ ก มีความเร็ว v วัตถุ ข จะมี ความเร็วเท่าใด"

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
        const randomValue = Math.floor(Math.random() * limitRandom[variable][1]) + limitRandom[variable][0];  // Random value between 1 and 10
        randomValues[variable] = randomValue;
        // console.log(variable) //check
    });
}

function calculateAnswer() {
    console.log("Generating new number")
    // Continuously try until the result is an integer
    do {
        let evalEquation = equation;

        // Replace variables with their random values
        for (const [key, value] of Object.entries(randomValues)) {
            evalEquation = evalEquation.replace(new RegExp(`\\b${key}\\b`, 'g'), value);
        }

        try {
            // Evaluate the modified equation
            result = eval(evalEquation);

            // Check if the result is an integer
            if (Number.isInteger(result)) {
                break;  // If result is an integer, exit the loop
            } else {
                // If the result is not an integer, generate new random values
                generateRandomValues();
            }
        } catch (error) {
            console.log("There was an error evaluating the equation.");
            return;
        }
    } while (!Number.isInteger(result));  // Loop until an integer result is found

    // variables.forEach((variable) => {   
    //     console.log(randomValues[variable]) // check
    //     console.log(variable) // check
    // }); 
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

export function GenRandomQ15(){

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
        let randomOffset = getRandomIntMN(1, 150); // Random number between 1 and 5
        let WrongChoice = choice[getRandomIntMN(0, choice.length - 1)] + (randomOffset * ((-1) ** getRandomIntMN(0, 1)));
        
        while (WrongChoice <= 0) {
            randomOffset = getRandomIntMN(1, 150); // Regenerate random offset if necessary
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
        answers: Ans
    };

    // console.log(box) // check

    return box ;
}

// const questionData = GenRandom();

// document.getElementById('Question').innerText = `${1}) ${questionData.question}`;
// document.getElementById('Ans1').innerText = questionData.answers[0].text;
// document.getElementById('Ans2').innerText = questionData.answers[1].text;
// document.getElementById('Ans3').innerText = questionData.answers[2].text;
// document.getElementById('Ans4').innerText = questionData.answers[3].text;