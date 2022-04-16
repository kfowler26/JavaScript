/**
 * @author by Kendall Fowler
 * @since 11-MAR-2021
 * CIS 2286 Assignment 4
 *
 */

window.addEventListener('DOMContentLoaded', init, false);

/**
 * Function that adds event listener to form and enables hint buttons
 * @modified Kendall Fowler
 * @since 15-MAR-2021
 */
function init() {

    document.getElementById("submitButton").addEventListener("click", function (event) {

        if (!validateQuiz()) {

            event.preventDefault();

        } else {

            document.getElementById("submitButton").addEventListener("click", processQuiz);

        }
    });

    document.getElementById("clearButton").addEventListener("click", clearForm);
    document.getElementById("questionOneButton").addEventListener("click", function () {
        alert("The year of Canada's 100th birthday.");
    });
    document.getElementById("questionTwoButton").addEventListener("click", function () {
        alert("The number of Snow Whites Dwarves.");
    });
    document.getElementById("questionThreeButton").addEventListener("click", function () {
        alert("Also known as Mario Jr.");
    });
    document.getElementById("questionFourButton").addEventListener("click", function () {
        alert("Some would call him The Great One.");
    });
    document.getElementById("questionFiveButton").addEventListener("click", function () {
        alert("The rival of the Toronto Maple Leafs.");
    });
    document.getElementById("questionSixButton").addEventListener("click", function () {
        alert("20 years ago.");
    });
    document.getElementById("questionSevenButton").addEventListener("click", function () {
        alert("The two newest teams on the list.");
    });

}

/**
 * Function to process quiz
 * @author Kendall Fowler
 * @since 15-MAR-2021
 */
function processQuiz() {

    //validateQuiz();
    calculatePoints();
    displayMark();


}

/**
 * Function to reset form
 * @source https://www.w3schools.com/jsref/met_form_reset.asp
 * @modified by Kendall Fowler
 * @since 04-Mar-2021
 */

function clearForm() {
    document.getElementById("myForm").reset();
    document.getElementById("outputDiv").innerHTML = " ";
}

/**
 * Function to validate form
 * @author JD Kitson
 * @modified by Kendall Fowler
 * @since 18-Mar-2021
 */
function validateQuiz() {

    let goForSubmit = false;

    let leafsWin = checkNumeric(document.getElementById("questionOne"), document.getElementById("questionOneError"), 4);
    let numTeams = checkNumeric(document.getElementById("questionTwo"), document.getElementById("questionTwoError"), 1);
    let nhlDraft = checkQuantity(document.getElementById("questionThree"), document.getElementById("questionThreeError"));
    let oilers = checkQuantity(document.getElementById("questionFour"), document.getElementById("questionFourError"));
    let mostCups = checkForCheck(document.querySelectorAll('input[name="questionFive"]'), document.getElementById("questionFiveError"));
    let sharksYear = checkForCheck(document.querySelectorAll('input[name="questionSix"]'), document.getElementById("questionSixError"));
    let originalSix = checkForCheck(document.getElementsByName("questionSeven[]"), document.getElementById("questionSevenError"));

    return leafsWin && numTeams && nhlDraft && oilers && originalSix && mostCups && sharksYear;

}


/**
 * Function to calculate points
 * @modified by Kendall Fowler
 * @since 17-Mar-2021
 */

function calculatePoints() {

    let points = 0;
    let leafsWin = parseInt(document.getElementById("questionOne").value);
    let numTeams = parseInt(document.getElementById("questionTwo").value);

    let originalSix = document.querySelectorAll('input[name="questionSeven[]"]:checked');
    let originalSixEntry = "";
    let originalSixCorrect = "Ottawa Senators Vancouver Canucks "

    if (leafsWin === 1967) {
        points++;
    }

    if (numTeams === 7) {
        points++;
    }

    if (document.getElementById("questionThree").value === "Jaromir Jagr") {
        points++;
    }

    if (document.getElementById("questionFour").value === "Wayne Gretzky") {
        points++;
    }

    if (document.querySelector('input[id="Montreal Canadiens"]:checked')) {
        points++;
    }

    if (document.querySelector('input[id="1991"]:checked')) {
        points++;
    }

    for (let i = 0; i < originalSix.length; i++) {
        if (originalSix[i].checked) {
            originalSixEntry += originalSix[i].value + " ";
        }

    }
    if (originalSixEntry.length === originalSixCorrect.length) {
        points++;
    }
    return points;

}

/**
 * Function to display points
 * @modified by Kendall Fowler
 * @since 19-Mar-2021
 */
function displayMark(points) {

    const MAX_SCORE = 7;

    let score = calculatePoints(points);

    let percentFull = (score / MAX_SCORE) * 100;
    let percent = percentFull.toFixed(2);

    let output;

    if (percent <= 50) {
        output = "<p style=\"color:red\">Your Score is " + score + "<br> Your Percent is " + percent + "%</p>";
    } else if (percent >= 51 && percent <= 79) {
        output = "<p style=\"color:orangered\">Your Score is " + score + "<br> Your Percent is " + percent + "%</p>";
    } else {
        output = "<p style=\"color:green\">Your Score is " + score + "<br> Your Percent is " + percent + "%</p>";
    }

    document.getElementById("outputDiv").innerHTML = output;

}