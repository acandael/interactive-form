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
});