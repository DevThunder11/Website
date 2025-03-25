import { AnsNotIn,getRandomInt,getRandomIntMN,ArrayEqual,ArrayNotIn } from "/QuiZGenQ/QData/GobalFunction.js";

export function GenRandomQ21(){

    let Ans = [];
    let TF = [false,false,false,false]

    const namelist = ["ชิ","วิน","สายฟ้า","โฟ","ต้นตาล","ภีม"]
    const question_text = "(En 43/2) ปล่อยก้อนหินลงไปในบ่อลึก x เมตร พบว่าอีก t วินาที ต่อมาได้ยินเสียงก้อน หินกระทบกันบ่อ อัตราเร็วของเสียงที่ให้จากข้อมูลนี้เป็นเท่าใด".split(" ")

    // QuestionCode

    let Name = namelist[getRandomInt((namelist.length)-1)]
    let x = (getRandomIntMN(1, 100))
    let h = (getRandomIntMN(1, 100))

    while (!Number.isInteger(x/(t-((2*x/10)**(1/2))))) {
        x = (getRandomIntMN(1, 100));
        h = (getRandomIntMN(1, 100));
    }


    for (let i = 0; i < question_text.length; i++) {
        if (question_text[i] == "name"){
            question_text[i] = Name
        }
        else if (question_text[i] == "x"){
            question_text[i] = x
        }
        else if (question_text[i] == "h"){
            question_text[i] = h
        }
    }

    // Anscode

    let result = (x/(t-((2*x/10)**(1/2))))
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
        answers: Ans
    };
    // console.log(box) // check

    return box ;
}