import { AnsNotIn,getRandomInt,getRandomIntMN,ArrayEqual,ArrayNotIn } from "/QuiZGenQ/QData/GobalFunction.js";

export function GenRandomQ7(){

    let Ans = [];
    let TF = [false,false,false,false]

    const namelist = ["ชิ","วิน","สายฟ้า","โฟ","ต้นตาล","ภีม"]
    const question_text = "ยิงกระสุนขึ้นฟ้า 3 ลูกติดต่อกัน ด้วยอัตราเร็วต้น u เมตรต่อวินาทีเท่ากัน และเว้นช่วงเวลาระหว่างลูกที่ถัดกัน t วินาที กระสุนที่ 2 และ 3 จะสวนกันที่ระยะสูงจากฐานยิงกี่เมตร".split(" ")

    // QuestionCode

    let Name = namelist[getRandomInt((namelist.length)-1)]
    let u = (getRandomIntMN(20, 100))
    let t = (getRandomIntMN(1, 5))

    let maxAttempts = 50;
    let attempts = 0;
    while (!Number.isInteger(((u**2)/20)-((5/4)*(t**2)))) {
        u = (getRandomIntMN(20, 100));
        t = (getRandomIntMN(1, 5));
        attempts++;
        if (attempts >= maxAttempts) {
            u = 20;
            t = 2;
            break;
        }
    }


    for (let i = 0; i < question_text.length; i++) {
        if (question_text[i] == "name"){
            question_text[i] = Name
        }
        else if (question_text[i] == "u"){
            question_text[i] = u
        }
        else if (question_text[i] == "t"){
            question_text[i] = t
        }
    }

    // Anscode

    let result = (((u**2)/20)-((5/4)*(t**2)))
    let choice = [result]

    // RandomAnsCode

    let choiceAmount = 4

    while (choice.length < choiceAmount) {
        let WrongChoice = choice[(getRandomIntMN(0,(choice.length)-1))]+(1*((-1)**(getRandomIntMN(0,1))))
        
        while (WrongChoice <= 0) {
            WrongChoice = choice[(getRandomIntMN(0,(choice.length)-1))]+(1*((-1)**(getRandomIntMN(0,1))))
        }

        if (AnsNotIn(choice,WrongChoice)) {
            choice = [...choice,WrongChoice]
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
        template: "Q7"
    };
    // console.log(box) // check
    console.log(attempts , "attempts")
    return box ;
}