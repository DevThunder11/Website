import { AnsNotIn,getRandomInt,getRandomIntMN,ArrayEqual,ArrayNotIn } from "/QuiZGenQ/QData/GobalFunction.js";

export function GenRandomQ1(){

    let Ans = [];
    let TF = [false,false,false,false]

    const namelist = ["ชิ","วิน","สายฟ้า","โฟ","ต้นตาล","ภีม"]
    const question_text = "เด็กคนหนึ่งออกแรงลากของจามแนวราบ f นิวตัน สม่ำเสมอเป็นระยะทาง s เมตร จะได้งานเท่าไหร่".split(" ")

    // QuestionCode

    let Name = namelist[getRandomInt((namelist.length)-1)]

    let f = (getRandomIntMN(5, 20))
    let s = (getRandomIntMN(5, 20))

    let attempts = 0;

    while (!Number.isInteger(f*s)) {
        t = (getRandomIntMN(5, 20));
        h = (getRandomIntMN(5, 20));
        attempts++;
    }

    console.log(attempts); // Log attempts


    for (let i = 0; i < question_text.length; i++) {
        if (question_text[i] == "name"){
            question_text[i] = Name
        }
        else if (question_text[i] == "f"){
            question_text[i] = f
        }
        else if (question_text[i] == "s"){
            question_text[i] = s
        }
    }

    // Anscode

    let result = f*s
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
        template: "Q1"
    };
    // console.log(box) // check

    return box ;
}