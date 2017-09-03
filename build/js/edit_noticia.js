var noticeToUpdate;

function edit_noticia(id)
{
  noticeToUpdate = id;
  $.ajax({
      crossDomain:true,
      type: 'GET',
      url: URL_BASE+'/notices/all',
      contentType:'application/json',
      dataType: 'json',
      success: function (data)
      {
        if(data.success)
        {
          putDataFromNoticias(data.notices, id);
        }
        else
          showToast("error","Noticia no encontrada");
      },
      failure: function (response, status) {
         // failure code here
         showToast('error',"Error inesperado :(");

      },
      error: function ()
      {
        showToast('error',"Error inesperado :(");
      }
    });

}


function putDataFromNoticias(noticias, id)
{
  for (var i = 0; i < noticias.length; i++) {
    if (noticias[i].id == id)
    {
        $("#notice_title").val(noticias[i].titulo);
        $("#notice_subtitle").val(noticias[i].subtitulo);
        $("#notice_description").val(noticias[i].descripcion);
        break;
    }
  }
}

function updateNotice() // TODO add validaciones
{
  var dataToSend = {};
  dataToSend.titulo =   $("#notice_title").val();
  dataToSend.subtitulo =   $("#notice_subtitle").val();
  dataToSend.descripcion =   $("#notice_description").val();
  dataToSend.noticia = noticeToUpdate;

  $.ajax({
      type: 'POST',
      url: 'https://hyonode.herokuapp.com/notice/update',
      data: JSON.stringify(dataToSend),
      contentType:'application/json',
      dataType: 'json',
      success: function (data)
      {
          if (data.success)
          {
            showToast('success','Datos Actualizados satisfactoriamente :D');
            window.location.href = "#noticias";
          }
          else
            showToast('error',"Error inesperado :(");

      },
      failure: function (response, status) {
         // failure code here
         showToast('error',"Error inesperado :(");

      },
      error: function ()
      {
        showToast('error',"Error inesperado :(");
      }
    });
}
