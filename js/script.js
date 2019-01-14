$( document ).ready(function() {
  // set focus to the first text field
  $('#name').focus();

  // show text field when 'Other' is selected from Job Role
  $('#title').change(function(e) {
    if (e.target.value === 'other') {
      $('#other-text').show();
    }
  });

  $('#color').hide();
  // show color options that match the design
  $('#design').change(function(e){
    
    if (e.target.value === 'js puns') {
      $('#color option').each(function() {
        if (this.value === 'cornflowerblue' | this.value === 'darkslategrey' | this.value ==='gold') {
          $(this).show();
        } else {
          $(this).hide();
        }
        $('#color').val('cornflowerblue');
      });
    } else if (e.target.value === 'heart js') {
      
      $('#color option').each(function() {
        if (this.value === 'tomato' | this.value === 'steelblue' | this.value === 'dimgrey') {
          $(this).show();
        } else {
          $(this).hide();
        }
        $('#color').val('tomato');
      });
    }
   
    $('#color').show();
    
  });
});