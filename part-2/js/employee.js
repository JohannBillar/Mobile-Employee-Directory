$(function(){  
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
        
        var manager;
        var reportsToNum;
        
        reportsToNum = response.employees[idNumber-1].ReportsTo-1;
        
        if(response.employees[reportsToNum] === undefined){
          manager = "I'm the Boss!";
        } else manager = response.employees[reportsToNum].Name;
 
        var retrievedSubordinates = JSON.parse(localStorage.getItem("subordinates"));
        $.each(response, function(){
          
          $.each(this, function(key, value){
            if(value.ID == idNumber){
              $('#head-shot').html(
                '<img src="' + value.ImagePath + '">' +
                '<h3>' + value.Name + '</h3>' +
                '<p>' + value.Title + '</p>' +
                '<div class="clr" id="break"></div>'
              );
              $('#break').html('<ul data-role="listview" data-inset="true" id="detail"></ul>');
              $('#detail').html(
                '<li>' +
                    '<a href="#" id="' + reportsToNum + '">' +
                    '<h3> View Manager </h3>' +
                    '<p>' + manager + '</p>' +
                  '</a>' +
                '</li>' +
                '<li>' +
                  '<a href="' + '#reports' + '">' +
                    '<h3> View Direct Reports </h3>' +
                     '<p>' + retrievedSubordinates[value.ID-1] + '</p>' +
                  '</a>' +
                '</li>' +
                '<li>' +
                  '<a href="tel:' + value.OfficeNumber + '">' +
                    '<h3> Call Office </h3>' +
                    '<p>' + value.OfficeNumber + '</p>' +
                  '</a>' +
                '</li>' +
                '<li>' +
                  '<a href="tel:' + value.OfficeNumber + '">' +
                    '<h3> Call Cell </h3>' +
                    '<p>' + value.CellNumber + '</p>' +
                  '</a>' +
                '</li>' 
              );
              $('#detail').listview();
            } //end if function
          });
        }); 
        }
      });//close ajax call 
  }); //end haschange
  
  $('body').on("click", "a", ".view-manager", function(e){
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
        var manager;
        var reportsToNumMgr;
        var mgrNum;
        var mgrReportsTo;
        
        // Used to load manager details on screen
        reportsToNumMgr = response.employees[idNumber-1].ReportsTo;
        
        
        // Used to load managers manager name and number
        mgrNum = response.employees[reportsToNumMgr-1].ReportsTo-1;
        
        if(response.employees[mgrNum] === undefined){
          mgrReportsTo = "I'm the Boss!";
        } else mgrReportsTo = response.employees[mgrNum].Name;
        
        var retrievedSubordinates = JSON.parse(localStorage.getItem("subordinates"));
        $.each(response, function(){
          
          $.each(this, function(key, value){
            if(value.ID == reportsToNumMgr){
              $('#head-shot').html(
                '<img src="' + value.ImagePath + '">' +
                '<h3>' + value.Name + '</h3>' +
                '<p>' + value.Title + '</p>' +
                '<div class="clr" id="break"></div>'
              );
              $('#break').html('<ul data-role="listview" data-inset="true" id="detail"></ul>');
              $('#detail').html(
                '<li>' +
                    '<a href="#" class="view-manager" id="' + mgrNum + '">' +
                    '<h3> View Manager </h3>' +
                    '<p>' + mgrReportsTo + '</p>' +
                  '</a>' +
                '</li>' +
                '<li>' +
                  '<a href="' + '#reports' + '">' +
                    '<h3> View Direct Reports </h3>' +
                     '<p>' + retrievedSubordinates[value.ID-1] + '</p>' +
                  '</a>' +
                '</li>' +
                '<li>' +
                  '<a href="tel:' + value.OfficeNumber + '">' +
                    '<h3> Call Office </h3>' +
                    '<p>' + value.OfficeNumber + '</p>' +
                  '</a>' +
                '</li>' +
                '<li>' +
                  '<a href="tel:' + value.OfficeNumber + '">' +
                    '<h3> Call Cell </h3>' +
                    '<p>' + value.CellNumber + '</p>' +
                  '</a>' +
                '</li>' 
              );
              $('#detail').listview();
            } //end if function
          });
        }); 
        }
      });//close ajax call 
  }); //end onclick    
}); //end ready   
        