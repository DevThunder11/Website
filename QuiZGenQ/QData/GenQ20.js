import { AnsNotIn,getRandomInt,getRandomIntMN,ArrayEqual,ArrayNotIn } from "/QuiZGenQ/QData/GobalFunction.js";

export function GenRandomQ20(){

    let Ans = [];
    let TF = [false,false,false,false]

    const namelist = ["ชิ","วิน","สายฟ้า","โฟ","ต้นตาล","ภีม"]
    const question_text = "ในขณะถ่ายทำภาพยนตร์ กล้องวีดีโอได้ถ่ายภาพการเคลื่อนที่ของกระถางที่ตกจาก ระเบียงของตึกสูงลงไป แล้วพบว่ากระถางใช้เวลาในการเคลื่อนที่ผ่านหน้าต่างสูง x เมตร ในเวลา t วินาที จงคำนวณว่าจุดที่กระถางเริ่มตกลงมามีความสูงจากขอบบนของหน้าต่างประมาณเท่าไร (ไม่คิดผลจากแรงต้านทานการเคลื่อนที่ของอากาศ และ กำหนดให้ g = 10 เมตรต่อวินาทีกำลังสอง)".split(" ")

    // QuestionCode

    let Name = namelist[getRandomInt((namelist.length)-1)]
    let x = (getRandomIntMN(1, 100))
    let t = (getRandomIntMN(1, 100))

    let attempts = 0;

    while (!Number.isInteger((((x/t)-(5*t))**2)/20)) {
        x = (getRandomIntMN(1, 100));
        t = (getRandomIntMN(1, 100));
        attempts++;
    }
    console.log(attempts);

    for (let i = 0; i < question_text.length; i++) {
        if (question_text[i] == "name"){
            question_text[i] = Name
        }
        else if (question_text[i] == "x"){
            question_text[i] = x
        }
        else if (question_text[i] == "t"){
            question_text[i] = t
        }
    }

    // Anscode

    let result = ((((x/t)-(5*t))**2)/20)
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
        template: "Q20"
    };
    // console.log(box) // check

    return box ;
}