<<<<<<< HEAD
import { AnsNotIn,getRandomInt,getRandomIntMN,ArrayEqual,ArrayNotIn } from "/QuiZGenQ/QData/GobalFunction.js";

export function GenRandomQ13(){

    let Ans = [];
    let TF = [false,false,false,false]

    const namelist = ["ชิ","วิน","สายฟ้า","โฟ","ต้นตาล","ภีม"]
    const question_text = "หินก้อนหนึ่งหลุดลงมาจากยอดตึกสูง h เมตร เมื่อก้อนหินผ่านยอดต้นมะม่วงแล้ว t วินาที ก็ตกถึงพื้นดิน จงหาความสูงของต้นมะม่วง (กำหนดให้ g = 10 เมตรต่อวินาทีกำลังสอง)".split(" ")

    // QuestionCode

    let Name = namelist[getRandomInt((namelist.length)-1)]
    let h = (getRandomIntMN(1, 100))
    let t = (getRandomIntMN(1, 100))

    while (!Number.isInteger(h-(5*(((2*h/10)**(1/2)-t)**2)))) {
        h = (getRandomIntMN(1, 100));
        t = (getRandomIntMN(1, 100));
    }


    for (let i = 0; i < question_text.length; i++) {
        if (question_text[i] == "name"){
            question_text[i] = Name
        }
        else if (question_text[i] == "h"){
            question_text[i] = h
        }
        else if (question_text[i] == "t"){
            question_text[i] = t
        }
    }

    // Anscode

    let result = (h-(5*(((2*h/10)**(1/2)-t)**2)))
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
        template: "Q13"
    };
    // console.log(box) // check

    return box ;
}
=======
import { AnsNotIn,getRandomInt,getRandomIntMN,ArrayEqual,ArrayNotIn } from "/QuiZGenQ/QData/GobalFunction.js";

// Set to track used h-t combinations
const usedCombinations = new Set();

export function GenRandomQ13(){

    let Ans = [];
    let TF = [false,false,false,false]

    const namelist = ["ชิ","วิน","สายฟ้า","โฟ","ต้นตาล","ภีม"]
    const question_text = "หินก้อนหนึ่งหลุดลงมาจากยอดตึกสูง h เมตร เมื่อก้อนหินผ่านขอดต้นมะม่วงแล้ว t วินาที ก็ตกถึงพื้นดิน จงหาความสูงของต้นมะม่วง".split(" ")

    // QuestionCode

    let Name = namelist[getRandomInt((namelist.length)-1)]
    // Define valid h values and their corresponding t ranges
    const hTMapping = {
        20: [1],
        45: [1, 2],
        80: [1, 2, 3],
        125: [1, 2, 3, 4],
        180: [1, 2, 3, 4, 5]
    };
    const hValues = Object.keys(hTMapping).map(Number);
    
    // Function to get total possible combinations
    const getTotalCombinations = () => {
        return Object.entries(hTMapping).reduce((total, [h, tValues]) => total + tValues.length, 0);
    };

    // Reset usedCombinations if all combinations have been used
    if (usedCombinations.size >= getTotalCombinations()) {
        usedCombinations.clear();
    }

    // Select unused h-t combination
    let h, t;
    do {
        h = hValues[getRandomInt(hValues.length - 1)];
        let validTValues = hTMapping[h];
        t = validTValues[getRandomInt(validTValues.length - 1)];
    } while (usedCombinations.has(`${h}-${t}`));

    // Add the new combination to used set
    usedCombinations.add(`${h}-${t}`);

    
    // Calculate result (this will always be an integer with our valid h-t pairs)
    let result = (t*((8*10*h)**(1/2)-10*t))/2;


    for (let i = 0; i < question_text.length; i++) {
        if (question_text[i] == "name"){
            question_text[i] = Name
        }
        else if (question_text[i] == "h"){
            question_text[i] = h
        }
        else if (question_text[i] == "t"){
            question_text[i] = t
        }
    }

    // Anscode

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
        template: "Q13"
    };
    // console.log(box) // check

    return box ;
}
>>>>>>> 1dac3d4d51fd3a554f037e3336e2f99a6664153b
