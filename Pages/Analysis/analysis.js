// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-analytics.js";
import{getFirestore, getDoc, doc, updateDoc} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Loader functionality
document.addEventListener('DOMContentLoaded', function() {
  // Hide loader and show content after 2 seconds
  setTimeout(function() {
    document.getElementById('loader').style.display = 'none';
    document.body.style.visibility = 'visible';
  }, 1500);
});

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCNYmk4_98bZAF1dC6l2qLzNaN1jxQZSz8",
  authDomain: "login-form-41214.firebaseapp.com",
  projectId: "login-form-41214",
  storageBucket: "login-form-41214.firebasestorage.app",
  messagingSenderId: "41268181973",
  appId: "1:41268181973:web:acc852fa5e9bacd8665b5c",
  measurementId: "G-Y6D3M3TJGP"
};

var chartOptions = {
    chart: {
      height: 400,
      type: 'line',
      fontFamily: 'Helvetica, Arial, sans-serif',
      foreColor: '#6E729B',
      toolbar: {
        show: false,
      },
    },
    stroke: {
      curve: 'smooth',
      width: 2,
    },
    series: [
      {
        name: 'Linear',
        data: [],
      },
      {
        name: 'Energy',
        data: [],
      },
    ],
    title: {
      text: 'Media',
      align: 'left',
      offsetY: 25,
      offsetX: 5,
      style: {
        fontSize: '14px',
        fontWeight: 'bold',
        color: '#373d3f',
      },
    },
    markers: {
      size: 6,
      strokeWidth: 0,
      hover: {
        size: 9,
      },
    },
    grid: {
      show: true,
      padding: {
        bottom: 0,
      },
    },
    labels: ['1','2','3','4','5','6','7','8','9','10'],
    xaxis: {
      tooltip: {
        enabled: false,
      },
    },
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      offsetY: -10,
      labels: {
        colors: '#373d3f',
      },
    },
    yaxis: {
        max: 100, // Lock the Y-axis to 100
        labels: {
          formatter: function (value) {
            return value + '%'; // Display percentages
          },
        },
    },
    grid: {
      borderColor: '#D9DBF3',
      xaxis: {
        lines: {
          show: true,
        },
      },
    },
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const loggedInUserId = localStorage.getItem('loggedInUserId');
console.log("Logged-in User ID:", loggedInUserId); // Debug user ID

