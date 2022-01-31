
const handleSignupError = (allErrors) => {
  // validation errors
  let errorsList = { name: '', email: '', password: '', repeatPassword: '' };

  if (allErrors.message === "repeatPasswordError") {
        errorsList.repeatPassword = "Repeated password is not the same"
  }

  if (allErrors.message.includes('User validation failed')) {
    Object.values(allErrors.errors).forEach(({ properties }) => {
        errorsList[properties.path] = properties.message;
    });
  }
  return errorsList
}

module.exports = {handleSignupError}
