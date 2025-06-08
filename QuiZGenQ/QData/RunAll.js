import { GenRandomQ0 } from "/QuiZGenQ/QData/GenQ0.js";
import { GenRandomQ1 } from "/QuiZGenQ/QData/GenQ1.js";
import { GenRandomQ2 } from "/QuiZGenQ/QData/GenQ2.js";
import { GenRandomQ3 } from "/QuiZGenQ/QData/GenQ3.js";
import { GenRandomQ4 } from "/QuiZGenQ/QData/GenQ4.js";
import { GenRandomQ5 } from "/QuiZGenQ/QData/GenQ5.js";
import { GenRandomQ6 } from "/QuiZGenQ/QData/GenQ6.js";
import { GenRandomQ7 } from "/QuiZGenQ/QData/GenQ7.js";
import { GenRandomQ8 } from "/QuiZGenQ/QData/GenQ8.js";
import { GenRandomQ9 } from "/QuiZGenQ/QData/GenQ9.js";
import { GenRandomQ10 } from "/QuiZGenQ/QData/GenQ10.js";
import { GenRandomQ12 } from "/QuiZGenQ/QData/GenQ12.js";
import { GenRandomQ13 } from "/QuiZGenQ/QData/GenQ13.js";
import { GenRandomQ15 } from "/QuiZGenQ/QData/GenQ15.js";
import { GenRandomQ16 } from "/QuiZGenQ/QData/GenQ16.js";
import { GenRandomQ17 } from "/QuiZGenQ/QData/GenQ17.js";
import { GenRandomQ18 } from "/QuiZGenQ/QData/GenQ18.js";
import { GenRandomQ19 } from "/QuiZGenQ/QData/GenQ19.js";
import { GenRandomQ20 } from "/QuiZGenQ/QData/GenQ20.js";
import { GenRandomQ21 } from "/QuiZGenQ/QData/GenQ21.js";
import { GenRandomQ22 } from "/QuiZGenQ/QData/GenQ22.js";

export function RunAll(NumberOfQuestion) {
    let questions = [];
    let availableNumbers = [0,1,2,3,5,6,7,9,10,12,13,15,16,17,18,19,20,21,22];  // The available numbers to choose from
    // let availableNumbers = [5]; // test function

    for (let k = 0; k < NumberOfQuestion; k++) {
        // Check if there are any unused numbers
        if (availableNumbers.length === 0) {
            // Reset available numbers
            availableNumbers = [0,1,2,3,5,6,7,9,10,12,13,15,16,17,18,19,20,21,22];
            // availableNumbers = [5];// test function
        }

        // Pick a random number from available numbers
        let randomIndex = Math.floor(Math.random() * availableNumbers.length);
        let NQ = availableNumbers.splice(randomIndex, 1)[0];  // Remove the picked number from available numbers

        if (NQ == 0) {
            questions = [...questions, GenRandomQ0()];
        } 
        else if (NQ == 1) {
            questions = [...questions, GenRandomQ1()];
        } 
        else if (NQ == 2) {
            questions = [...questions, GenRandomQ2()];
        } 
        else if (NQ == 3) {
            questions = [...questions, GenRandomQ3()];
        } 
        // else if (NQ == 4) {
        //     questions = [...questions, GenRandomQ4()];
        // } 
        else if (NQ == 5) {
            questions = [...questions, GenRandomQ5()];
        } 
        else if (NQ == 6) {
            questions = [...questions, GenRandomQ6()];
        } 
        else if (NQ == 7) {
            questions = [...questions, GenRandomQ7()]; 
        }
        else if (NQ == 8) {
            questions = [...questions, GenRandomQ8()];
        } 
        else if (NQ == 9) {
            questions = [...questions, GenRandomQ9()];
        } 
        else if (NQ == 10) {
            questions = [...questions, GenRandomQ10()];   
        }
        else if (NQ == 12) {
            questions = [...questions, GenRandomQ12()];
        } 
        else if (NQ == 13) {
            questions = [...questions, GenRandomQ13()]; 
        }
        else if (NQ == 15) {
            questions = [...questions, GenRandomQ15()];
        }  
        else if (NQ == 16) {
            questions = [...questions, GenRandomQ16()];
        } 
        else if (NQ == 17) {
            questions = [...questions, GenRandomQ17()];
        }
        else if (NQ == 18) {
            questions = [...questions, GenRandomQ18()];
        }
        else if (NQ == 19) {
            questions = [...questions, GenRandomQ19()];
        } 
        else if (NQ == 20) {
            questions = [...questions, GenRandomQ20()];
        } 
        else if (NQ == 21) {
            questions = [...questions, GenRandomQ21()];
        } 
        else if (NQ == 22) {
            questions = [...questions, GenRandomQ22()];
        } 


    }

    return questions;
}