if (loggedInUserId) {
    const docRef = doc(db, "users", loggedInUserId);
    getDoc(docRef)
        .then((docSnap) => {
            if (docSnap.exists()) {
                const userData = docSnap.data();
                console.log("User Data from Firestore:", userData); // Debug Firestore data

                let length = userData.linear_1Data?.length || 0; // ✅ Prevent errors
                console.log("Length of linear_1Data:", length);

                function generateDivs() {
                    const container = document.getElementById("container");
                    if (!container) {
                        console.error("Container element not found in the HTML!");
                        return;
                    }

                    container.innerHTML = ""; // Clear previous divs

                    for (let i = 0; i < length; i++) {

                        let current_length = i + 1;
                        let outerDiv = document.createElement("div");
                        outerDiv.className = "outer-div";
                        let number = i;
                
                        let inner_Text = document.createElement("span");
                        inner_Text.className = "inner-text";
                        const thailandDate = userData.linear_1Data[number].Date;
                        inner_Text.innerText = `${current_length}. Linear Motion (${thailandDate})`;

                        let inner_button = document.createElement("button");
                        inner_button.className = "inner-button";
                        inner_button.id = `inner_button_${i}`
                
                        outerDiv.appendChild(inner_Text);
                        outerDiv.appendChild(inner_button);
                        container.appendChild(outerDiv);
                        ///Auth get scored and date//
                        let score = userData.linear_1Data[number].score;
                        let full_score = userData.linear_1Data[number].Question.length;
                        inner_button.innerText = `${score} / ${full_score}`;
                        
                        // graph
                        let percent = ((score/full_score)*100).toFixed(2)
                        console.log(percent)

                        chartOptions.series[0].data.push(parseFloat(percent));

                        // graph
                        console.log(chartOptions.series[0].data)
                        ///End///
                    }
                    //Average
                    function calculateAverage(dataArray) {
                      if (dataArray.length === 0) return 0; // Handle empty array case
                  
                      let sum = dataArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
                      let average = sum / dataArray.length;
                      return average;
                    }
                    let averagePercent = calculateAverage(chartOptions.series[0].data);
                    // console.log("Average Percent:", averagePercent);
                    
                    document.getElementById("average").innerText = `${averagePercent.toFixed(2)}%`;
                    if (averagePercent >= 80) {
                      document.getElementById("average").style.color = "#90D5FF";
                      document.getElementById("standard").innerText = "ผลการเรียนยอดเยี่ยม";
                      document.getElementById("analysis_text").innerText = "จากผลการทดสอบ ค่าเฉลี่ยของคุณอยู่ในช่วง 80-100% ซึ่งแสดงให้เห็นถึงความเป็นเลิศในการเข้าใจและประยุกต์ใช้เนื้อหาอย่างยอดเยี่ยม ขอแสดงความยินดีในความสำเร็จและความทุ่มเทที่คุณมีต่อการเรียนรู้ พร้อมทั้งขอให้คุณรักษามาตรฐานนี้ไว้และมองหาความท้าทายใหม่ ๆ เพื่อก้าวหน้าต่อไป";
                    } else if (averagePercent >= 60) {
                      document.getElementById("average").style.color = "#008000";
                      document.getElementById("standard").innerText = "ผลการเรียนที่ดี";
                      document.getElementById("analysis_text").innerText = "ผลการทดสอบที่ได้แสดงให้เห็นว่าค่าเฉลี่ยอยู่ในช่วง 60-80% ซึ่งบ่งบอกถึงความพยายามและความเข้าใจในเนื้อหาที่ดี คุณมีพื้นฐานที่มั่นคงและสามารถประยุกต์ใช้ความรู้ได้อย่างเหมาะสม ขอให้รักษามาตรฐานนี้ไว้และมองหาวิธีการพัฒนาเพิ่มเติมเพื่อเสริมสร้างความรู้ในระดับที่สูงขึ้น";
                    } else if (averagePercent >= 40) {
                      document.getElementById("average").style.color = "#FFFF00";
                      document.getElementById("standard").innerText = "ผลการเรียนระดับปานกลาง";
                      document.getElementById("analysis_text").innerText = "ค่าเฉลี่ยในช่วง 40-60%สะท้อนให้เห็นว่าคุณมีพื้นฐานความรู้ที่ค่อนข้างมั่นคง แต่ยังมีช่องว่างในการพัฒนาเพิ่มเติม ขอให้พยายามทบทวนเนื้อหาที่มีความซับซ้อนและปรับปรุงเทคนิคการเรียนรู้ เพื่อให้ผลการทดสอบในครั้งต่อไปมีแนวโน้มที่ดีขึ้น";
                    } else if (averagePercent >= 20) {
                      document.getElementById("average").style.color = "#FF5733";
                      document.getElementById("standard").innerText = "ยังต้องปรับปรุงและพัฒนาความรู้เพิ่มเติม";
                      document.getElementById("analysis_text").innerText = "ผลการทดสอบที่ได้แสดงให้เห็นว่าค่าเฉลี่ยอยู่ในช่วง 20-40% ซึ่งหมายความว่ายังมีพื้นที่ให้พัฒนาอย่างมากในด้านความเข้าใจเนื้อหา ขอให้คุณทบทวนและฝึกฝนในส่วนที่ยังไม่ชัดเจนอย่างต่อเนื่อง และไม่ลังเลที่จะขอคำแนะนำหรือความช่วยเหลือจากผู้เชี่ยวชาญเพื่อก้าวข้ามความท้าทายนี้";
                    } else {
                      document.getElementById("average").style.color = "#880808";
                      document.getElementById("standard").innerText = "ความเข้าใจพื้นฐานยังต้องพัฒนาอย่างมาก";
                      document.getElementById("analysis_text").innerText = "จากผลการทดสอบที่ได้ ค่าเฉลี่ยอยู่ในช่วง 0-20% ซึ่งบ่งชี้ว่ามีความท้าทายในการทำความเข้าใจเนื้อหาพื้นฐานในระดับที่ต้องได้รับการปรับปรุงอย่างเร่งด่วน ขอแนะนำให้ทบทวนและฝึกฝนเนื้อหาเบื้องต้นอย่างละเอียด พร้อมทั้งปรึกษาครูผู้สอนเพื่อกำหนดแนวทางพัฒนาที่เหมาะสม";
                    }
                    //Average
                    
                    // generate graph
                    var lineChart = new ApexCharts(document.querySelector('#line-chart'), chartOptions);
                    lineChart.render();
                    // generate graph

                    console.log(`✅ ${length} divs generated successfully!`);
                }
                generateDivs(); // ✅ Now it should run properly!
            } else {
                console.error("Document does not exist in Firestore!");
            }
        })
        .catch((error) => {
            console.error("Error fetching document:", error);
        });
} else {
    console.error("User ID not found in localStorage.");
}

