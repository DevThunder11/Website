import { AnsNotIn,getRandomInt,getRandomIntMN,ArrayEqual,ArrayNotIn } from "/QuiZGenQ/QData/GobalFunction.js";

export function GenRandomQ4(){

    let Ans = [];
    let TF = [false,false,false,false]

    const namelist = ["ชิ","วิน","สายฟ้า","โฟ","ต้นตาล","ภีม"]
    const question_text = "รถเข็นมวล m กิโลกรัม ถูกผลักให้ไถลบนพื้นฝืด สัมประสิทธิ์ของความเสียดทางจลน์เท่ากับ 0.4 ทำให้รถเข็นมีความเร่ง a เมตร/วินาที² จงหางานของแรงที่ผลักซึ่งทำให้รถเข็นไถลไป 50 เมตร".split(" ")

    // QuestionCode

    let Name = namelist[getRandomInt((namelist.length)-1)]

    let m = (getRandomIntMN(1, 20))
    let a = (getRandomIntMN(1, 10))

    let attempts = 0;

    while (!Number.isInteger(m*(a+4)*50)) {
        m = (getRandomIntMN(1, 20));
        a = (getRandomIntMN(1, 10));
        attempts++;
    }

    console.log(attempts); // Log attempts


    for (let i = 0; i < question_text.length; i++) {
        if (question_text[i] == "name"){
            question_text[i] = Name
        }
        else if (question_text[i] == "m"){
            question_text[i] = m
        }
        else if (question_text[i] == "a"){
            question_text[i] = a
        }
    }

    // Anscode

    let result = m*(a+4)*50
    let choice = [result]

    // RandomAnsCode

    let choiceAmount = 4

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