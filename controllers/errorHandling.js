
const handleSignupError = (allErrors) => {
  // validation errors
  let errorsList = { name: '', email: '', password: '', repeatPassword: '' };

  if (allErrors.message === "repeatPasswordError") {
        errorsList.repeatPassword = "Repeated password is not the same"
  }

  if (allErrors.code === 11000) {
    errorsList.email = "Email is already taken."
    return errorsList;
  }

  if (allErrors.message.includes('User validation failed')) {
    Object.values(allErrors.errors).forEach(({ properties }) => {
        errorsList[properties.path] = properties.message;
    });
  }
  return errorsList
}

const handleQuestionsError = (allErrors)=>{
  let errorsList = { question: '', description: '' };

  if (allErrors.message.includes('Question validation failed')) {
    Object.values(allErrors.errors).forEach(({ properties }) => {
        errorsList[properties.path] = properties.message;
    });
  }
  return errorsList
}
  


module.exports = {handleSignupError,handleQuestionsError}
