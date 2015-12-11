$(function(){
  $('input').attr("placeholder", "Search");
  
  $('input').one("input", function(val){
    $('#welcome').addClass("hide");
    
    $.getJSON('data/employees.json', function(data){
      var allID = [];
      var allReportsTo = [];
      $.each(data, function(){
        $.each(this, function(key, value){
          var totalArr = []
          allID.push(value.ID);
          allReportsTo.push(value.ReportsTo);
          for(var i in allID){
            var counter = 0;
            for(var r in allReportsTo){
              if(allReportsTo[r] === allID[i])
                counter ++;
              }
            totalArr.push(counter);
          }
          localStorage.setItem("subordinates", JSON.stringify(totalArr));
        });
      });
    });//close json call
    
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
            $('#dir').append(
              '<li>' +
                '<a href="#employee" class="employee-link" id="' + value.ID + '">' +
                  '<img src="' + value.ImagePath + '">' +
                  '<h3>' + value.Name + '</h3>' +
                  '<p>' + value.Title + '</p>' +
                  '<span class="ui-li-count">' + retrievedSubordinates[key] + '</span>' + 
                '</a>' +
              '</li>'
            );
            $('#dir').listview();
          });
        });  
      }
    });//close ajax call
  }); //end eventlistener  
}); //end ready
