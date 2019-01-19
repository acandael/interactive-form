$( document ).ready(function() {
  // set focus to the first text field
  $('#name').focus();

  // show text field when 'Other' is selected from Job Role
  $('#title').change(function(e) {
    if (e.target.value === 'other') {
      $('#other-text').show();
    }
  });

  
  // show color options that match the design
  $('#design').change(function(e){
    
    if (e.target.value === 'js puns') {
      // set the color options for the 'js puns' design
      $('#color option').each(function() {
        if (this.value === 'cornflowerblue' | this.value === 'darkslategrey' | this.value ==='gold') {
          $(this).show();
        } else {
          $(this).hide();
        }
        // set selected option
        $('#color').val('cornflowerblue');
      });
    } else if (e.target.value === 'heart js') {
      // set the color options for the 'heart js' design
      $('#color option').each(function() {
        if (this.value === 'tomato' | this.value === 'steelblue' | this.value === 'dimgrey') {
          $(this).show();
        } else {
          $(this).hide();
        }
        // set selected option
        $('#color').val('tomato');
      });
    }
    
  });

  // Register For Activities
  //  If the user selects a workshop, don't allow selection of a workshop at the same day and       time

  $('.activities :checkbox').on("change", function(){
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
      
      // disable events with the same date
      $('.activities :checkbox').each(function(key, value){

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

      // enable events with the same date as the unchecked event
      $('.activities :checkbox').each(function(key, value){

        otherLabel = $(value).prop("labels");
        otherText = $(otherLabel).text().split('—')[1];
        
        if (labelText === otherText) {
          $(value).attr("disabled", false);
          $(value).parent().removeClass('strikethrough');
        }
        
      });
    }
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
  $('#payment').on('change', function(e){
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
    }
  });

  // Validate the form when submit button is clicked
  $('form').on('submit', function(e){
    e.preventDefault();

    // The user should select a payment option
    if ($('#payment').val() === 'select_method') {
      $('#noPaymentInfo').show();
    }

    // The name field can't be blank
    if (!$('#name').val()) {
        // only add an error message when no previous error message exists
        if ($('#name').next('.error').length === 0) {
          $('#name').after("<p class='error'>The name field can not be blank!</p>");
        $('#name').addClass('error-field');
        }
    }

    // At least one activity must be checked
    const checked = $("input[type='checkbox']:checked");
    if (checked.length < 1) {
      $('.activities').after("<p class='error'>At least one activity must be checked</p>");
    } else {
      $('.activities').next().remove();
    }
    
  });

  $('#mail').change(function(e){
    const mail = $('#mail').val();
    if (!isValidEmail(mail)) {
      $('#mail').after("<p class='error'>The format of the email is not valid</p>");
      $('#mail').addClass('error-field');
    } else {
      $('#mail').next('p').remove();
    }
  })

  function isValidEmail(email) {
    return /^[^@]+@[^@.]+\.[a-z]+$/i.test(email);
  }

});

