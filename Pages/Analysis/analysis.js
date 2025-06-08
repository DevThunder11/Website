// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-analytics.js";
import{getFirestore, getDoc, doc, updateDoc} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js"
import { setLinearAnalysisResult } from "./Linear_Analysis.js";
import { setEnergyAnalysisResult } from "./Energy_Analysis.js";
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
// เพิ่มฟังก์ชันสำหรับตรวจสอบและอัพเดท Dark Mode
function updateDarkMode() {
  const isDarkMode = localStorage.getItem('darkMode') === 'true';
  document.body.classList.toggle('dark-mode', isDarkMode);
  console.log('Updated Dark Mode:', isDarkMode);
}

document.addEventListener('DOMContentLoaded', () => {
  // ตรวจสอบสถานะเริ่มต้น
  updateDarkMode();

  // ตรวจจับการเปลี่ยนแปลง
  window.addEventListener('storage', (e) => {
      if (e.key === 'darkMode') {
          updateDarkMode();
      }
  });
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
      text: 'Score',
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

                let length = userData.linear_1Data?.length || 0;
                let energy_length = userData.Energy_1Data?.length || 0;
                console.log("Length of linear_1Data:", length);

                function generateDivs() {
                    const linear_container = document.getElementById("linear_container");
                    const energy_container = document.getElementById("energy_container");
                    if (!linear_container) {
                        console.error("Container element not found in the HTML!");
                        return;
                    }
                    if (!energy_container) {
                        console.error("Container element not found in the HTML!");
                        return;
                    }

                    linear_container.innerHTML = ""; // Clear previous divs
                    energy_container.innerHTML = ""; // Clear previous divs

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
                        linear_container.appendChild(outerDiv);
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
                    for (let i = 0; i < energy_length; i++) {

                      let current_length = i + 1;
                      let outerDiv = document.createElement("div");
                      outerDiv.className = "outer-div";
                      let number = i;
              
                      let inner_Text = document.createElement("span");
                      inner_Text.className = "inner-text";
                      const thailandDate = userData.Energy_1Data[number].Date;
                      inner_Text.innerText = `${current_length}. Energy Conservation (${thailandDate})`;

                      let inner_button = document.createElement("button");
                      inner_button.className = "inner-button";
                      inner_button.id = `inner_button_2${i}`
              
                      outerDiv.appendChild(inner_Text);
                      outerDiv.appendChild(inner_button);
                      energy_container.appendChild(outerDiv);
                      ///Auth get scored and date//
                      let score = userData.Energy_1Data[number].score;
                      let full_score = userData.Energy_1Data[number].Question.length;
                      inner_button.innerText = `${score} / ${full_score}`;
                      
                      // graph
                      let percent = ((score/full_score)*100).toFixed(2)
                      console.log(percent)

                      chartOptions.series[1].data.push(parseFloat(percent));

                      // graph
                      console.log(chartOptions.series[1].data)
                      ///End///
                    }

                    //Average
                    function calculateAverage(dataArray) {
                      if (dataArray.length === 0) return 0; // Handle empty array case
                  
                      let sum = dataArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
                      let average = sum / dataArray.length;
                      return average;
                    }

                    //Average Linear
                    let averagePercent_linear = calculateAverage(chartOptions.series[0].data);
                    document.getElementById("average").innerText = `${averagePercent_linear.toFixed(2)}%`;
                    setLinearAnalysisResult(averagePercent_linear);
                    
                    //Average Energy
                    let averagePercent_energy = calculateAverage(chartOptions.series[1].data);
                    document.getElementById("average_energy").innerText = `${averagePercent_energy.toFixed(2)}%`;
                    setEnergyAnalysisResult(averagePercent_energy);
                    
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
                window.location.href = '../Test_Analysis_linear/test_analysis_linear.html';
            });
        }
    }
});

