
export var verifyEmail = (email) => {
  var regexEmail = /^.+@.+\..+$/;
  if (regexEmail.test(email)){
    return true;
  } else {
    return false;
  }
};
