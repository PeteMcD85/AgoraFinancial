$(document).ready(function() {
  // stored current date and time
  let today = new Date(),
    // stored 5 days from current date and time midnight
    newdate = new Date();
  newdate.setDate(today.getDate() + 5);
  newdate.setHours(0, 0, 0, 0);
  let deadline = newdate;
  function getTimeRemaining(endtime) {
    let t = Date.parse(endtime) - Date.parse(new Date()),
      seconds = Math.floor((t / 1000) % 60),
      minutes = Math.floor((t / 1000 / 60) % 60),
      hours = Math.floor((t / (1000 * 60 * 60)) % 24),
      days = Math.floor(t / (1000 * 60 * 60 * 24));
    return {
      total: t,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds
    };
  }

  function initializeClock(id, endtime) {
    let clock = document.getElementById(id),
      timeinterval = setInterval(function() {
        let t = getTimeRemaining(endtime);
        clock.innerHTML =
          "days: " +
          t.days +
          "<br>" +
          "hours: " +
          t.hours +
          "<br>" +
          "minutes: " +
          t.minutes +
          "<br>" +
          "seconds: " +
          t.seconds;
        if (t.total <= 0) {
          clearInterval(timeinterval);
        }
      }, 1000);
  }
  initializeClock("clockdiv", deadline);

  // Stores Newsletter Checkboxes
  let newsLetterCheckBoxes = $(".newsletter-checkbox");
  // Created Click Function For Newsletter Checkboxes
  newsLetterCheckBoxes.click(function() {
    // Stores the Clicked Checkbox Value (checked = true, unchecked = false)
    let checkboxValue = this.checked;
    // Iterates through each Newsletter checkbox
    newsLetterCheckBoxes.each(function() {
      // Update checked value to equal the clicked check box value
      this.checked = checkboxValue;
    });
  });

  let registerReserveButtons = $(".register-reserve-button");

  registerReserveButtons.click(function() {
    let checkboxValue = newsLetterCheckBoxes[0].checked;
    if (!checkboxValue) {
      alert("Check the Checkbox before proceeding.");
    } else {
      $.ajax({
        url:
          "https://bl45immth4.execute-api.us-east-1.amazonaws.com/production/",
        success: function(result) {
          let body = JSON.parse(result.body),
            submitOkMessage = body.submitok,
            submitOkDivs = $(".submit-ok");
          console.log(submitOkMessage);
          console.log(submitOkDivs);
          submitOkDivs.each(function() {
            $(this).html(submitOkMessage);
          });
        }
      });
    }
  });
}); // end of doc Ready
