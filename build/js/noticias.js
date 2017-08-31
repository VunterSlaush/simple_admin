var noticeMainTable;
function noticias()
{
  $.ajax({
      crossDomain:true,
      type: 'GET',
      url: URL_BASE+'/notices',
      contentType:'application/json',
      dataType: 'json',
      success: function (data)
      {
        if(data.success)
          noticeMainTable = crearNoticeTable(data.notices,"#content");
        else
          showToast("error",data.error);
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

function crearNoticeTable(apps, appendTo)
{
  model = ["id","Titulo","Subtitulo","Fecha","Accion"];
  table = createTable(model);
  $(appendTo).append(table);
  table = initDataTable(table);
  addNoticesToTable(table,apps);
  return table
}

function addNoticesToTable(table, reports)
{
    for (var i = 0; i < reports.length; i++) {
      table.row.add([ reports[i].id, reports[i].titulo, reports[i].subtitulo, reports[i].fecha, crearNoticesButtons(reports[i].id)]).draw(false);
    }
}

function crearNoticesButtons(id) // TODO
{
  let container = $("<div>",{style:"padding:3px;"});
  let seeButton = $("<a>",{href:"#edit_user/"+id, text:"Editar", style:" margin-right:5px;", class:"btn btn-primary"});
  let delButton = $("<a>",{onClick:"eliminarUser(this,"+id+")", text:"Eliminar", style:" margin-right:5px;", class:"btn btn-danger"});
  $(container).append(seeButton);
  $(container).append(delButton);
  return $(container).html();
}



function eliminarUser(button,id)
{
  deleteRemoteRow('/users/delete',id,button,noticeMainTable);
}
