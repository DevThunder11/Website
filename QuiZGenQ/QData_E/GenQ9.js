import { AnsNotIn,getRandomInt,getRandomIntMN,ArrayEqual,ArrayNotIn } from "/QuiZGenQ/QData/GobalFunction.js";

export function GenRandomQ9(){

    let Ans = [];
    let TF = [false,false,false,false]

    const namelist = ["ชิ","วิน","สายฟ้า","โฟ","ต้นตาล","ภีม"]
    const question_text = "กล่องมวล m กิโลกรัม เคลื่อนที่ด้วยความเร็ว v เมตร/วินาที บนผิวราบที่ปราศจากความฝืดไปชนกับปลายของสปริงที่เคลื่อนไปมาอย่างอิสระ ถ้าค่านิจของสปริงดังกล่าวเท่ากับ 400 นิวตัน/เมตร อยากทราบว่าสปริงจะถูกอัดตัวเป็นระยะทางกี่เมตร".split(" ")

    // QuestionCode

    let Name = namelist[getRandomInt((namelist.length)-1)]

    let m = (getRandomIntMN(1, 10)) ** 2;
    let v = (getRandomIntMN(10, 30));

    let attempts = 0;

    while (!Number.isInteger(v * ((m/400)**(1/2)))) {
        m = (getRandomIntMN(1, 10)) ** 2;
        v = (getRandomIntMN(10, 30));
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
        else if (question_text[i] == "v"){
            question_text[i] = v
        }
    }

    // Anscode

    let result = v * ((m/400)**(1/2))
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
        template: "Q9"
    };
    // console.log(box) // check

    return box ;
}