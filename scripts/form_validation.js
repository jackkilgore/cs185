function getEmail() {
  // Selecting the input element and get its value
  var email = document.getElementById('email').value;
  var format = [/\w+@\w+.[edu|com]/];

  var i;
  var is_valid = false;
  for (i = 0; i < format.length; i++) {
    if (email.search(format[i]) != -1) {
      is_valid = true;
      break;
    }
  }
  // Edge case: a.com@jack
  if (!is_valid) {
    document.getElementById("email_message").innerHTML = "Invalid email address.";
    return;
  }
  document.getElementById("email_message").innerHTML = "Email successfully recorded.";
}