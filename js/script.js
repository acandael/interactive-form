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

  $('.activities :checkbox').on("change", function(){
    let labelText = '';
    let otherLabel = '';
    let otherText = '';
    if (this.checked) {
      // the event was checked
      const checked = $(this).prop("labels");
      // get the text from the label and parse it for the date part
      labelText = $(checked).text().split('—')[1];
      // loop through other labels
      $('.activities :checkbox').each(function(key, value){
        otherLabel = $(value).prop("labels");
        otherText = $(otherLabel).text().split('—')[1];
        // disable events with the same date
        if (!this.checked) {
          if (labelText === otherText) {
            $(value).attr("disabled", true);
            $(value).parent().addClass('strikethrough');
          }
        }
      });
      
    } else {
      // the event was unchecked
      const unchecked = $(this).prop("labels");
      labelText = $(unchecked).text().split('—')[1];
      // enable checkboxes that where disabled
      $('.activities :checkbox').each(function(key, value){
        otherLabel = $(value).prop("labels");
        otherText = $(otherLabel).text().split('—')[1];
        // enable events with the same date
        if (labelText === otherText) {
          $(value).attr("disabled", false);
          $(value).parent().removeClass('strikethrough');
        }
        
      });
    }
  });
  
});

