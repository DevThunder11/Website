import { AnsNotIn,getRandomInt,getRandomIntMN,ArrayEqual,ArrayNotIn } from "/QuiZGenQ/QData/GobalFunction.js";

export function GenRandomQ13(){

    let Ans = [];
    let TF = [false,false,false,false]

    const namelist = ["ชิ","วิน","สายฟ้า","โฟ","ต้นตาล","ภีม"]
    const question_text = "วัตถุมวล m กิโลกรัม เคลื่อนที่ลงมาตามพื้นเอียงที่มีความฝืด ณ จุดที่สูงจากพื้น 4 เมตร วัตถุมีอัตราเร็ว u เมตร/วินาที เมื่อถึงจุดพื้นผิว ยังมีความเร็วเท่าเดิม จงหางานที่เนื่องจากความฝืดระหว่างเส้นสองจะมีค่าเป็นกี่จูล".split(" "); // Question text for Q13

    // QuestionCode

    let Name = namelist[getRandomInt((namelist.length)-1)]

    let m = (getRandomIntMN(1, 10)) * 2;
    let u = (getRandomIntMN(5, 20)) * 2

    let attempts = 0;

    while (!Number.isInteger(m*10*h)) {
        m = (getRandomIntMN(1, 10)) * 2;
        u = (getRandomIntMN(5, 20)) * 2
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
        else if (question_text[i] == "u"){
            question_text[i] = u
        }
    }

    // Anscode

    let result = m*10*h
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
        template: "Q13"
    };
    // console.log(box) // check

    return box ;
}