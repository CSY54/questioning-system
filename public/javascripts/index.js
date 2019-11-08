$(document).ready(function() {
  $('#captcha_img').on('click', function() {
    $('#captcha_img').attr('src', '/api/captcha?r=' + Math.random())
        .attr('height', $('#captcha').innerHeight());
  });
  $('#form').on('submit', function(e) {
    e.preventDefault();
    $.ajax({
      url: '/api/submit',
      type: 'POST',
      data: {
        username: $('#username').val(),
        problem: $('#problem').val(),
        contents: $('#contents').val(),
        captcha: $('#captcha').val(),
      },
      success: function(res) {
        if (res.success) {
          window.location.href = '/submitted';
        } else {
          $('#msg').addClass('alert alert-danger').text(res.error);
          $('#captcha_img').click();
        }
      },
      fail: function(xhr, textStatus, errorThrown) {
        console.log(xhr, textStatus, errorThrown);
      },
    });
  });
  $('#captcha_img').click();
});
