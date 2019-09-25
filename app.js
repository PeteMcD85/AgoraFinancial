$(document).ready(function() {
  let today = new Date(),
    // newdate = today right this second
    newdate = new Date();
  // add 5 days to newdate
  newdate.setDate(today.getDate() + 5);
  // midnight 5th day after newdate
  newdate.setHours(0, 0, 0, 0);
  // newdate is now our deadline date
  let deadline = newdate;
  // creating function with an argument endtime to calculate time ramaining
  function getTimeRemaining(endtime) {
    // t holds the remaing time until the deadline
    let t = Date.parse(endtime) - Date.parse(new Date()),
      // converting milliseconds remaining to seconds
      seconds = Math.floor((t / 1000) % 60),
      // converting milliseconds remaining for minutes to minutes
      minutes = Math.floor((t / 1000 / 60) % 60),
      // converting milliseconds remaining for hours to hours
      hours = Math.floor((t / (1000 * 60 * 60)) % 24),
      // converting milliseconds remaining for days to days
      days = Math.floor(t / (1000 * 60 * 60 * 24));
    //returning the data as reusable objects
    return {
      total: t,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds
    };
  }

  // function that outputs clock data inside our html DIV
  function initializeClock(id, endtime) {
    // variable that stores reference of our clock
    let clock = document.getElementById(id),
      // setInterval function executes  anonymous function every second
      timeinterval = setInterval(function() {
        // t is equal to the getTimeRemaining function counting down
        let t = getTimeRemaining(endtime);
        // displaying function in Div
        clock.innerHTML = `
         <table class="timer">
            <tr>
              <td>${t.days}</td>
              <td>${t.hours} : </td>
              <td>${t.minutes} : </td>
              <td>${t.seconds}</td>
            </tr>
            <tr>
              <th>Days</th>
              <th>Hours</th>
              <th>Minutes</th>
              <th>Seconds</th>
            </tr>
          </table>
          `;
        // if time is less then or equal to 0 clearInterval
        if (t.total <= 0) {
          clearInterval(timeinterval);
        }
        // setting interval to 1000 milliseconds/ 1 second
      }, 1000);
  }
  // calling the function initializeClock with the two arguments
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

  //storing register reserve buttons in variable
  let registerReserveButtons = $(".register-reserve-button");
  // click function for buttons
  registerReserveButtons.click(function() {
    //checking to see if first check box is checked and storing it in variable
    let checkboxValue = newsLetterCheckBoxes[0].checked;
    // if check box not check Alert ELSE
    if (!checkboxValue) {
      alert("Check the Checkbox before proceeding.");
    } else {
      // else create ajax call to URL given
      $.ajax({
        url:
          "https://bl45immth4.execute-api.us-east-1.amazonaws.com/production/",

        success: function(result) {
          let body = JSON.parse(result.body),
            submitOkMessage = body.submitok,
            submitOkDivs = $(".submit-ok");
          submitOkDivs.each(function() {
            $(this).html(submitOkMessage);
          });
        }
      });
    }
  });
}); // end of doc Ready
