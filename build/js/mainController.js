var user;

$( document ).ready(function()
{
  user = JSON.parse(localStorage.getItem("user"));
  $(".user_name_here").text(user.username);
  $(window).on('hashchange', function() {
      loadContent();
  });
  loadContent();
});


function loadContent()
{
    var name = location.hash.slice(1) != "" ? location.hash.slice(1) : "aplicaciones";
    var param;
    if(name.indexOf("/") != -1)
    {
      param = name.substring(name.indexOf("/")+1, name.length);
      name = name.substring(0,name.indexOf("/"));
    }

    $('#content').empty();
    $('#content').load('../production/'+name+".html?"+(new Date).getTime(),function()
    {
      callNameFunction(name,param);
    });
}

function callNameFunction(name,param)
{
  var fn = window[name];
  if(typeof fn === 'function')
        fn(param);
}

function logout()
{
  $.ajax({
      type: 'POST',
      url: URL_BASE+'/logout',
      contentType:'application/json',
      dataType: 'json',
      success: function (data)
      {
          if (data.success)
          {
            localStorage.removeItem("user");
            location.reload();
          }
      }
    });
}


function changeVideo()
{
  $.confirm({
  title: 'Video!',
  content:  '<form action="" class="formName">' +
  '<div class="form-group">' +
  '<label>Introduzca El Iframe dado por Facebook</label>' +
  '<textarea id="iframe" type="text" class="name form-control" required />' +
  '</div>' +
  '</form>',
  buttons: {
      formSubmit: {
          text: 'Enviar',
          btnClass: 'btn-blue',
          action: function () {
              var iframe = this.$content.find('#iframe').val();
              sendIframeToServer(iframe);
          }
      },
      cancel: function () {
          //close
      },
  },
  onContentReady: function () {
      // bind to events
      var jc = this;
      this.$content.find('form').on('submit', function (e) {
          // if the user submits the form by pressing enter in the field.
          e.preventDefault();
          jc.$$formSubmit.trigger('click'); // reference the button and click it
      });
  }
});
}


function sendIframeToServer(iframe)
{
  var dataToSend = {};
  dataToSend.iframe = iframe;
  $.ajax({
      type: 'POST',
      url: URL_BASE+'/video/create',
      contentType:'application/json',
      dataType: 'json',
      data: JSON.stringify(dataToSend),
      success: function (data)
      {
          if (data.success)
          {
              showToast("success","video subido satisfactoriamente");
          }
          else
          {
              showToast("error","error al subir el video");
          }
      }
    });
}
