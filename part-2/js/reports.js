$(function(){
  
  $('body').on("click", "a", ".employee-link", function(e){
    var idNumber2 = e.currentTarget.id
    
    $.getJSON('data/employees.json', function(data){
      var allID2 = [];
      var allReportsTo2 = [];
      $.each(data, function(){
        $.each(this, function(key, value){
          var totalArr2 = []
          allID2.push(value.ID);
          allReportsTo2.push(value.ReportsTo);
          for(var i in allID2){
            var counter2 = 0;
            for(var r in allReportsTo2){
              if(allReportsTo2[r] === idNumber2)
                counter2 ++;
              }
            totalArr.push(counter2);
          }
          localStorage.setItem("subordinates", JSON.stringify(totalArr2));
        });
      });
    });//close json call  
  });//close click  
  
  $(window).hashchange(function(e) {
    
    var idNumber = sessionStorage.getItem("id");
  
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
          var retrievedSubordinates2 = JSON.parse(localStorage.getItem("subordinates2"));
          console.log(retrievedSubordinates2);
          $.each(response, function(){     
            $.each(this, function(key, value){
              if(value.ID === 1){
                $('#direct').html('<ul data-role="listview" id="direct-list"></ul>');
                $('#direct-list').html(
                  '<li>' +
                    '<a href="#employee" id="' + value.ID + '">' +
                      '<img src="' + value.ImagePath + '">' +
                      '<h3>' + value.Name + '</h3>' +
                      '<p>' + value.Title + '</p>' +
                      '<span class="ui-li-count">' + retrievedSubordinates[key] + '</span>' + 
                    '</a>' +
                  '</li>'
                );
                $('#direct-list').listview();
              } //end if function  
            });
          });  
        }
    });//close ajax call
  }); //end haschange    
}); //end ready   
        