const observer_button_energy = new MutationObserver(() => {
  for (let i = 0; i < 10; i++) {
      let button = document.getElementById(`inner_button_2${i}`);
      if (button && !button.dataset.listener) {  // Avoid duplicate listeners
          button.dataset.listener = "true";
          button.addEventListener("click", () => {
              console.log("Button clicked:", i);
              localStorage.setItem('selectedTestIndex', i);
              window.location.href = '../Test_Analysis_energy/test_analysis_energy.html';
          });
      }
  }
});
const observer_outer_div = new MutationObserver(() => {
    const outerDivs = document.querySelectorAll('.outer-div');
    const isDarkMode = document.body.classList.contains('dark-mode');
    
    outerDivs.forEach(outerDiv => {
        if (!outerDiv.classList.contains('styled')) {
            outerDiv.classList.add('styled');
            
            // Base styles
            outerDiv.style.display = "flex";
            outerDiv.style.borderRadius = "20px";
            outerDiv.style.margin = "25px";
            outerDiv.style.width = "80%";
            outerDiv.style.height = "12.5%";
            outerDiv.style.alignItems = "center";
            outerDiv.style.marginLeft = "10%";
            
            // Apply dark/light mode specific colors
            outerDiv.style.backgroundColor = isDarkMode ? "#2d2d2d" : "#5295ad";
            
            // Style the inner text
            const innerText = outerDiv.querySelector('.inner-text');
            innerText.style.color = isDarkMode ? "#ffffff" : "#f4f4f4";
            innerText.style.fontSize = "40px";
            innerText.style.fontFamily = '"Markazi Text", serif';
            innerText.style.fontWeight = "500";
            innerText.style.fontStyle = "normal";
            innerText.style.paddingLeft = "2%";

            // Style the inner button
            const innerButton = outerDiv.querySelector('.inner-button');
            innerButton.style.backgroundColor = isDarkMode ? "#3d3d3d" : "#72b5d8";
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
            innerButton.style.outline = "none";
            innerButton.style.border = "none";
            innerButton.style.cursor = "pointer"; // Add this line to change the cursor to a pointer when hovering over the men

            innerButton.addEventListener('mouseover', () => {
                innerButton.style.backgroundColor = isDarkMode ? "#4d4d4d" : "#5295ad";
            });
            
            innerButton.addEventListener('mouseout', () => {
                innerButton.style.backgroundColor = isDarkMode ? "#3d3d3d" : "#72b5d8";
            });
        }
    });
});

// Start observing changes in the container
observer_button.observe(document.getElementById("linear_container"), { childList: true, subtree: true });
observer_button_energy.observe(document.getElementById("energy_container"), { childList: true, subtree: true });

// Start observing changes in the container
observer_outer_div.observe(document.getElementById("linear_container"), { childList: true, subtree: true });
observer_outer_div.observe(document.getElementById("energy_container"), { childList: true, subtree: true });

//detect button click transformation

document.getElementById('linearButton').addEventListener('click', function() {
  document.getElementById('linear_container').style.display = 'block';
  document.getElementById('energy_container').style.display = 'none';
  this.classList.add('active');
  document.getElementById('energyButton').classList.remove('active');
});

document.getElementById('energyButton').addEventListener('click', function() {
  document.getElementById('linear_container').style.display = 'none';
  document.getElementById('energy_container').style.display = 'block';
  this.classList.add('active');
  document.getElementById('linearButton').classList.remove('active');
});

document.getElementById('linearButton_analysis').addEventListener('click', function() {
  this.classList.add('active');
  document.getElementById('energyButton_analysis').classList.remove('active');
  document.getElementById('slope').style.display = 'block';
  document.getElementById('slope_energy').style.display = 'none';
});

document.getElementById('energyButton_analysis').addEventListener('click', function() {
  this.classList.add('active');
  document.getElementById('linearButton_analysis').classList.remove('active');
  document.getElementById('slope_energy').style.display = 'block';
  document.getElementById('slope').style.display = 'none';
});
