function stripeResponseHandler(status, response) {
  //Get a reference to the form
  var f = $('#new-user');
  //Get a token from the response
  var token = response.id;
  //Add the token to the form
  f.append('<input type="hidden" name="user[stripe_card_token]" value="' + token + '" />');
  //Submit the form
  f.get(0).submit();
}

function main() {
  Stripe.setPublishableKey($('meta[name="stripe-key"]').attr('content'));
  // Watch for a form submission
  $('#form-submit-btn').click(function(event) {
    event.preventDefault();
    $('input[type=submit]').prop('Disabled', true);
    var error = false;
    var ccnum = $('#card_number').val();
        cvcNum = $('#card_code').val();
        expMonth = $('card_month').val();
        expYear = $('card_year').val();
    if (!error) {
      // Get Stripe token
      Stripe.createToken({
        number: ccNum,
        code: cvcNum,
        exp_month: expMonth,
        exp_year: expYear
      },
      stripeResponseHandler);
    }
    return false;
  });
}

$(document).ready(main());
