var eventVisual = {
  init: function () {
    var visualTitle = $('#visual .title');
    setTimeout(function () {
      visualTitle.addClass('animate-start');
    }, 1500)
  }
}

$(document).ready(function () {
  $.ajax({
    url: 'contents.html',
    dataType: 'html',
    beforeSend: function () {
      // 로딩 아이콘 표시
      $('.loading-area').show();
    },
    xhr: function () {
      // 프로그레스 바를 표시하기 위해 XMLHttpRequest 객체 반환
      var xhr = new window.XMLHttpRequest();
      xhr.addEventListener('progress', function (evt) {
        if (evt.lengthComputable) {
          // 로딩 상태 표시
          var percentComplete = evt.loaded / evt.total * 100;
          $('.progress-bar').width(percentComplete + '%');
          $('.progress').text(percentComplete.toFixed(0) + '%');
        }
      }, false);
      return xhr;
    },
    success: function (data) {
      // 로딩 아이콘 숨기고 contents.html의 내용 표시
      $('.loading-area').hide();
      $('#wrap').html(data);
      eventVisual.init();
      var scripts = $(data).filter('script');
      $.each(scripts, function (index, script) {
        var scriptSrc = $(script).attr('src');
        if (scriptSrc) {
          $.ajax({
            url: scriptSrc,
            dataType: 'script',
            async: false,
          });
        } else {
          $.globalEval(script.text || script.textContent || script.innerHTML || '');
        }
      });
    },
    error: function () {
      $('.loading-area').hide();
      $('#wrap').html('불러오기 실패');
    }
  });
});

