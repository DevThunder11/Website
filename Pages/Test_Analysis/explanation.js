export function explanation(template , question_text){
    let explanation_text;
    if (template == "Q20") {
        let extract = question_text.split(" ")
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
    return explanation_text;
}