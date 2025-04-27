import { AnsNotIn,getRandomInt,getRandomIntMN,ArrayEqual,ArrayNotIn } from "/QuiZGenQ/QData/GobalFunction.js";

export function GenRandomQ6(){

    let Ans = [];
    let TF = [false,false,false,false]

    const namelist = ["ชิ","วิน","สายฟ้า","โฟ","ต้นตาล","ภีม"]
    const question_text = "รถไฟขบวนหนึ่งมีน้ำหนัก 2 x 10⁵ กิโลกรัม เคลื่อนที่ด้วยความเร็วสม่ำเสมอ u เมตร/วินาที ถ้ารถไฟมีกำลัง p วัตต์ แรงต้านเฉลี่ยของรางรถไฟเป็นกี่นิวตัน".split(" ")

    // QuestionCode

    let Name = namelist[getRandomInt((namelist.length)-1)]

    let p = (getRandomIntMN(70, 100)) * 1000
    let u = (getRandomIntMN(20, 60))

    let attempts = 0;

    while (!Number.isInteger(p/u)) {
        p = (getRandomIntMN(70, 100)) * 1000;
        u = (getRandomIntMN(20, 60));
        attempts++;
    }

    console.log(attempts); // Log attempts


    for (let i = 0; i < question_text.length; i++) {
        if (question_text[i] == "name"){
            question_text[i] = Name
        }
        else if (question_text[i] == "p"){
            question_text[i] = p
        }
        else if (question_text[i] == "u"){
            question_text[i] = u
        }
    }

    // Anscode

    let result = p/u
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
        template: "Q6"
    };
    // console.log(box) // check

    return box ;
}