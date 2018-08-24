
$(function() {
  // Get a reference to the root of the chat data.
  let database = firebase.database().ref();

  // When the user presses enter on the message input, write the message to firebase.
  $("#messageInput").keypress(function (e) {
    if (e.keyCode == 13) {
      var name = $("#nameInput").val();
      var text = $("#messageInput").val();
      console.log(text)
      if(text == ""){ return; }
      var curse=["bitch","fuck","asshole","fuckface"]

      for(let word of curse){
        if (text.includes(word)){
          window.alert("No Profanity! Rephrase your message.");
          text = ""
          break
        }
      }
      $("#messageInput").val("");
      database.push({name:name, text:text})
    }
  });

  // Add a callback that is triggered for each chat message.
  database.limitToLast(10).on("child_added", function (snapshot) {
    var message = snapshot.val();
    $("<div/>").text(message.text).prepend($("<em/>")
    .text(message.name + ": ")).appendTo($("#messagesDiv"));
    $("#messagesDiv")[0].scrollTop = $("#messagesDiv")[0].scrollHeight;
  });
})
