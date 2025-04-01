import { AnsNotIn,getRandomInt,getRandomIntMN,ArrayEqual,ArrayNotIn } from "/QuiZGenQ/QData/GobalFunction.js";

export function GenRandomQ18(){

    let Ans = [];
    let TF = [false,false,false,false]

    const namelist = ["ชิ","วิน","สายฟ้า","โฟ","ต้นตาล","ภีม"]
    const question_text = "วัตถุก้อนหนึ่งถูกปล่อยให้ตกลงมาในแนวดิ่งอีกก้อนตกลงมาด้วยความเร็วต้น u m/s จงหาว่าอีกนานเท่าไรวัตถุทั้งสองจึงจะอยู่ห่างกัน 18 เมตร (กำหนดค่าแรงโน้มถ่วง เท่ากับ 10 เมตร/วินาทีกำลังสอง)".split(" ")

    // QuestionCode

    let Name = namelist[getRandomInt((namelist.length)-1)]
    let u = (getRandomIntMN(5, 30))

    while (!Number.isInteger(((18**2)*10) / (2*(u^2)))) {
        u = (getRandomIntMN(5, 30));
    }


    for (let i = 0; i < question_text.length; i++) {
        if (question_text[i] == "name"){
            question_text[i] = Name
        }
        else if (question_text[i] == "u"){
            question_text[i] = u
        }
    }

    // Anscode

    let result = ((18**2)*10) / (2*(u^2))
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
        template: "Q19"
    };
    // console.log(box) // check

    return box ;
}