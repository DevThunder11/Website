export function explanation(template , question_text){
    let explanation_text;
    let extract = question_text.split(" ");
    if (template == "Q1") {
        let x = extract[3]
        let result = (x/5)**(1/2)
        explanation_text = `เฉลย จากโจทย์สามารถคำนวณจากสูตร s(แอปเปิ้ล -> พื้น) = ut + (1/2)at^2 
        แทนค่าจะได้ว่า ${x} = 0 + (1/2)(10)(t^2) จึงได้ค่า t = ${result} วินาที`
    }
    else if (template == "Q2") {
        let v = extract[3]
        let t = extract[6]
        let result = v*t
        explanation_text = `เฉลย เนื่องจากรถไฟเคลื่อนที่ผ่านคนที่อยู่นิ่งๆ และมีความเร็วเท่ากับ ${v} เมตร/วินาที 
        แสดงว่าทุกๆ 1 วินาที รถไฟจะเคลื่อนที่ผ่านคนไป ${v} ในเวลา ${t} วินาที จะคำนวณได้โดยใช้สูตร s = vt จึงจะ
        ได้ s = ${v} * ${t} = ${result} เมตร`
    }
    else if (template == "Q3") {
        let x = extract[3]
        let t = extract[6]
        let result = (5*t)-(x/t)
        explanation_text = `เฉลย เนื่องจากเหรียญตกลงไปต่ำกว่าจุดที่โยน จึงแทนค่าได้ว่า s = -${x} เมตร 
        นำค่าที่ได้มาเข้าสูตร ดังนี้ ${x} = u(${t}) + (1/2)(-10)(${t}^2) เมตร จะได้ค่า u = ${result} เมตร/วินาที
        ; หมายเหตุ g = -10 เมตร/วินาที เพราะโยนเหรียญ (ขึ้น) สวนทางกับแรงโน้มถ่วง (ลง) จึงเลือกใช้ค่า g ที่ติดลบ 
        เพื่อให้ค่า u เป็นบวก`
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