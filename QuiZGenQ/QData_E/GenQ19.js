import { AnsNotIn,getRandomInt,getRandomIntMN,ArrayEqual,ArrayNotIn } from "/QuiZGenQ/QData/GobalFunction.js";

export function GenRandomQ19(){

    let Ans = [];
    let TF = [false,false,false,false]

    const namelist = ["ชิ","วิน","สายฟ้า","โฟ","ต้นตาล","ภีม"]
    const question_text = "สปริงสองตัวมีค่าคงเป็น k₁ และ k₂ เชื่อมกันดังรูปออกแรง F ผลักให้จุดเชื่อมต่อของสปริงทั้งสองเลื่อนไปจากเดิมเป็นระยะ x ต้องทำงานเท่าไร"

    // Anscode

    let result = "(1/2)x²(k₁+k₂)"
    let WrongChoice = ["3x²","(1/2)x²(k₁+k₂)","(1/2)x²(k₁-k₂)","x²(k₁+k₂)","x²(k₁-k₂)","(1/2)x²(k₁-k₂)"]
    
    let choice = [result]

    // Shuffle function
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
    
    // RandomAnsCode
    while (choice.length < 4) {
        let randomIndex = getRandomIntMN(0, WrongChoice.length - 1);
        let selectedChoice = WrongChoice[randomIndex];
    
        if (selectedChoice !== result && AnsNotIn(choice, selectedChoice)) {
            choice.push(selectedChoice);
        }
    }
    
    // Shuffle the choices before sorting
    shuffle(choice);
    
    // PrintCode
    let questionPrint = question_text

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