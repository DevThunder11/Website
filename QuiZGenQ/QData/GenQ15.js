
import { AnsNotIn,getRandomInt,getRandomIntMN,ArrayEqual,ArrayNotIn } from "/QuiZGenQ/QData/GobalFunction.js";

export function GenRandomQ15(){

    let Ans = [];
    let TF = [false,false,false,false]

    const namelist = ["ชิ","วิน","สายฟ้า","โฟ","ต้นตาล","ภีม"]
    const question_text = "ปล่อยวัตถุ ก มวล a กิโลกรัม และวัตถุ ข มวล b กิโลกรัม ให้ตกลงมาตรงๆ พร้อมกันที่ระยะ s เมตร จากที่แห่งหนึ่งที่(อาจ)มีแรงโน้มถ่วงต่างจากโลก และไม่คำนึงถึงแรงต้านอากาศ ก่อนกระทบพื้นดิน วัตถุ ก มีความเร็ว v เมตรต่อวินาที วัตถุ ข จะมี ความเร็วกี่เมตรต่อวินาที".split(" ")

    // QuestionCode

    let Name = namelist[getRandomInt((namelist.length)-1)]
    let a = (getRandomIntMN(1, 5))
    let v = (getRandomIntMN(5, 20))
    let s = (getRandomIntMN(40, 100))
    let b = a*2

    // QuestionText
    for (let i = 0; i < question_text.length; i++) {
        if (question_text[i] == "name"){
            question_text[i] = Name
        }
        else if (question_text[i] == "a"){
            question_text[i] = a
        }
        else if (question_text[i] == "b"){
            question_text[i] = b
        }
        else if (question_text[i] == "v"){
            question_text[i] = v
        }
        else if (question_text[i] == "s"){
            question_text[i] = s
        }
    }

    // Anscode

    let result = v
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
        template: "Q15"
    };
    // console.log(box) // check

    return box ;
}
// const questionData = GenRandom();

// document.getElementById('Question').innerText = `${1}) ${questionData.question}`;
// document.getElementById('Ans1').innerText = questionData.answers[0].text;
// document.getElementById('Ans2').innerText = questionData.answers[1].text;
// document.getElementById('Ans3').innerText = questionData.answers[2].text;
// document.getElementById('Ans4').innerText = questionData.answers[3].text;