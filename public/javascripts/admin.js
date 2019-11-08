let lastClickID = 0;
$(document).ready(function() {
  $('#yes').on('click', function() {
    $.ajax({
      url: '/api/delete',
      type: 'POST',
      data: {
        id: lastClickID,
        _csrf: $('#_csrf').val(),
      },
      success: function(res) {
        if (res.cnt === 1) {
          $('#' + lastClickID).remove();
          if ($('.card-columns').children().length === 0) {
            $('<h4>').text('There are no questions.')
                .appendTo($('.card-columns').parent());
          }
        }
      },
      fail: function(xhr, textStatus, errorThrown) {
        console.log(xhr, textStatus, errorThrown);
      },
    });
  });
  $('.delete').on('click', function() {
    lastClickID = $(this).parent().parent().attr('id');
  });
  if ($('.card-columns').children().length === 0) {
    $('<h4>').text('There are no questions.')
        .appendTo($('.card-columns').parent());
  }
});
