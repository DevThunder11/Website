export function explanation(template , question_text){
    let explanation_text;
    let extract = question_text.split(" ");
    if (template == "Q1") {
        let f = extract[1];
        let x = extract[4];
        let ans = Number(f*x).toFixed(2);
        explanation_text = `เฉลย สูตรของงานได้แก่ W = f×scosθ  เนื่องจากทิศที่แรงกระทำ จะมีทิศเดียวกับระยะที่เคลื่อนที่ไปได้ จะได้ว่า W = ${f}×${x} = ${ans} J `
    }
    else if (template == "Q2") {

        explanation_text = `เนื่องจากแรงที่เกิดขึ้น คือการยกซึ่งจะมีทิศขึ้น และทิศของระยะทางคือไปข้างหน้า จะทำให้ cosθ จะตั้งฉากกัน cosθ = 0 จะได้ W = 0 J`
    }
    else if (template == "Q3") {
        let m = extract[1];
        let s = extract[7];

        explanation_text = `เฉลย จากสูตร W = F × s cosθ จะได้ cosθ = 1/2 คือมุมที่ทำระหว่างแรงกับระยะการเคลื่อนที่  จะได้ว่า W = ${m}×${s}×1/2 = ${m*s*1/2} J `
    }
    else if (template == "Q4") {
        let m = extract[1];
        let mu = extract[5];
        let a = extract[6];
        let s = extract[10];
        let ans = Number((m*a + mu*m*10)*s).toFixed(2);
        explanation_text = `จากกฎข้อที่สองของนิวตัน ΣF = ma
        แรงที่กระทำในระบบมี 2 แรง คือ
        1. แรงเสียดทาน f = μN = μmg
        2. แรงที่ออกแรงดึง F
        
        จะได้ว่า F - μmg = ma จะได้
        F = ma + μmg
        
         งานที่เกิดขึ้น W = F × s จะได้ว่า
        W = (ma + μmg) × s แล้วก็แทนค่าเข้าไป W = (${m}×${a} + ${mu}×${m}×10)×${s} = ${ans} `
    }
    else if (template == "Q5") {
        let m = extract[1];
        let s = extract[10];

        explanation_text = `จากสูตรงาน เมื่อพิจารณาเฉพาะแรงเสียดทาน จะได้ว่า W = μNs cos(180) = -μmgs (จะสังเกตว่า ทิศทางของแรงเสียดทานจะทิศตรงข้ามการเคลื่อนที่ จะทำให้ได้ cos(180)) แทนค่า
        W = -0.4×${m}×10×${s} = -${4*m*s} J `
    }
    else if (template == "Q6") {
        let v = extract[6];
        let p = extract[9];
        explanation_text = `เฉลย จากสูตร กำลัง p = W/t = Fv โดยจะให้หาF ซึ่งจะได้ F = p/v = ${p}/${v} = ${p/v} N  `

    }
    else if (template == "Q7") {  
        let v = extract[1];
        let f = extract[8];
        explanation_text = `เฉลย จากสูตร กำลัง p = W/t = Fv = μNv จากนั้นแทนค่าเข้าไปหาp = ${f}×0.1×${v} = ${0.1*f*v} N   `
    }
    else if (template == "Q8") {
        let v = extract[1];
        let h = extract[7];
        let ans = [v**2 + 2*10*h]**0.5
        explanation_text = `จากกฏอนุรักษ์พลังงาน พิจารณาจากจุดแรกและสุดท้าย ½mv₁² + mgh = ½mv² และ แก้หา v ได้เท่ากับ ${ans} m/s`
    }
    else if (template == "Q9") {
        let m = extract[1];
        let v = extract[4];
        let ans = [v**2*m/400]**0.5
        explanation_text = `เฉลย จากกฏอนุรักษ์พลังงาน ½mv² = ½kx² จะได้ x เท่ากับ = ${ans} m ` 
    }
    else if (template == "Q10") {
        let m = extract[1];
        let x = extract[8];
        let x1 = x/100;
        let ans = Number((2*m*10*0.1)/(x1**2)).toFixed(2);
        explanation_text = `จากกฏอนุรักษ์พลังงาน พิจารณาจากจุดที่ถูกกดด้วยสปริงเป็นจุดอ้างอิง และจุดสุดท้ายคือจุดที่สูงสุด จะได้เท่ากับ ½kx² = mgh จะได้ว่า ½k×${x1}² = ${m}×10×0.1 จะได้ k = ${ans} N/m `
    }
    else if (template == "Q11") {
        explanation_text = `Q11`
    }
    else if (template == "Q12") {
        explanation_text = `Q12`
    }
    else if (template == "Q13") {
        explanation_text = `Q13`
    }
    else if (template == "Q14") {
        explanation_text = `Q14`
    }
    else if (template == "Q15") {
        explanation_text = 'Q15'


    }
    else if (template == "Q16") {
        explanation_text = `Q16`
    }
    else if (template == "Q17") {
        explanation_text = `Q17`
    }
    else if (template == "Q18") {
        explanation_text = `Q18` 
        
    }

    else if (template == "Q19") {
        explanation_text = `Q19`
    }
  
    else if (template == "Q20") {
        explanation_text = `Q20`
    }
    
    console.log(extract);
    return explanation_text;
}