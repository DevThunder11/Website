import { AnsNotIn,getRandomInt,getRandomIntMN,ArrayEqual,ArrayNotIn } from "/QuiZGenQ/QData/GobalFunction.js";

export function GenRandomQ5(){

    let Ans = [];
    let TF = [false,false,false,false]

    const namelist = ["ชิ","วิน","สายฟ้า","โฟ","ต้นตาล","ภีม"]
    const question_text = "จรวดลำหนึ่งทะยานขึ้นจากพื้นโลกในแนวดิ่งด้วยความเร่ง a เมตร/วินาที² เมื่อเวลาผ่านไป t วินาที จรวดลำนี้จะอยู่สูงจากพื้นโลกเท่าไหร่".split(" ")

    // QuestionCode

    let Name = namelist[getRandomInt((namelist.length)-1)]
    let attempts = 0;

    let a = (getRandomIntMN(5, 30)) * 2
    let t = (getRandomIntMN(20, 60))


    while (!Number.isInteger((1/2)*a*(t**2))) {
        a = (getRandomIntMN(5, 30)) * 2
        t = (getRandomIntMN(20, 60))
        attempts++;
    }
    console.log(attempts)

    for (let i = 0; i < question_text.length; i++) {
        if (question_text[i] == "name"){
            question_text[i] = Name
        }
        else if (question_text[i] == "a"){
            question_text[i] = a
        }
        else if (question_text[i] == "t"){
            question_text[i] = t
        }
    }
    // Anscode

    let result = (1/2)*a*(t**2)
    let choice = [result]

    // RandomAnsCode
    let choiceAmount = 4;
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
        template: "Q5"
    };
    // console.log(box) // check

    return box ;
}