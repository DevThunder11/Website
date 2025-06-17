import { AnsNotIn,getRandomInt,getRandomIntMN,ArrayEqual,ArrayNotIn } from "/QuiZGenQ/QData/GobalFunction.js";

export function GenRandomQ14(){

    let Ans = [];
    let TF = [false,false,false,false]

    const namelist = ["ชิ","วิน","สายฟ้า","โฟ","ต้นตาล","ภีม"]
    const question_text = "วัตถุมวล m กิโลกรัม ผูกติดปลายสปริงที่มีค่าคงตัวสปริง k นิวตันต่อเมตร วางอยู่บนพื้นราบ ถ้าค่าสัมประสิทธิ์ความเสียดทานจลน์ระหว่างวัตถุกับพื้นเท่ากับ 0.3 แล้วจงคำนวณงานจากแรงจึงจัดออกไปจากตำแหน่งสมดุลเป็นระยะ x เซนติเมตร".split(" ")

    // QuestionCode

    let Name = namelist[getRandomInt((namelist.length)-1)]

    let m = (getRandomIntMN(1, 20));
    let x = (getRandomIntMN(50, 200));
    let k = (getRandomIntMN(500,1500));


    let attempts = 0;



    while (!Number.isInteger(((k*x/20000) + 3*m/100) * x)) {
        m = (getRandomIntMN(1, 20));
        x = (getRandomIntMN(50, 200));
        k = (getRandomIntMN(500,1500)) ;
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
        else if (question_text[i] == "x"){
            question_text[i] = x
        }
        else if (question_text[i] == "k"){
            question_text[i] = k
        }
    }

    // Anscode

    let result = (((k*x/20000) + 3*m/100) * x)
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
        template: "Q14"
    };
    // console.log(box) // check

    return box ;
}