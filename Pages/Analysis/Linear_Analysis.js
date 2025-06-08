export function setLinearAnalysisResult(averagePercent_linear) {
  if (averagePercent_linear >= 80) {
    document.getElementById("average").style.color = "#90D5FF";
    document.getElementById("standard").innerText = "ผลการทดสอบยอดเยี่ยม";
    document.getElementById("analysis_text").innerText = "จากผลการทดสอบ ค่าเฉลี่ยของคุณอยู่ในช่วง 80-100% ซึ่งแสดงให้เห็นถึงความเป็นเลิศในการเข้าใจและประยุกต์ใช้เนื้อหาอย่างยอดเยี่ยม ขอแสดงความยินดีในความสำเร็จและความทุ่มเทที่คุณมีต่อการเรียนรู้ พร้อมทั้งขอให้คุณรักษามาตรฐานนี้ไว้และมองหาความท้าทายใหม่ ๆ เพื่อก้าวหน้าต่อไป";
  } else if (averagePercent_linear >= 60) {
    document.getElementById("average").style.color = "#008000";
    document.getElementById("standard").innerText = "ผลการทดสอบที่ดี";
    document.getElementById("analysis_text").innerText = "ผลการทดสอบที่ได้แสดงให้เห็นว่าค่าเฉลี่ยอยู่ในช่วง 60-80% ซึ่งบ่งบอกถึงความพยายามและความเข้าใจในเนื้อหาที่ดี คุณมีพื้นฐานที่มั่นคงและสามารถประยุกต์ใช้ความรู้ได้อย่างเหมาะสม ขอให้รักษามาตรฐานนี้ไว้และมองหาวิธีการพัฒนาเพิ่มเติมเพื่อเสริมสร้างความรู้ในระดับที่สูงขึ้น";
  } else if (averagePercent_linear >= 40) {
    document.getElementById("average").style.color = "#FFFF00";
    document.getElementById("standard").innerText = "ผลการทดสอบระดับปานกลาง";
    document.getElementById("analysis_text").innerText = "ค่าเฉลี่ยในช่วง 40-60%สะท้อนให้เห็นว่าคุณมีพื้นฐานความรู้ที่ค่อนข้างมั่นคง แต่ยังมีช่องว่างในการพัฒนาเพิ่มเติม ขอให้พยายามทบทวนเนื้อหาที่มีความซับซ้อนและปรับปรุงเทคนิคการเรียนรู้ เพื่อให้ผลการทดสอบในครั้งต่อไปมีแนวโน้มที่ดีขึ้น";
  } else if (averagePercent_linear >= 20) {
    document.getElementById("average").style.color = "#FF5733";
    document.getElementById("standard").innerText = "ยังต้องปรับปรุงและพัฒนาความรู้เพิ่มเติม";
    document.getElementById("analysis_text").innerText = "ผลการทดสอบที่ได้แสดงให้เห็นว่าค่าเฉลี่ยอยู่ในช่วง 20-40% ซึ่งหมายความว่ายังมีพื้นที่ให้พัฒนาอย่างมากในด้านความเข้าใจเนื้อหา ขอให้คุณทบทวนและฝึกฝนในส่วนที่ยังไม่ชัดเจนอย่างต่อเนื่อง และไม่ลังเลที่จะขอคำแนะนำหรือความช่วยเหลือจากผู้เชี่ยวชาญเพื่อก้าวข้ามความท้าทายนี้";
  } else {
    document.getElementById("average").style.color = "#880808";
    document.getElementById("standard").innerText = "ความเข้าใจพื้นฐานยังต้องพัฒนาเพิ่มเติม";
    document.getElementById("analysis_text").innerText = "จากผลการทดสอบที่ได้ ค่าเฉลี่ยอยู่ในช่วง 0-20% คุณยังไม่เข้าใจอย่างถี่ถ้วน ขอแนะนำให้ทบทวนและฝึกฝนเนื้อหาเบื้องต้นอย่างละเอียด และทำความเข้าใจบทเรียนเพื่อเป้าหมายการเรียนที่ดีขึ้น";
  }
}