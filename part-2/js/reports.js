$(function(){
  $('#page2container').on("click", "a", function(e) {
    var mgrID = e.currentTarget.id;
    $("#direct-dir").empty();
        
    $.ajax({
      type: 'GET',
      url: 'data/employees.json',
      timeout: 10000,
      error: function(XHR, status, error){
        $('#dialog').dialog({
          buttons: [
            {
              text: "Error: " + XHR.status + " - " + error,
            },
            {
              text: "Ok",
              click: function() {
                $(this).dialog("close");
              }
            }
          ]
        });
      },
      dataType: 'json',
      success: function(response){
        var retrievedSubordinates = JSON.parse(localStorage.getItem("subordinates"));
        $.each(response, function(){         
          $.each(this, function(key, value){
            var reportsToArray = [];
            reportsToArray.push(value.ReportsTo);
            for(var i in reportsToArray){ 
              if(reportsToArray[i] == mgrID){
                $('#direct-dir').append(
                  '<li class="ui-li-has-count ui-li-has-thumb">' +
                    '<a href="#employee" id="' + value.ID + ' class="ui-btn ui-btn-icon-right ui-icon-carat-r">' +
                      '<img src="' + value.ImagePath + '">' +
                      '<h3>' + value.Name + '</h3>' +
                      '<p>' + value.Title + '</p>' +
                      '<span class="ui-li-count ui-body-inherit">' + retrievedSubordinates[key] + '</span>' + 
                    '</a>' +
                  '</li>'
                );
              }//end if function
            }//end for
          });
        });  
      }
  });//close ajax call
  }); //end haschange    
}); //end ready   
        