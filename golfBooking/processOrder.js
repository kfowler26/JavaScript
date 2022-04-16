/**
 * Name: Kendall Fowler
 * Date: 04-04-2021
 * Purpose: CIS 2286 Assignment 5
 */

/**
 * Function to operate the listeners
 * @author Kendall Fowler
 * @since 04-04-2021
 */
$(function () {

    $("select").on("change", updateTotals);
    $("input:radio[name=discountGroup]").on("change", updateTotals);
    $("#changeButton").on("click", calculateChange);
    $("#resetButton").on("click", resetForm);
    //Code Sourced from https://jqueryui.com/datepicker/
    $("#datePicker").datepicker();

});

// declare global vars
let totalAfterTax = 0.00;

/**
 * Function to do the math calculation
 * @author Don Bowers
 *
 * @modified Kendall Fowler
 * @since 04-04-2021
 */
function updateTotals() {
    // get the data
    let adults = $("#adults").val();
    let children = $("#children").val();

    // ensure a qty is selected for above
    if (adults == 0 && children == 0) {
        // they need to select a qty for children or adults
        alert("You must select a quantity for adults or children.");
    } else {

        // calculate costs

        adults = $("#numAdults").val(adults);
        let adultTotal = adults.val() * 4.00;

        children = $("#numChildren").val(children);
        let childTotal = children.val() * 2.00;

        $("#totalAdultsDiv").html("$" + adultTotal.toFixed(2));
        $("#totalChildrenDiv").html("$" + childTotal.toFixed(2));
        let totalBeforeTax = adultTotal + childTotal;

        // get discount radio choice
        let deduct = 0;

        let discountString = "None";
        if ($('#caa').is(':checked')) {
            deduct = totalBeforeTax * .10;
            totalBeforeTax = totalBeforeTax - deduct;
            discountString = "CAA saved $" + deduct.toFixed(2);
        } else if ($('#mil').is(':checked')) {
            deduct = totalBeforeTax * .25;
            totalBeforeTax = totalBeforeTax - deduct;
            discountString = "Military saved $" + deduct.toFixed(2);
        } else if ($('#fun').is(':checked')) {
            deduct = totalBeforeTax * .50;
            totalBeforeTax = totalBeforeTax - deduct;
            discountString = "Super Fun Club saved $" + deduct.toFixed(2);
        }

        $("#discountString").html(discountString);

        totalAfterTax = totalBeforeTax * 1.1;
        $("#totalBeforeTaxDiv").html("$" + totalBeforeTax.toLocaleString('en-CA', {minimumFractionDigits: 2}));
        $("#totalAfterTaxDiv").html("$" + totalAfterTax.toLocaleString('en-CA', {minimumFractionDigits: 2}));
    } // end if no adults or children selected


}// end update Totals function

/**
 * Function to to reset the form
 * @author Don Bowers
 *
 * @modified Kendall Fowler
 * @since 04-04-2021
 */
function calculateChange() {
    let amountGiven = parseFloat(prompt("Enter amount client gave you"));
    let changeDue = amountGiven - totalAfterTax;
    $("#changeDue").html("$" + changeDue.toFixed(2));
    $("#changeOutput").css("display", "block");
}

/**
 * Function to reset form
 * Code Sourced from CIS2286Topic11Class1Activity2InClassComplete2021
 * @modified Kendall Fowler
 * @since 04-04-2021
 */
function resetForm() {
    $("#myForm").trigger("reset");
    $("#totalAdultsDiv, #totalChildrenDiv, #totalBeforeTaxDiv, #totalAfterTaxDiv, #discountString, #numAdults, #numChildren, #changeOutput ").css("display", "none");
}