const observer_button = new MutationObserver(() => {
    for (let i = 0; i < 10; i++) {
        let button = document.getElementById(`inner_button_${i}`);
        if (button && !button.dataset.listener) {  // Avoid duplicate listeners
            button.dataset.listener = "true";
            button.addEventListener("click", () => {
                console.log("Button clicked:", i);
                localStorage.setItem('selectedTestIndex', i);
                window.location.href = '../Test_Analysis/test_analysis.html';
            });
        }
    }
});
const observer_outer_div = new MutationObserver(() => {
    // Find all divs with the class 'outer-div'
    const outerDivs = document.querySelectorAll('.outer-div');
    outerDivs.forEach(outerDiv => {
        if (!outerDiv.classList.contains('styled')) {
            outerDiv.classList.add('styled'); // Add a class to mark it's already styled
            
            // Apply styles dynamically (You can change or extend these styles)
            outerDiv.style.backgroundColor = "#5295ad";
            outerDiv.style.display = "flex";
            outerDiv.style.borderRadius = "20px";
            outerDiv.style.margin = "25px";
            outerDiv.style.width = "80%";
            outerDiv.style.height = "12.5%";
            outerDiv.style.alignItems = "center";
            outerDiv.style.marginLeft = "10%";

             // Style the inner text
             const innerText = outerDiv.querySelector('.inner-text');
             innerText.style.color = "#f4f4f4";
             innerText.style.fontSize = "40px";
             innerText.style.fontFamily = '"Markazi Text", serif';
             innerText.style.fontWeight = "500";
             innerText.style.fontStyle = "normal";
             innerText.style.paddingLeft = "2%";

            // Find the inner button and style it
            const innerButton = outerDiv.querySelector('.inner-button');
            innerButton.style.backgroundColor = "#72b5d8";
            innerButton.style.color = "white";
            innerButton.style.width = "12%";
            innerButton.style.height = "60%";
            innerButton.style.marginLeft = "auto";
            innerButton.style.marginRight = "3%";
            innerButton.style.display = "flex";
            innerButton.style.justifyContent = "center";
            innerButton.style.alignItems = "center";
            innerButton.style.borderRadius = "8px";
            innerButton.style.fontSize = "1rem";
            innerButton.style.fontWeight = "bold";
            innerButton.style.transition = "0.3s ease";
            innerButton.style.marginBottom = "0.1%";

            innerButton.addEventListener('mouseover', () => {
                innerButton.style.backgroundColor = "#5295ad"; // Hover effect (color change when mouse over)
            });
            
            innerButton.addEventListener('mouseout', () => {
                innerButton.style.backgroundColor = "#72b5d8"; // Reset the color when mouse leaves
            });
        }
    });
});

// Start observing changes in the container
observer_button.observe(document.getElementById("container"), { childList: true, subtree: true });

// Start observing changes in the container
observer_outer_div.observe(document.getElementById("container"), { childList: true, subtree: true });

