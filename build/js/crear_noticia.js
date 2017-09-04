var dropzone;
var imagesAdded;
function crear_noticia()
{
    imagesAdded = [];
    dropzone = new Dropzone("#dropzone",
               {
                 url: "../../ws/uploadImg",
                 acceptedFiles: ".png, .jpg, .jpeg",
                 init: function(){
                    this.on("error", function(file){if (!file.accepted) this.removeFile(file);});
                }
               });

    dropzone.on("success", function (file,res)
    {
      imagesAdded.push(res.ruta);
    });
}


function addNotice()
{
  var dataToSend = {};
  dataToSend.images = imagesAdded;
  dataToSend.titulo = $("#notice_title").val();
  dataToSend.subtitulo = $("#notice_subtitle").val();
  dataToSend.tipo = $("#notice_type").val();
  dataToSend.descripcion = $("#notice_description").val();

  if (dataToSend.images.length == 0 ||
      dataToSend.titulo.trim() == "" ||
      dataToSend.descripcion.trim() == "" ||
      dataToSend.subtitulo.trim() == "")
  {
    showToast('error',"No pueden haber campos vacios");
    if (dataToSend.images.length == 0)
      showToast('error',"debe subir por lo menos 1 imagen");
    return;
  }

  $.ajax({
      type: 'POST',
      url: 'https://hyonode.herokuapp.com/notice/create',
      data: JSON.stringify(dataToSend),
      contentType:'application/json',
      dataType: 'json',
      success: function (data)
      {
          if (data.success || data.id)
          {
            showToast('success','Noticia Agregada satisfactoriamente :D');
            location.href = "#noticias";
          }
          else
            showToast('error',data.error+" ");

      },
      failure: function (response, status) {
         // failure code here
         showToast('error',"Error inesperado ");

      },
      error: function ()
      {
        showToast('error',"Error inesperado ");
      }
    });
}
