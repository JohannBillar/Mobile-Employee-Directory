$(function(){    
  $(window).hashchange(function(e) { 
    var idNumber = sessionStorage.getItem("id-employee-home");
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
        
        var managerName;
        var reportsToNum;
        var reportsToID;
        if(response.employees[idNumber-1] !== undefined){
          reportsToID = response.employees[idNumber-1].ReportsTo;
        }   
        if(response.employees[idNumber-1] !== undefined){
          reportsToNum = response.employees[idNumber-1].ReportsTo-1;
        }        
        if(response.employees[reportsToNum] === undefined){
          managerName = "I'm the Boss!";
        } else managerName = response.employees[reportsToNum].Name;
        var retrievedSubordinates = JSON.parse(localStorage.getItem("subordinates"));
        
        $.each(response, function(){
          $.each(this, function(key, value){
            if(idNumber === value.ID.toString()){
              $('#head-shot').html(
                '<img src="' + value.ImagePath + '">' +
                '<h3>' + value.Name + '</h3>' +
                '<p>' + value.Title + '</p>' +
                '<div class="clr" id="break"></div>'
              );
              $('#break').html('<ul data-role="listview" data-inset="true" id="detail"></ul>');
              $('#detail').html(
                '<li>' +
                    '<a href="#" id="' + reportsToID + '">' +
                    '<h3> View Manager </h3>' +
                    '<p>' + managerName + '</p>' +
                  '</a>' +
                '</li>' +
                '<li>' +
                  '<a href="#reports" id="' + value.ID + '">' +
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
                '</li>' +
                '<li>' +
                  '<a href="mailto:' + value.Email + '" data-role="button">' +
                    '<h3> Email Me </h3>' +
                    '<p>' + value.Email + '</p>' +
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
  
  $('#employee section').on("click", "a", function(e){
    sessionStorage.setItem("id-employee-page", e.currentTarget.id);
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
        var reportsToID = sessionStorage.getItem("id-employee-page");
        var reportsToMgrName;
        var reportsToMgrNum;
        var reportsToMgrID; 
        if(response.employees[reportsToID-1] !== undefined){
          reportsToMgrID = response.employees[reportsToID-1].ReportsTo;
        }
        if(response.employees[reportsToID-1] !== undefined){
          reportsToMgrNum = response.employees[reportsToID-1].ReportsTo-1;
        }        
        if(response.employees[reportsToMgrNum] === undefined){
          reportsToMgrName = "I'm the Boss!";
        } else reportsToMgrName = response.employees[reportsToMgrNum].Name;
        var retrievedSubordinates = JSON.parse(localStorage.getItem("subordinates"));
        
        $.each(response, function(){
          $.each(this, function(key, value){
            if(value.ID == reportsToID){
              $('#head-shot').html(
                '<img src="' + value.ImagePath + '">' +
                '<h3>' + value.Name + '</h3>' +
                '<p>' + value.Title + '</p>' +
                '<div class="clr" id="break"></div>'
              );
              $('#break').html('<ul data-role="listview" data-inset="true" id="detail"></ul>');
              $('#detail').html(
                '<li>' +
                    '<a href="#" id="' + reportsToMgrID + '">' +
                    '<h3> View Manager </h3>' +
                    '<p>' + reportsToMgrName + '</p>' +
                  '</a>' +
                '</li>' +
                '<li>' +
                  '<a href="#reports" id="' + value.ID + '">' +
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
                '</li>' +
                '<li>' +
                  '<a href="mailto:' + value.Email + '" data-role="button">' +
                    '<h3> Email Me </h3>' +
                    '<p>' + value.Email + '</p>' +
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
        