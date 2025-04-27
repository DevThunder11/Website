import { AnsNotIn,getRandomInt,getRandomIntMN,ArrayEqual,ArrayNotIn } from "/QuiZGenQ/QData/GobalFunction.js";

export function GenRandomQ3(){

    let Ans = [];
    let TF = [false,false,false,false]

    const namelist = ["ชิ","วิน","สายฟ้า","โฟ","ต้นตาล","ภีม"]
    const question_text = "เด็กคนหนึ่งออกแรง f นิวตัน ลากกล่องไม้ในแนวทำมุม 30 องศา ถ้าเขาลากกล่องไม้ไปได้ไกล s เมตร ด้วยอัตราเร็วคงที่ จงหางานที่เด็กคนนี้ทำ".split(" ")

    // QuestionCode

    let Name = namelist[getRandomInt((namelist.length)-1)]

    let f = (getRandomIntMN(1, 20))
    let s = (getRandomIntMN(1, 100))

    let attempts = 0;

    while (!Number.isInteger(f*s*(1/2))) {
        f = (getRandomIntMN(1, 20));
        s = (getRandomIntMN(1, 100));
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

    let result = f*s*(1/2)
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
        template: "Q3"
    };
    // console.log(box) // check

    return box ;
}