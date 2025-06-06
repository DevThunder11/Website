import { AnsNotIn,getRandomInt,getRandomIntMN,ArrayEqual,ArrayNotIn } from "/QuiZGenQ/QData/GobalFunction.js";

export function GenRandomQ12(){

    let Ans = [];
    let TF = [false,false,false,false]

    const namelist = ["ชิ","วิน","สายฟ้า","โฟ","ต้นตาล","ภีม"]
    const question_text = "กล่องมวล 50 กิโลกรัม เคลื่อนที่ตามรางโค้งดังรูป ถ้ากล่องมีอัตราเร็ว u เมตร/วินาที ณ ตำแหน่ง A และ v เมตร/วินาที ณ ตำแหน่ง B จงหางานของแรงเสียดทานที่มีทางให้กระทำต่อกล่องในช่วงการเคลื่อนที่จาก A ไปยัง B จะมีค่าเท่าใด กำหนดให้ความสูง h = a เมตร".split(" "); // Question text for Q12

    // QuestionCode

    let Name = namelist[getRandomInt((namelist.length)-1)]

    let a = (getRandomIntMN(1, 50))
    let u = (getRandomIntMN(1, 20))
    let v = (getRandomIntMN(1, 100))

    let attempts = 0;

    while (!Number.isInteger(10*((v**2)/2-(u**2)/2)-10*a)) {
        let a = (getRandomIntMN(1, 50))
        let u = (getRandomIntMN(1, 20))
        let v = (getRandomIntMN(1, 100))
        attempts++;
    }

    console.log(attempts); // Log attempts


    for (let i = 0; i < question_text.length; i++) {
        if (question_text[i] == "name"){
            question_text[i] = Name
        }
        else if (question_text[i] == "a"){
            question_text[i] = a
        }
        else if (question_text[i] == "u"){
            question_text[i] = u
        }
        else if (question_text[i] == "v"){
            question_text[i] = v
        }
    }

    // Anscode

    let result = 10*((v**2)/2-(u**2)/2-10*a)
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
        template: "Q12"
    };
    // console.log(box) // check

    return box ;
}