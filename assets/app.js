$(function(){

  var api_url = "https://jenelleandzeke.firebaseio.com/attendees.json"

  // Dump responses on the responses page
  if ($("#responses").length) {
    $.ajax({
      type: "GET",
      url: api_url,
      success: function(data) {

        console.log("done")

        var responses = Object.keys(data).map(function(key){
          return data[key];
        })

        console.log(responses)

        var attending = responses.filter(function(response){
          return response.attending === "yes"
        })

        var not_attending = responses.filter(function(response){
          return response.attending === "no"
        })

        var guest_count = 0
        attending.forEach(function(a){
          guest_count += Number(a.guests)
        })
        $("#guest_count").text(guest_count)

        attending.forEach(function(response){
          $("#attending").append(
            "<p><b>" + response.name + " (" + response.guests + ")</b> " + response.talents + " </p>"
          )
        })

        not_attending.forEach(function(response){
          $("#not_attending").append(
            "<p><b>" + response.name + " (" + response.guests + ")</b> " + response.talents + " </p>"
          )
        })

      }
    })
  }

  // Pre-fill form if visitor already RSVP'd
  var existing = store.get('rsvp')
  if (existing) {
    $("#rsvp-name").val(store.get('rsvp').name)
    $("#rsvp-attending-no").prop("checked", existing.attending === "no")
    $("#rsvp-guests").val(existing.guests)
    $("#rsvp-talents").val(existing.talents)
  }

  // Handle form submissions
  $("form.rsvp").submit(function(e){

    // Munge form values into an objects
    var rsvp = {}
    $.each($('form.rsvp').serializeArray(), function(i, field) {
      rsvp[field.name] = field.value;
    });

    if (!rsvp.name) {
      alert("Please fill out your name")
      return false;
    }

    // Save rsvp to localStorage
    store.set("rsvp", rsvp)

    // Save rsvp to Firebase
    $.ajax({
      type: "POST",
      url: api_url,
      data: JSON.stringify(rsvp),
      success: function(data) {
        if (rsvp.attending === "yes") {
          $(".form-result-happy").slideDown()
          $(".form-result-sad").hide()
        } else {
          $(".form-result-happy").hide()
          $(".form-result-sad").slideDown()
        }
      }
    })

    // Prevent form submission from redirecting the page
    return false
  })

})
