$(function(){

  var url = "https://jenelleandzeke.firebaseio.com/attendees.json"

  $("form.rsvp").submit(function(e){

    var response = {};
    $.each($('form.rsvp').serializeArray(), function(i, field) {
      response[field.name] = field.value;
      if (field.value) {
        store.set(field.name, field.value);
      }
    });

    if (!response.name) {
      alert("Please provide your name")
      return false;
    }

    console.log(response)

    $.ajax({
      type: "POST",
      url: url,
      data: JSON.stringify(response),
      success: function(s) {
        console.log("s", s)
      }
    });

    return false;
  })


})
