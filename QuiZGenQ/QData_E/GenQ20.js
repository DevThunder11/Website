import { AnsNotIn,getRandomInt,getRandomIntMN,ArrayEqual,ArrayNotIn } from "/QuiZGenQ/QData/GobalFunction.js";

export function GenRandomQ20(){

    let Ans = [];
    let TF = [false,false,false,false]

    const namelist = ["ชิ","วิน","สายฟ้า","โฟ","ต้นตาล","ภีม"]
    const question_text = "ปล่อยวัตถุก้อนหนึ่งที่ระดับความสูง h ข้อใดอธิบายถูกต้อง".split(" ") // Question text for Q19

    let result = "เมื่อเวลาผ่านไป พลังงานจลย์ของวัตถุเพิ่มขึ้น แต่พลังงานศักย์ของวัตถุลดลง"
    let WrongChoice = [
   "เมื่อเวลาผ่านไป พลังงานจลน์ของวัตถุลดลง แต่พลังงานศักย์ของวัตถุเพิ่มขึ้น",
   "เมื่อเวลาผ่านไป พลังงานจลน์ของวัตถุและพลังงานศักย์ของวัตถุเพิ่มขึ้นทั้งคู่",
   "เมื่อเวลาผ่านไป พลังงานจลน์ของวัตถุและพลังงานศักย์ของวัตถุลดลงทั้งคู่",
   "เมื่อเวลาผ่านไป พลังงานศักย์ของวัตถุคงที่ แต่พลังงานจลน์ของวัตถุเปลี่ยนแปลง",
   "เมื่อเวลาผ่านไป พลังงานจลน์ของวัตถุเพิ่มขึ้น แต่พลังงานศักย์ของวัตถุคงที่",
   "เมื่อเวลาผ่านไป พลังงานศักย์เพิ่มขึ้นเรื่อยๆ"
    ]
    
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
        template: "Q20"
    };
    // console.log(box) // check

    return box ;
}