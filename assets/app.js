$(function(){

  var api_url = "https://jenelleandzeke.firebaseio.com/attendees.json"
  var existing = store.get('rsvp')

  // Pre-fill form if visitor already RSVP'd
  if (existing) {
    $("#rsvp-name").val(store.get('rsvp').name)
    $("#rsvp-attending-no").prop("checked", existing.attending === "no")
    $("#rsvp-guests").val(existing.guests)
    $("#rsvp-talents").val(existing.talents)
  }

  $("form.rsvp").submit(function(e){

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

    // Prevent the form submission from redirecting the page
    return false
  })


})
