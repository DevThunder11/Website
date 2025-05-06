import { AnsNotIn,getRandomInt,getRandomIntMN,ArrayEqual,ArrayNotIn } from "/QuiZGenQ/QData/GobalFunction.js";

export function GenRandomQ11(){

    let Ans = [];
    let TF = [false,false,false,false]

    const namelist = ["ชิ","วิน","สายฟ้า","โฟ","ต้นตาล","ภีม"]
    const question_text = "จากรูป วัตถุเคลื่อนตามรางโค้ง รัศมี R ถ้าวัตถุหยุดนิ่งอยู่ที่ A และไถลลงมาถึงจุด B เกิดงานเนื่องจากความฝืดระหว่างพื้นกับวัตถุ 2.75 จูล จงหาความเร็วของวัตถุที่จุด B เป็นเมตรต่อวินาที กำหนด R = 1 เมตร และวัตถุมวล = m กิโลกรัม".split(" "); // Question text for Q11
    // QuestionCode

    let Name = namelist[getRandomInt((namelist.length)-1)]

    let t = (getRandomIntMN(1, 20))
    let h = (getRandomIntMN(1, 100))

    let attempts = 0;

    while (!Number.isInteger(10*t*((5/h)**(1/2)))) {
        t = (getRandomIntMN(1, 20));
        h = (getRandomIntMN(1, 100));
        attempts++;
    }

    console.log(attempts); // Log attempts


    for (let i = 0; i < question_text.length; i++) {
        if (question_text[i] == "name"){
            question_text[i] = Name
        }
        else if (question_text[i] == "t"){
            question_text[i] = t
        }
        else if (question_text[i] == "h"){
            question_text[i] = h
        }
    }

    // Anscode

    let result = 10*t*((5/h)**(1/2))
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
        template: "Q11"
    };
    // console.log(box) // check

    return box ;
}