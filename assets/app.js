$(function(){

  var api_url = "https://jenelleandzeke.firebaseio.com/attendees.json"

  // Dump responses on the responses page
  if ($("#responses").length) {
    $.ajax({
      type: "GET",
      url: api_url,
      success: function(responses) {
        // $("#responses").text(JSON.stringify(data, null, 2))
        console.table(responses)
        // Object.keys(responses).forEach(function(key){
        //   var response = responses[key]
        //   $("#responses").append(JSON.stringify(response, null, 2))
        // })
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
        } else {
          $(".form-result-sad").slideDown()
        }
      }
    })

    // Prevent form submission from redirecting the page
    return false
  })

})
