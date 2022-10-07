$(function() {
   //Get 
   $('#get-button').on('click', function() {
        //TODO: get all users' IDs & display it
        $.ajax({
          // will display for "Get Users"
          url: '/tweets',
          contentType: 'application/json',
          success: function(response) {
            var tbodyEl = $('#namebody');

            tbodyEl.html('');
            // iterate through the global variable from back end(express) to get user current info
            response.tweetinfo.forEach(function(userID){
              tbodyEl.append('\
              <tr>\
                            <td class="id">' + userID.user.id + '</td>\
                            <td class="id">' + userID.user.screen_name + '</td>\
                            <td class="id">' + userID.user.name + '</td>\
                           </tr>\
                    ');
            });
          }
        });
    });


    //Get tweets
    $('#get-tweets-button').on('click', function(){
        //TODO: get tweet info and display it
        // "Get Tweets" button
        $.ajax({
          url: '/tweetinfo',
          contentType: 'application/json',
          success: function(response) {
            var tbodyEl = $('#tweetbody');

            tbodyEl.html('');
            // iterate through to get user info from the global variable on the response side and show
            // by calling elements form the html
            response.tweetinfo.forEach(function(userID){
              tbodyEl.append('\
              <tr>\
                            <td class="id">' + userID.id + '</td>\
                            <td class="id">' + userID.text+ '</td>\
                            <td class="id">' + userID.created_at + '</td>\
                        </tr>\
                    ');
            });
          }
        });
    });

    //Get searched tweets
    $('#get-searched-tweets').on('click', function() {
      
        //TODO: get a searched tweet(s) & display it
        // "Recently Searched" button
        $.ajax({
          url: '/searchinfo',
          contentType: 'application/json',
          // get the array of all the recently searched tweets from 'post' search
          success: function(response) {
            var tbodyEl = $('#searchbody');

            tbodyEl.html('');
            // look through the other global var from the app.post method everytime search is used
           response.searchinfo.forEach(function(userID){
              tbodyEl.append('\
              <tr>\
                            <td class="id">' + userID.id + '</td>\
                            <td class="id">' + userID.text+ '</td>\
                            <td class="id">' + userID.created_at + '</td>\
                        </tr>\
                    ');
           });
          }
        });
       
    });


  //CREATE
  $('#create-form').on('submit', function(event){
        event.preventDefault();

        var createInput = $('#create-input');
        var inputString = createInput.val();

        const parsedStrings = inputString.split(';');
        // split according to id and text
    
        var id = parsedStrings[0];
        var name = parsedStrings[1];

        //TODO: create a tweet
        $.ajax({
          url: '/tweetinfo',
          method: 'POST',
          contentType: 'application/json',
          // send the server info based on what was given by user and assign front vars to back vars
          data: JSON.stringify({id:id, name:name}),
          
          success: function(response) {
            console.log(response);
            createInput.val('');
            $('#get-button').click();
          }
        });
  });

    //Display searched tweets
  $('#search-form').on('submit', function(event){
    event.preventDefault();
    var userID = $('#search-input').val();
    
    //TODO: search a tweet and display it.
    // use searchbody
    $.ajax({
      url: '/searchinfo',
      method: 'POST',
      contentType: 'application/json',
      // ask the back end to look for the id based on what was given
      data:JSON.stringify({id:userID}),
      success: function(response) {
        var tbodyEl = $('#searchbody');

        tbodyEl.html('');

        //console.log(response)

        //response.tweetinfo.forEach(function(userID){
          tbodyEl.append('\
              <tr>\
                            <td class="id">' + response.id + '</td>\
                            <td class="id">' + response.text+ '</td>\
                            <td class="id">' + response.created_at + '</td>\
                        </tr>\
                    ');
       // });
      }
    })

  });

  //UPDATE/PUT
  $("#update-user").on('submit', function(event){
      event.preventDefault();
    var updateInput = $('#update-input');
    var inputString = updateInput.val();

    const parsedStrings = inputString.split(';');

    var nm = parsedStrings[0];
    var newName = parsedStrings[1];
    
    //TODO: update a tweet
      $.ajax({
        url:'/tweets/' + nm,
        method: 'PUT',
        contentType: 'application/json',
        // get the new name and assign it where wanted
        data: JSON.stringify({newName: newName}),
        success: function(response) {
          console.log(response);
          $('#get-button').click();
        }
      });
  });


  //DELETE
  $("#delete-form").on('submit', function() {
    var id = $('#delete-input').val();
    event.preventDefault();

    //TODO: delete a tweet
    // given id, delete the tweet from the global variable
    $.ajax({
      url: '/tweetinfo/' + id,
      method: 'DELETE',
      contentType: 'application/json',
      success: function(response){
        console.log(response);
        $('#get-button').click();
      }
    });
  });


});


                    
   