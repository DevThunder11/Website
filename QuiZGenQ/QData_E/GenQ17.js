import { AnsNotIn,getRandomInt,getRandomIntMN,ArrayEqual,ArrayNotIn } from "/QuiZGenQ/QData/GobalFunction.js";

export function GenRandomQ17(){

    let Ans = [];
    let TF = [false,false,false,false]

    const namelist = ["ชิ","วิน","สายฟ้า","โฟ","ต้นตาล","ภีม"]
    const question_text = "เครื่องสูบน้ำ สูบน้ำมวล 3900 kg ขึ้นจากบ่อสูง 10 m ในเวลา t นาที แล้วฉีดน้ำออกไปด้วยอัตราเร็ว u m/s จงหากำลังของเครื่องสูบน้ำที่นี้ในหน่วยกิโลวัตต์".split(" ")

    // QuestionCode

    let Name = namelist[getRandomInt((namelist.length)-1)]

    let t = (getRandomIntMN(50, 70));
    let u = (getRandomIntMN(3, 70));

    let attempts = 0;

    while (!Number.isInteger(3900*(100+0.5*u*u)/(60*t))) {
        t = (getRandomIntMN(50, 70));
        u = (getRandomIntMN(3, 70));
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
        else if (question_text[i] == "u"){
            question_text[i] = u
        }
    }

    // Anscode

    let result = 3900*(100+0.5*u*u)/(60*t)
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
        template: "Q17"
    };
    // console.log(box) // check

    return box ;
}