// Wait until the whole document is loaded.
$(document).ready(function() {

  // Initialize variables.
  var stripePublishableKey;
  var stripeData;

  // Get set the stripe publishable key from the HTML output.
  stripePublishableKey = $('meta[name="stripe_key"]').attr('content');

  // Log the stripe publishable key to the console.
  console.log("Stripe publishable key: " + stripePublishableKey);

  // Set the stripe publishable key.
  Stripe.setPublishableKey(stripePublishableKey);

  // Watch for a form submission (event handler).
  $("#form-submit-btn").click(function(event) {

    // Stop transmitting the form data.
    event.preventDefault();

    // Disable the form submit button so the user can not click it twice.
    $('input[type=submit]').prop('disabled', true);

    // Set the error flag to false.
    var error = false;

    // Get the card data - Card number.
    var ccNum = $('#card_number').val();

    // Log the card number to the console.
    console.log("Card number: " + ccNum);

    // Get the card data - CVC number.
    var cvcNum = $('#card_code').val();

    // Log the CVC number to the console.
    console.log("CVC number: " + cvcNum);

    // Get the card data - Expiration month.
    var expMonth = $('#card_month').val();

    // Log the expiration month to the console.
    console.log("Expiration month: " + expMonth);

    // Get the card data - Expiration year.
    var expYear = $('#card_year').val();

    // Log the expiration year to the console.
    console.log("Expiration year: " + expYear);

    // Check if there was on error.
    if (!error) {

      // Create the stripe data.
      stripeData = {number: ccNum, cvc: cvcNum, exp_month: expMonth, exp_year: expYear};

      // Log the stripe data to the console.
      console.log("Generated stripe data: " + stripeData);

      // Get the Stripe token:
      Stripe.createToken(stripeData, stripeResponseHandler);
    }

    // Return false.
    return false;

  }); // Watch for a form submission (event handler).

  // Response handler to process the returned data from stripe.
  function stripeResponseHandler(status, response) {

    // Get a reference to the form (form id).
    var f = $("#new_user");

    // Get the token from the received response.
    var token = response.id;

    // Log the token to the console.
    console.log("Stripe token: " + token);

    // Add the token to the form:
    f.append('<input type="hidden" name="user[stripe_card_token]" value="' + token + '" />');

    // Log the hidden field to the console.
    console.log("Hidden field string in form: <input type=\"hidden\" name=\"user[stripe_card_token]\" value=\"" + token + "\" />");

    // Submit the form:
    f.get(0).submit();

  } // Response handler to process the returned data from stripe.

}); // Wait until the whole document is loaded.
