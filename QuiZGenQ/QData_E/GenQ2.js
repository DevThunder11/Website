import { AnsNotIn,getRandomInt,getRandomIntMN,ArrayEqual,ArrayNotIn } from "/QuiZGenQ/QData/GobalFunction.js";

export function GenRandomQ2() {

    let Ans = [];
    let TF = [false,false,false,false]

    const namelist = ["ชิ","วิน","สายฟ้า","โฟ","ต้นตาล","ภีม"]
    const question_text = "แบกของหนัก m กิโลกรัม แล้วเดินไปข้างหน้าได้ระยะทาง s เมตร จะทำงานได้เท่าไหร่".split(" ")

    // QuestionCode

    let Name = namelist[getRandomInt((namelist.length)-1)]

    let m = (getRandomIntMN(1, 10))
    let s = (getRandomIntMN(15, 30))

    let attempts = 0;

    console.log(attempts); // Log attempts


    for (let i = 0; i < question_text.length; i++) {
        if (question_text[i] == "name"){
            question_text[i] = Name
        }
        else if (question_text[i] == "m"){
            question_text[i] = m
        }
        else if (question_text[i] == "s"){
            question_text[i] = s
        }
    }

    // Anscode

    // Anscode
    let result = 0;
    let customChoice = 10 * m * s; // Calculate custom choice
    let choice = [result, customChoice]; // Include custom choice

    // RandomAnsCode
    let choiceAmount = 4;

    while (choice.length < choiceAmount) {
        // Generate a random number to add or subtract from the correct answer
        let randomOffset = getRandomIntMN(10, 30); // Random number between 1 and 5
        let WrongChoice = choice[getRandomIntMN(0, choice.length - 1)] + (randomOffset * ((-1) ** getRandomIntMN(0, 1)));
        
        while (WrongChoice <= 0) {
            randomOffset = getRandomIntMN(10, 30); // Regenerate random offset if necessary
            WrongChoice = choice[getRandomIntMN(0, choice.length - 1)] + (randomOffset * ((-1) ** getRandomIntMN(0, 1)));
        }
    
        if (AnsNotIn(choice, WrongChoice)) {
            choice = [...choice, WrongChoice];
        }
    }

    // PrintCode
    let questionPrint = question_text.join(" ");

    choice.sort();

    for (let j = 0; j < choice.length; j++) {
        let textAns = ([j + 1, choice[j]].join(") "));

        if (choice[j] == result) {
            Ans = [...Ans, { text: textAns, correct: true }];
        } else {
            Ans = [...Ans, { text: textAns, correct: false }];
        }
    }

    let box = {
        question: questionPrint,
        answers: Ans,
        template: "Q2"
    };
    // console.log(box) // check

    return box;
}