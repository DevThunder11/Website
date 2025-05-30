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
        let j = extract[9];
        let m  = extract[21];
        let ans = Number((2*10*1-(j/m))**(1/2)).toFixed(2);
        explanation_text = `เฉลย จากกฏอนุรักษ์พลังงานจะได้ว่า mgh - w = 1/2mv² โดยพิจารณาจากจุดที่อยู่บนยอดสุดและให้จุดอ้างอิงอยู่จุดที่ต่ำที่สุด ซึ่ง h = R และ w คือพลังงานที่สูญเสียไปโดยแรงเสียดทานจลน์ เมื่อแก้สมการออกมาจะได้ v = ${ans} m/s `
    }
    else if (template == "Q12") {
        let u = extract[5];
        let v = extract[11];
        let h = extract[24];
        let ans = Number(10*((v**2)/2-(u**2)/2)-10*h).toFixed(2);
        explanation_text = `เฉลย จากกฏอนุรักษ์พลังงาน พิจารณาที่จุด A และจุด B จะได้ว่า ½mv₁² + mgh + W = ½mv² เมื่อทำการแก้สมการออกมา จะได้ W = -${ans} ซึ่งสังเกตว่า ติดลบเพราะจะสูญเสียพลังงานไปโดยแรงเสียดทานจลน์ แต่โจทย์ถามเพียงแค่ พลังงานจลน์ที่สูญเสียไปเท่ากับเท่าไหร่ จะต้องตอบว่า ${ans} J `
    }
    else if (template == "Q13") {
        let m = extract[1];
        let h = extract[6];
        explanation_text = `เฉลย จากกฏอนุรักษ์พลังงาน  ½mv₁² + mgh + W = ½mv² แต่เนื่องจากความเร็วตอนแรกกับตอนท้ายเท่ากัน จึงเหลือแค่ W = -mgh แต่เนื่องจากรู้ว่า งานจากแรงเสีดทานเป็นลบ จึงคิดแบบเป็นบวกได้เลย
        W = ${m}×10×${h} = ${m*10*h} J `
    }
    else if (template == "Q14") {
        let m = extract[1];
        let k = extract[4];
        let x = extract[10];
        let F = Number((1/20000)*k*x*x).toFixed(2);
        let a = Number(0.3*m*10*x/100).toFixed(2);
        explanation_text = `เฉลย จากโจทย์นั้ถามงานที่สปริงสุทธิทำ เนื่องจากว่า พลังงานที่เกิดขึ้นมีสองอย่างได้แก่ 1. งานที่ออกแรงดึง F 2. งานจากแรงเสียดทาน f  เมื่อพิจารณาแรง F ที่กระทำก่อนจะได้ WF = ½kx² = ${F} J
        และ หากพิจารณา แรง f ที่กระทำหลังจะได้ Wf = μmgx = 0.3×${m}×10×${x/100} = ${a} J เมื่อรวมกันจะได้ W = ${F} + ${a} = ${Number(F)+Number(a)} J `
    }
    else if (template == "Q15") {
        let u = extract[8];
        let x = extract[5];
        let ans = (1/2*(12/1000)*u*u)/(x/100)
         explanation_text = `เฉลย จากกฏอนุรักษ์พลังงาน จากจุดปล่อยไปยังในเนื้อไม้ จะได้ว่า ½mv² = fs และหาแรงเสียดทานได้เท่ากับ f = ${ans} `


    }
    else if (template == "Q16") {
        let m = extract[1];
        let h = extract[4];
        let ans = Number(10*m*((h/0.5)+1)).toFixed(2);
        explanation_text = `เฉลย จากกฏอนุรักษ์พลังงาน เมื่อพิจารณาจากจุดปล่อย และ จุดที่หยุดนิ้งแล้ว จากกฏอนุรักษ์พลังงาน จะไม่เกิดการสูญเสียพลังงานเกิดขึ้น จะได้ว่า mg(h+0.5) = F(0.5)
        เมื่อแก้ออกมาจะได้ F = ${ans} N  `
    }
    else if (template == "Q17") {
        let t = extract[8];
        let v = extract[11];
        let w = 3900*(100+0.5*v*v);
        let ans = Number(w/(60*t)).toFixed(2);



        explanation_text = `เฉลย จากสูตร กำลัง p = W/t  และ จากกฎอนุรักษ์พลังงาน W = mgh+½mv²  = ${w} จากนั้นนำไปใส่ในสมการกำลัง จะได้ p = ${w}/(60×${t}) = ${ans} watt`
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