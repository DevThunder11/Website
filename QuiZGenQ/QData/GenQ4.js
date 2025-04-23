import { AnsNotIn,getRandomInt,getRandomIntMN,ArrayEqual,ArrayNotIn } from "/QuiZGenQ/QData/GobalFunction.js";

export function GenRandomQ4(){

    let Ans = [];
    let TF = [false,false,false,false]

    const namelist = ["ชิ","วิน","สายฟ้า","โฟ","ต้นตาล","ภีม"]
    const question_text = "รถยนต์คันหนึ่งวิ่งด้วยความเรื่องคงที่ u เมตรต่อวินาที ขณะที่อยู่ห่างสิ่งกีดขวางเป็นระยะทาง x เมตร คนขับตัดสินใจห้ามล้อรถโดยเสียเวลา t วินาที ก่อนที่ห้ามล้อจะทำงาน เมื่อห้ามล้อทำงานแล้ว รถจะต้องลดความเร็วในอัตราเท่าใด จึงทำให้รถหยุดพอดีเมื่อสิ่งขีดขวางนั้น".split(" ")

    // QuestionCode

    let Name = namelist[getRandomInt((namelist.length)-1)]
    let u = (getRandomIntMN(50, 70))
    let x = (getRandomIntMN(550, 650))
    let t = 2;

    let attemptCounter = 0;

    while (!Number.isInteger(((-1)*(u**2))/(2*(x-u*t)))) {
        u = (getRandomIntMN(50, 70))
        x = (getRandomIntMN(550, 650))
        attemptCounter++;
    }
    console.log(attemptCounter)


    for (let i = 0; i < question_text.length; i++) {
        if (question_text[i] == "name"){
            question_text[i] = Name
        }
        else if (question_text[i] == "u"){
            question_text[i] = u
        }
        else if (question_text[i] == "x"){
            question_text[i] = x
        }
        else if (question_text[i] == "t"){
            question_text[i] = t
        }
    }

    // Anscode

    let result = ((-1)*(u**2))/(2*(x-u*t))
    let choice = [result]

    // RandomAnsCode

    let choiceAmount = 4

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

        let textAns = ([j+1,choice[j]].join(") "))

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
        template: "Q4"
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