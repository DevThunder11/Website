import { AnsNotIn,getRandomInt,getRandomIntMN,ArrayEqual,ArrayNotIn } from "/QuiZGenQ/QData/GobalFunction.js";

export function GenRandomQ5(){

    let Ans = [];
    let TF = [false,false,false,false]

    const namelist = ["ชิ","วิน","สายฟ้า","โฟ","ต้นตาล","ภีม"]
    const question_text = "เครื่องบินลำหนึ่งบินจากสนามบินเชียงรายมาที่สนามบินเชียงใหม่ใช้เวลา a นาที แล้วบินจากสนามเชียงใหม่ไปสนามบินแม่ฮ่องสอนใช้เวลา b นาที ถ้าสนามบินเชียงรายอยู่ทางทิศตะวันออกเฉียงหนือของสนามบินเชียงใหม่เป็นระยะทางตรง x กิโลเมตร และ สนามบินแม่ฮ่องสอนอยู่ทางทิศตะวันตกเฉียงเหนือของสนามบิน เชียงใหม่เป็นระยะทางตรง s กิโลเมตร จงหาว่าถ้าเครื่องบินนี้ตรงจากสนามบินเชียงรายไปยังสนามบินแม่ฮ่องสอน โดยใช้เวลาบินเท่าเดิม จะต้องบินด้วยอัตราเร็วกี่กิโลเมตร/ชั่วโมง".split(" ")

    // QuestionCode

    let Name = namelist[getRandomInt((namelist.length)-1)]
    let attempts = 0;

    let x = (getRandomIntMN(220, 270))
    let s = (getRandomIntMN(130, 180))
    let a = (getRandomIntMN(30, 60))
    let b = (getRandomIntMN(20, 60))

    while (!Number.isInteger(((x**2+s**2)**(1/2))/((a+b)/60))) {
        x = (getRandomIntMN(220, 270))
        s = (getRandomIntMN(130, 180))
        a = (getRandomIntMN(30, 60))
        b = (getRandomIntMN(20, 60))
        attempts++;
    }
    console.log(attempts)

    for (let i = 0; i < question_text.length; i++) {
        if (question_text[i] == "name"){
            question_text[i] = Name
        }
        else if (question_text[i] == "x"){
            question_text[i] = x
        }
        else if (question_text[i] == "s"){
            question_text[i] = s
        }
        else if (question_text[i] == "a"){
            question_text[i] = a
        }
        else if (question_text[i] == "b"){
            question_text[i] = b
        }
    }

    // Anscode

    let result = ((x**2+s**2)**(1/2))/((a+b)/60)
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