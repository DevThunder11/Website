export function explanation(template , question_text){
    let explanation_text;
    let extract = question_text.split(" ");
    if (template == "Q0") {
        let s1 = extract[3]
        let t1 = extract[6]
        let s2 = extract[9]
        let t2 = extract[12]
        let ans1 = (Number(s1)+Number(s2))/(Number(t1)+Number(t2))
        let ans2 = (Number(s1)-Number(s2))/(Number(t1)+Number(t2))
        explanation_text = `เฉลย อัตราเร็วเฉลี่ยหาได้โดยใช้สูตร อัตราเร็วเฉลี่ย = ระยะทาง / เวลา = (${s1}+${s2})/(${t1}+${t2}) = ${ans1} เมตร/วินาที
        ความเร็วเฉลี่ยหาได้โดยใช้สูตร ความเร็วเฉลี่ย = ระยะทาง / เวลา = (${s1}-${s2})/(${t1}+${t2}) = ${ans2} เมตร/วินาที`
    }
    else if (template == "Q1") {
        let x = extract[3]
        let result = (x/5)**(1/2)
        explanation_text = `เฉลย จากโจทย์สามารถคำนวณจากสูตร s(แอปเปิ้ล -> พื้น) = ut + (1/2)at² 
        แทนค่าจะได้ว่า ${x} = 0 + (1/2)(10)(t²) จึงได้ค่า t = ${result} วินาที`
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
        นำค่าที่ได้มาเข้าสูตร ดังนี้ ${x} = u(${t}) + (1/2)(-10)(${t}²) เมตร จะได้ค่า u = ${result} เมตร/วินาที
        ; หมายเหตุ g = -10 เมตร/วินาที เพราะโยนเหรียญ (ขึ้น) สวนทางกับแรงโน้มถ่วง (ลง) จึงเลือกใช้ค่า g ที่ติดลบ 
        เพื่อให้ค่า u เป็นบวก`
    }
    else if (template == "Q4") {
        let u = extract[1]
        let x = extract[4]
        let t = extract[7]
        let distance = Number(x) - Number(u)*Number(t)
        let ans = Number(u)*Number(u)/(2*Number(distance)).toFixed(2)
        
        explanation_text = `เฉลย จากโจทย์พบว่ารถเคลื่อนที่มาด้วยความเร็วคงที่ จากนั้นเมื่อถึงระยะ ${x} เมตร แล้วค่อยแตะเบรคเป็นเวลา ${t} วินาที
        จะทำให้รู้ว่า ระยะทางทั้งแต่แตะเบรคจนรถหยุด จะเท่ากับ ${x} - ${u}×${t} = ${distance} เมตร จากนั้นใช้สูตร v² =  v₀² + 2as
        โดยที่ v = ความเร็วปลายเท่ากับ 0 เมตร/วินาที v₀ = ความเร็วตอนเริ่ม และ s = ระยะทางทั้งแต่แตะเบรคจนรถหยุด  จะแก้ออกมาได้เท่ากับ a = - ${u}² / 2×${distance} = -${ans}  
        [สังเกตว่า ความเร่งติดลบ แสดงว่ารถเคลื่อนที่ด้วยความหน่วงซึ่งสอดคล้องกับโจทย์ โดยเราสามารถตัดช้อยความเร่งที่เป็นบวกได้ก่อนเริ่มคำนวณได้] `

    }
    else if (template == "Q5") {
        let x = extract[7]
        let s = extract[12]
        let a = extract[1]
        let b = extract[4]
        let result = Number(((x**2+s**2)**(1/2))/((Number(a)+Number(b))/60)).toFixed(2)
        explanation_text = `เฉลย จากโจทย์เครื่องบินบินจากเชียงรายไปเชียงใหม่ระยะทาง ${x} กิโลเมตร ใช้เวลา ${a} นาที 
        และบินจากเชียงใหม่ไปแม่ฮ่องสอนระยะทาง ${s} กิโลเมตร ใช้เวลา ${b} นาที ถ้าต้องการบินตรงจากเชียงรายไปแม่ฮ่องสอน 
        ระยะทางจะเท่ากับ √(${x}² + ${s}²) = ${Number((x**2+s**2)**(1/2)).toFixed(2)} กิโลเมตร และใช้เวลาเท่าเดิมคือ
         ${Number(a)+Number(b)} นาที หรือ ${((Number(a)+Number(b))/60).toFixed(2)} ชั่วโมง 
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
    else if (template == "Q8") {
        let h = extract[4]
        let t = extract[7]
        let ans = Number(t/(2*h)**(1/2)).toFixed(2)
        explanation_text = `เฉลย จากโจทย์จะได้ว่า เมื่อหยดปล่อยลงมา ความเร็วต้นจะเท่ากับ 0 เมตร/วินาที โดยจากสมการ s = ut + (1/2)gt² , s = ${h} × 10⁻² เมตร/วินาที และ t = ${t} วินาที
        ,u = 0 จะได้หาเวลาในการหยดหนึ่งครั้งได้ t = √(2×${h}/10) × 10⁻² วินาที และนำ เวลาที่หยดต่อหนึ่งครั้งไปหารกับ T เวลาทั้งหมด = ${t} วินาที แล้วนำ ${t}/√(2×${h}/10) × 10⁻² = ${ans} วินาที/ครั้ง`
    }
    else if (template == "Q9") {
        let t1 = extract[15]
        let t2 = extract[18]
        let ans =((t1-t1**2)-(t2-t2**2))/(t2-t1)
        
        explanation_text = `เฉลย ขนาดความเร็วเฉลี่ยเท่ากับ = x(t₁) + x(t₂) / (t₁ + t₂) = (t₁-t₁²)-(t₂-t₂²))/(t₂-t₁) จะได้เท่ากับ  ${ans} เมตร/วินาที  [ซึ่งคำว่าขนาดนั้นหมายความว่า ค่าของเราจะเป็นบวกเสมอเพราะเนื่องจากเป็นสเกลาร์] `
    }
    else if (template == "Q10") {
        let t1 = extract[15]
        let t2 = extract[18]

        explanation_text = `เฉลย `
    }
    else if (template == "Q12") {
        let x = extract[5]
        let h = extract[1]
        let t = Number((h/5)**(1/2)).toFixed(2)
        let u = Number((x - 5*(t**2))/(t)).toFixed(2) 
        let result = Number((((5/h)*x*x)+(20*x))**(1/2)).toFixed(2)

        explanation_text = `เฉลย เมื่อก้อนหินทั้งสองตกถึงน้ำพร้อมกัน แสดงว่าใช้เวลาเท่ากัน 
        ก้อนหินจากสะพานตกระยะทาง ${h} เมตร ส่วนก้อนหินจากบอลลูนตกระยะทาง ${Number(h)+Number(x)} เมตร 
        จากสมการ s = ut + (1/2)gt² เมื่อ g = 10 m/s² แทนค่าได้ 20 = 0 + (1/2)(10)t² 
        จะได้ว่าเวลาที่ใช้คือ t = ${t} วินาที เมื่อก้อนหินจากบอลลูนผ่านระดับสะพาน จากสมการ s = ut + (1/2)gt²
        ได้ว่า ${x} = ${t}u + (1/2)(10)(${t}²) ได้ว่าความเร็วต้นของบอลลูนคือ ${u} เมตร/วินาที 
        มันจะมีความเร็วตามสมการ v² = u² + 2gh แทนค่า h = ${x} เมตร จะได้ v = ${result} เมตร/วินาที`
    }
    else if (template == "Q13") {
        let x = extract[1]
        let t = extract[4]
        let v = Number((20*x)**(1/2)).toFixed(1)
        let u = Number((v-10*t)).toFixed(1)
        let h = Number(((v**2)-(u**2))/20).toFixed(1)
        explanation_text = `เฉลย ความเร็วปลายขณะที่วัตถุถึงพื้นสามารถหาได้จากสูตร v² = u² + 2gh แทนค่าได้ v² = 0² + 2(10)(${x}) เมตร/วินาที ได้ความเร็วปลาย
        v = √(2(10)(${x})) = ${v} เมตร/วินาที คำนวณความเร็วตอนที่สัตถุผ่านยอดต้นมะม่วงได้จากสมการ v = u + at แทนค่าได้ว่า 
        ${v} = u + (10)(${t}) = ${u} เมตร/วินาที เมื่อเรารู้ความเร็วต้น และความเร็วปลายจากยอดต้นมะม่วงถึงพื้น สามารถนำไปเข้าสูตร v² = u² + 2gh จะได้ว่า
        ${v}² = ${u}² + 2(10)(h) ทำให้ได้ค่า h = ${h} เมตร`

    }
    else if (template == "Q15") {
        
        explanation_text = `เฉลย เนื่องจากว่า แรงที่ทำให้วัตถุหล่นลงมามีเพียงแค่ แรงโน้มถ่วงเท่านั้น ทำให้มวลที่แตกต่างกันจะไม่ส่งผลต่อการตกลงมา [หากไม่คำนึงถึงแรงต้านอากาศ]`

    }
    else if (template == "Q16") {
        let x = extract[3]
        let v = extract[7]
        let t = extract[12]
        let result = Number(2*x/v)-Number(t).toFixed(2)
        
        explanation_text = `เฉลย จากโจทย์เรารู็ว่า รถเคลื่อนที่ไปทั้งหมด 3 ช่วง ได้แก่ ช่วงเร่ง คงที่ และ หน่วง โดยจะแบ่งช่วงออกมา ด้วยเวลาตอน เร่งและหน่วงจะเท่ากับ t₁ (เพราะเนื่องจากกว่า ช่วงตรงกลาง
        เป็นความเร็วคงที่ จึงรู้ว่าเวลาที่ใช้ในการเร่งจะเท่ากับเวลาที่ใช้ในการหน่วง) และช่วงตรงกลางเวลาจะเท่ากับ t₂ ซึ่งจากโจทย์รู้ว่า ${t} จะเท่ากับ 2t₁+t₂ จะแก้หา t₁ = (${t}-t₂)/2 ----(1) 
        จากนั้น พิจารณาช่วงแรก(ช่วงรถเร่งขึ้น) โดยตั้งสมการ s = (v+u)t/2  และกำหนดระยะทางช่วงแรก = x จะได้ x = ${v}×t₁/2 ----(2) และ รู้ว่า t₂ = (ระยะทางทั้งหมด - สองระยะทางช่วงแรก)หารด้วยเวลาทั้งหมด = (${x}-2x)/${v} 
        จากนั้นแทน t₂ เข้าสมการที่ (2) และ (1) จะได้ t₂ = 2×${x}/${v} - ${t} = ${result}  `
    }
    else if (template == "Q17") {
        let u = extract[1]
        let ans = Number((18**2*10)/(2*u**2)).toFixed(2)
        
        explanation_text = `เฉลย จากโจทย์จะมีอยู่สองส่วนก็คือ ส่วนที่ลูกบอลปล่อยลงมาจากสะพานกับโยนลูกบอลลงมา และคำถาม ถามว่าจะปาลูกบอลลงมากี่เมตรถึงจะระยะห่างเท่ากับ 18 เมตร 
        เมื่อพิจารณาลูกที่ตกลงมาจากสะพาน จะได้ s = 0 + (1/2)gt² ---(1) ต่อมาพิจารณา ลูกบอลที่ปาลงมา ได้เท่ากับ s + 18 = ut + (1/2)gt² ----(2) แล้วนำสองสมการมาแก้กัน จะได้เท่ากับ 18 = ut 
        และเมื่อแทน t จากสมการที่หนึ่งจะได้เป็น 18 = u×√(2s/10) จะได้ s = 18²×10/(2×u²) = ${ans} เมตร`
    }
    else if (template == "Q18") {
        let u = extract[1]
        let ans = Number((18/u)).toFixed(2)
        
        explanation_text = `เฉลย จากโจทย์จะมีอยู่สองส่วนก็คือ ส่วนที่ลูกบอลปล่อยลงมาจากสะพานกับโยนลูกบอลลงมา และคำถาม ถามว่าจะปาลูกบอลลงมากี่เมตรถึงจะระยะห่างเท่ากับ 18 เมตร 
        เมื่อพิจารณาลูกที่ตกลงมาจากสะพาน จะได้ s = 0 + (1/2)gt² ---(1) ต่อมาพิจารณา ลูกบอลที่ปาลงมา ได้เท่ากับ s + 18 = ut + (1/2)gt² ----(2) แล้วนำสองสมการมาแก้กัน จะได้เท่ากับ 18 = ut
        จะได้เวลาเท่ากับ 18/u = ${ans} วินาที [ในโจทย์ข้างต้น สามารถมองด้วยความเร็วสัมพัทธ์ได้เหมื่อนกัน โดยหลักวิธีคิดของเฉลยเป็นการมองแบบความเร็วสัมพัทธ์ ]` 
        
    }

    else if (template == "Q19") {
        let x = extract[3]
        let t = extract[6]
        let u = (Number(x)/Number(t))-(5*Number(t))
        let result = (u**(2))/20
        let ans = (Number(result)+Number(x)).toFixed(2)
        explanation_text = `เฉลย กระถางใช้เวลาในการเคลื่อนที่ผ่านหน้าต่างสูง x เมตร ในเวลา t วินาที 
        จากสูตร s (ขอบบน -> ขอบล่าง) = ut + (1/2)at² แทนค่าจะได้ว่า ${x} = (${t})u + (1/2)(10)(${t}²) 
        ได้ค่าความเร็วต้น u คือ ${u} เมตร/วินาที  จากนั้นเทียบหาจุดที่กระถางเริ่มตกลงกับขอบบนหน้าต่าง สามารถหาได้โดยใช้สูตร
        v² = u² + 2as เนื่องจากวัตถุเริ่มตก u จึงเท่ากับ 0 และความเร็วที่ขอบบนหน้าต่าง (v) คือ ${u} และ a คือค่าแรงโน้มถ่วง 
        ซึ่งมีค่าประมาณ 10 เมตร/วินาที แทนค่าโดจะได้ว่า s = ${result} เมตร และโจทย์ถามว่าระยะจากบนตึกจะห่างจากขอบล่างหน้าต่างเท่าไหร่
         จะได้ว่า = s + ระยะหน้าต่าง ${x} เมตร = ${ans} เมตร  `
    }
  
    else if (template == "Q20") {
        let x = extract[4]
        let t = extract[7]
        let u = (x/t)-(5*t)
        let result = (u**2/20)
        explanation_text = `เฉลย กระถางใช้เวลาในการเคลื่อนที่ผ่านหน้าต่างสูง x เมตร ในเวลา t วินาที 
        จากสูตร s (ขอบบนหน้าต่าง -> ขอบล่างหน้าต่าง) = ut + (1/2)at² แทนค่าจะได้ว่า ${x} = (${t})u + (1/2)(10)(${t}²) 
        ได้ค่าความเร็วต้นคือ ${u} เมตร/วินาที จากนั้นเทียบหาจุดที่กระถางเริ่มตกลงกับขอบบนหน้าต่าง สามารถหาได้โดยใช้สูตร
        v² = u² + 2as เนื่องจากวัตถุเริ่มตก u จึงเท่ากับ 0 และความเร็วปลาย (v) คือ ${u} และ a คือค่าแรงโน้มถ่วง 
        ซึ่งมีค่าประมาณ 10 เมตร/วินาที แทนค่าจะได้ว่า s = ${result} เมตร`
    }
    else if (template == "Q21") {
        let x = extract[1]
        let t = extract[4]
        let t1 = ((2*x/10)**(1/2)).toFixed(2)
        let t2 = t - t1
        let v = x/t2
        
        explanation_text = `เฉลย จะแบ่งการคิดออกเป็นสองช่วง คือช่วงที่ลงไป แล้วก็ขึ้นมา  โดยพิจารณาช่วงแรก(ช่วงลงไป) จะคำนวณตาม s = ut + (1/2)gt₁² เนื่องจากเป็นปล่อยวัตถุจะมีความเร็วต้นเท่ากับ 0 m/s เมื่อแก้สมการจะทราบว่า เวลาที่ร่วงลงไปเท่ากับ t₁ = √(2×${x}/10) = ${t1}
        หลังจากได้เวลาช่วงแรก จากนั้นให้นำมาลบกับเวลาทั้งหมด จะได้ ${t} - ${t1} = ${t2} และรู้ว่า เสียงนั้นเคลื่อนที่ด้วยความเร็วคงที่ ดังนั้นสามารถใช้สูตร s = vt ได้เลย จะได้ v(เสียง) = ${x}/${t2} = ${v} m/s `

    }
    
    else if (template == "Q22") {
        let v1 = extract[6]
        let v2 = extract[11]
        let x = extract[14]
        let ans = 2*(x-25)/(Number(v1)+Number(v2)).toFixed(2)

        explanation_text = `เฉลย พิจารณารถไฟคันหนึ่ง จากสูตร s = (v+u)t/2 จะได้ x = ( ${v1} + 0 )t/2 ---(1) และพิจารณารถไฟอีกคัน จะพบว่า เวลาทั้งสองเท่ากัน และระยะทางจะห่างเท่ากับ
         ${x} - x -25 = x₂ และใช้สมการเดิม ได้เท่ากับ ${x} - x -25  = (${v2} + 0)t/2 ---(2) แล้วนำสมการ (1) และ (2) แก้หา t จะเท่ากับ 2×(${x}-25)/(${v1}+${v2}) = ${ans} วินาที `

    } 
    
    console.log(extract);
    return explanation_text;
}