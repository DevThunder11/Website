import { AnsNotIn,getRandomInt,getRandomIntMN,ArrayEqual,ArrayNotIn } from "/QuiZGenQ/QData/GobalFunction.js";

export function GenRandomQ9(){

    let Ans = [];
    let TF = [false,false,false,false]

    const namelist = ["ชิ","วิน","สายฟ้า","โฟ","ต้นตาล","ภีม"]
    const question_text = " อนุภาคตัวหนึ่งกำลังเคลื่อนที่อยู่บนแกน x โดยมีสมการการเคลื่อนที่เป็น x(t)= = t-t² m เมื่อ x(t) คือ ตำแหน่งของอนภาคที่เวลา t ใดๆ จงหาว่าขนาดของความเร็วเฉลี่ยที่เวลา t1 วินาที ถึง t2 วินาที มีค่าเป็นเท่าใด".split(" ")

    // QuestionCode

    let Name = namelist[getRandomInt((namelist.length)-1)]
    let t1 = (getRandomIntMN(1, 100))
    let t2 = (getRandomIntMN(1, 100))

    while (!Number.isInteger(((t1-t1**2)-(t2-t2**2))/(t2-t1))) {
        t1 = (getRandomIntMN(5, 50));
        t2 = (getRandomIntMN(5, 50));
    }


    for (let i = 0; i < question_text.length; i++) {
        if (question_text[i] == "name"){
            question_text[i] = Name
        }
        else if (question_text[i] == "t1"){
            question_text[i] = t1
        }
        else if (question_text[i] == "t2"){
            question_text[i] = t2
        }
    }

    // Anscode

    let result = ((t1-t1**2)-(t2-t2**2))/(t2-t1)
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
        template: "Q9"
    };
    // console.log(box) // check

    return box ;
}