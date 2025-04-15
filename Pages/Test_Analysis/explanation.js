export function explanation(template , question_text){
    let explanation_text;
    let extract = question_text.split(" ");
    if (template == "Q0") {
        
        explanation_text = `เฉลย `

    }
    else if (template == "Q1") {
        let x = extract[3]
        let result = (x/5)**(1/2)
        explanation_text = `เฉลย จากโจทย์สามารถคำนวณจากสูตร s(แอปเปิ้ล -> พื้น) = ut + (1/2)at^2 
        แทนค่าจะได้ว่า ${x} = 0 + (1/2)(10)(t^2) จึงได้ค่า t = ${result} วินาที`
    }
    else if (template == "Q2") {
        let v = extract[3]
        let t = extract[6]
        let result = Number(v*t).toFixed(2)
        explanation_text = `เฉลย เนื่องจากรถไฟเคลื่อนที่ผ่านคนที่อยู่นิ่งๆ และมีความเร็วเท่ากับ ${v} เมตร/วินาที 
        แสดงว่าทุกๆ 1 วินาที รถไฟจะเคลื่อนที่ผ่านคนไป ${v} ในเวลา ${t} วินาที จะคำนวณได้โดยใช้สูตร s = vt จึงจะ
        ได้ s = ${v} * ${t} = ${result} เมตร`
    }
    else if (template == "Q3") {
        let x = extract[3]
        let t = extract[6]
        let result = Number((5*t)-(x/t)).toFixed(2)
        explanation_text = `เฉลย เนื่องจากเหรียญตกลงไปต่ำกว่าจุดที่โยน จึงแทนค่าได้ว่า s = -${x} เมตร 
        นำค่าที่ได้มาเข้าสูตร ดังนี้ ${x} = u(${t}) + (1/2)(-10)(${t}^2) เมตร จะได้ค่า u = ${result} เมตร/วินาที
        ; หมายเหตุ g = -10 เมตร/วินาที เพราะโยนเหรียญ (ขึ้น) สวนทางกับแรงโน้มถ่วง (ลง) จึงเลือกใช้ค่า g ที่ติดลบ 
        เพื่อให้ค่า u เป็นบวก`
    }
    else if (template == "Q5") {
        let x = extract[7]
        let s = extract[12]
        let a = extract[1]
        let b = extract[4]
        let result = Number(((x**2+s**2)**(1/2))/((Number(a)+Number(b))/60)).toFixed(2)
        explanation_text = `เฉลย จากโจทย์เครื่องบินบินจากเชียงรายไปเชียงใหม่ระยะทาง ${x} กิโลเมตร ใช้เวลา ${a} นาที 
        และบินจากเชียงใหม่ไปแม่ฮ่องสอนระยะทาง ${s} กิโลเมตร ใช้เวลา ${b} นาที ถ้าต้องการบินตรงจากเชียงรายไปแม่ฮ่องสอน 
        ระยะทางจะเท่ากับ √(${x}² + ${s}²) = ${Number((x**2+s**2)**(1/2)).toFixed(2)} กิโลเมตร และใช้เวลาเท่าเดิมคือ ${Number(a)+Number(b)} นาที หรือ ${((Number(a)+Number(b))/60).toFixed(2)} ชั่วโมง 
        ดังนั้นความเร็วที่ต้องใช้คือ ${result} กิโลเมตร/ชั่วโมง`
    }
    else if (template == "Q6") {
        let t = extract[5]
        let a = extract[2] 
        let v = a*t
        let s1 = (1/2)*a*(t**2)
        let s2 = v**2/20
        let result = (1/2)*a*(t**2)*(1+(a/10))
        explanation_text = `เฉลย เนื่องจากความเร็วเริ่มต้นคือ 0 เมตร/วินาที กำหนดให้ระยะทางทั้งหมด = S₁ + S₂
        โดยให้ S₁ = ระยะทางตอนเชื้อเพลิงยังไม่หมด และ S₂ = ระยะทางตอนเชื้อเพลิงหมดแล้ว จะได้ว่า
        S₁ = ut + (1/2)at² = 0 + (1/2)at² = ${s1} เมตร โดยมีความเร็วปลาย 
        v = u + at = ${v} เมตร/วินาที และลดลงเรื่อยๆเนื่องจากแรงโน้มถ่วง แทนค่าจากสูตร 
        v² =  v₀² + 2as ได้ว่า 0 = ${v}² + 2(-10)(S₂) ได้ว่า S₂ = ${s2} เมตร 
        S = S₁ + S₂ = ${s1} + ${s2} = ${result} เมตร`

    }
    else if (template == "Q7") {
        
        explanation_text = `เฉลย `

    }
    else if (template == "Q12") {
        let x = extract[5]
        let h = extract[1]
        let t = (h/5)**(1/2)
        let u = (x - 5*(t**2))/(t) 
        let result = Number((((5/h)*x*x)+(20*x))**(1/2)).toFixed(2)

        explanation_text = `เฉลย เมื่อก้อนหินทั้งสองตกถึงน้ำพร้อมกัน แสดงว่าใช้เวลาเท่ากัน 
        ก้อนหินจากสะพานตกระยะทาง ${h} เมตร ส่วนก้อนหินจากบอลลูนตกระยะทาง ${Number(h)+Number(x)} เมตร 
        จากสมการ s = ut + (1/2)gt² เมื่อ g = 10 m/s² แทนค่าได้ 20 = 0 + (1/2)(10)t² 
        จะได้ว่าเวลาที่ใช้คือ t = ${t} วินาที เมื่อก้อนหินจากบอลลูนผ่านระดับสะพาน จากสมการ s = ut + (1/2)gt²
        ได้ว่า ${x} = ${t}u + (1/2)(10)(${t}²) ได้ว่าความเร็วต้นของบอลลูนคือ ${u} เมตร/วินาที 
        มันจะมีความเร็วตามสมการ v² = u² + 2gh แทนค่า h = ${x} เมตร จะได้ v = ${result} เมตร/วินาที`
    }
    else if (template == "Q20") {
        let x = extract[6]
        let t = extract[9]
        let u = (x/t)-(5*t)
        let result = (u**2/20)
        explanation_text = `เฉลย กระถางใช้เวลาในการเคลื่อนที่ผ่านหน้าต่างสูง x เมตร ในเวลา t วินาที 
        จากสูตร s(ขอบบนหน้าต่าง -> ขอบล่างหน้าต่าง) = ut + (1/2)at^2 แทนค่าจะได้ว่า ${x} = (${t})u + (1/2)(-10)(${t}^2) 
        ได้ค่าความเร็วต้นคือ ${u} เมตร/วินาที เมื่อเทียบหาจุดที่กระถางเริ่มตกลงกับขอบบนหน้าต่าง สามารถหาได้โดยใช้สูตร
        v^2 = u^2 + 2as เนื่องจากวัตถุเริ่มตก u จึงเท่ากับ 0 และความเร็วปลาย (v) คือ ${u} และ a คือค่าแรงโน้มถ่วง 
        ซึ่งมีค่าประมาณ 10 เมตร/วินาที แทนค่าจะได้ว่า s = ${result} เมตร`
    }
    console.log(extract);
    return explanation_text;
}