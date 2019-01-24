$(document).ready(function () {
  // set focus to the first text field
  $('#name').focus();

  // show text field when 'Other' is selected from Job Role
  $('#other-text').hide();
  $('#title').change(function (e) {
    if (e.target.value === 'other') {
      $('#other-text').show();
    } else {
      $('#other-text').hide();
    }
  });

  $('#color').hide();
  // show color options that match the design
  $('#design').change(function (e) {

    if (e.target.value === 'js puns') {
      // set the color options for the 'js puns' design
      $('#color option').each(function () {
        if (this.value === 'cornflowerblue' | this.value === 'darkslategrey' | this.value === 'gold') {
          $(this).show();
        } else {
          $(this).hide();
        }
        // set selected option
        $('#color').val('cornflowerblue');
        $('#color').show();
      });
    } else if (e.target.value === 'heart js') {
      // set the color options for the 'heart js' design
      $('#color option').each(function () {
        if (this.value === 'tomato' | this.value === 'steelblue' | this.value === 'dimgrey') {
          $(this).show();
        } else {
          $(this).hide();
        }
        // set selected option
        $('#color').val('tomato');
        $('#color').show();
      });
    } else if (e.target.value === 'Select Theme') {
      $('#color').hide();
    }

  });

  // Register For Activities
  //  If the user selects a workshop, don't allow selection of a workshop at the same day and       time

  let totalCost = 0;
  let price = 0;

  $('.activities :checkbox').on("change", function () {
    // set up variables for the labels
    let labelText = '';
    let otherLabel = '';
    let otherText = '';

    // the event was checked
    if (this.checked) {
      // add check attribute to checkbox
      $(this).attr("checked", true);
      const checked = $(this).prop("labels");
      // get the text from the label and parse it for the date part
      labelText = $(checked).text().split('—')[1];

      // Get price for checked checkbox
      price = parseInt($(checked).text().split('$')[1]);
      totalCost += price;

      // disable events with the same date
      $('.activities :checkbox').each(function (key, value) {

        otherLabel = $(value).prop("labels");
        otherText = $(otherLabel).text().split('—')[1];

        if (!this.checked) {
          if (labelText === otherText) {
            $(value).attr("disabled", true);
            $(value).parent().addClass('strikethrough');
          }
        }
      });

      // the event was unchecked
    } else {
      const unchecked = $(this).prop("labels");
      labelText = $(unchecked).text().split('—')[1];
      // get price from unchecked checkbox and distract from total cost
      price = $(unchecked).text().split('$')[1];
      totalCost -= price;
      // enable events with the same date as the unchecked event
      $('.activities :checkbox').each(function (key, value) {

        otherLabel = $(value).prop("labels");
        otherText = $(otherLabel).text().split('—')[1];

        if (labelText === otherText) {
          $(value).attr("disabled", false);
          $(value).parent().removeClass('strikethrough');
        }

      });
    }

    // Add totalCost to paragraph
    $('#totalCost').text('$' + totalCost);


  });

  // Payment Info
  // Display payment sections based on the payment option chosen in the select menu.

  //The "Credit Card" payment option should be selected by default
  $('#payment').val('credit card');
  $('#credit-card').show();
  $('#paypal').hide();
  $('#bitcoin').hide();
  $('#noPaymentInfo').hide();

  // show the payment information based on the selected payment option
  $('#payment').on('change', function (e) {
    const option = e.target.value;
    switch (option) {
      case 'paypal':
        $('#paypal').show();
        $('#bitcoin').hide();
        $('#credit-card').hide();
        break;
      case 'bitcoin':
        $('#bitcoin').show();
        $('#paypal').hide();
        $('#credit-card').hide();
        break;
      case 'credit card':
        $('#credit-card').show();
        $('#paypal').hide();
        $('#bitcoin').hide();
        break;
      case 'select_method':
        $('#bitcoin').hide();
        $('#paypal').hide();
        $('#credit-card').hide();
    }
  });

  // Validate the form when submit button is clicked
  $('form').on('submit', function (e) {

    // The user should select a payment option
    if ($('#payment').val() === 'select_method') {
      e.preventDefault();
      $('#noPaymentInfo').show();
    }

    // The name field can't be blank
    if (!$('#name').val()) {
      e.preventDefault();
      // only add an error message when no previous error message exists
      if ($('#name').next('.error').length === 0) {
        $('#name').after("<p class='error'>The name field can not be blank!</p>");
        $('#name').addClass('error-field');
      }
    }

    // At least one activity must be checked
    const checked = $("input[type='checkbox']:checked");
    if (checked.length < 1) {
      e.preventDefault();
      // check if error message is set
      if (!$('#noActivity').length > 0) {
        $('.activities').after('<p class="error" id="noActivity">At least one activity must be selected</p>');
      }

    } else {
      $('#noActivity').remove();
    }

    // If the credit-card payment option is chosen
    // make sure the user has supplied a Credit Card number, a Zip Code, and a 3 number CVV
    if ($('#payment').val() === 'credit card') {
      const creditCardNumber = $('#cc-num').val();
      const zipCode = $('#zip').val();
      const CVV = $('#cvv').val();

      let isValidNumber = isValidCreditCardNumber(creditCardNumber);

      if (!isValidNumber) {
        e.preventDefault();
        // check if error message is already set
        if (!$('#noValidNumber').length > 0) {
          $('#cc-num').after("<p class='error' id='noValidNumber'>Enter a valid credit card number</p>");
        }
      } else {
        $('#noValidNumber').remove();
      }

      let validZipCode = isValidZipCode(zipCode);

      if (!validZipCode) {
        e.preventDefault();
        //check if error message is already set
        if (!$('#noValidZip').length > 0) {
          $('#zip').after("<p class='error' id='noValidZip'>Enter a valid ZIP code</p>")
        }
      } else {
        $('#noValidZip').remove();
      }

      let validCVV = isValidCVV(CVV);

      if (!validCVV) {
        e.preventDefault();
        // check if error message is already set
        if (!$('#noValidCVV').length > 0) {
          $('#cvv').after("<p class='error' id='noValidCVV'>Enter a valid CVV</p>");
        }
      } else {
        $('#noValidCVV').remove();
      }
    }

    const mail = $('#mail').val();

    if (mail === '') {
      $('#noValidFormat').hide();
      $('#noMail').show();
      $('#mail').addClass('error-field');
    } else {
      $('#noMail').hide();
      let isValidFormat = isValidEmail(mail);

      if (!isValidFormat) {
        $('#noValidFormat').show();
        $('#mail').addClass('error-field');
      } else {
        $('#noValidFormat').hide();
        $('#mail').removeClass('error-field');
      }
    }



  });



  function isValidEmail(email) {
    return /^[^@]+@[^@.]+\.[a-z]+$/i.test(email);
  }

  function isValidCreditCardNumber(creditCardNumber) {
    return /^[1-9][0-9]{12,15}$/.test(creditCardNumber);
  }

  function isValidZipCode(zipcode) {
    return /^[0-9]{5}$/.test(zipcode);
  }

  function isValidCVV(cvv) {
    return /^[0-9]{3}$/.test(cvv);
  }



});

