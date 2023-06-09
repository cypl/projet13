/**
 * Watch/validate the content of an input field (text or email)
 * and display an htmm element when the content isn't valid. 
 * @param {Event} event - when function is called (could be onChange, onClick…)
 * @param {String} type - the type of input : "text" or "email"
 * @param {Function} setValue - can be user as a setter in a state
 * @param {Function} setError - can be user as a setter in a state
 */
export function validStringInput(event, type, setValue, setError){
    const regex = type === "text" ? /[^a-zA-ZÀ-ÿ\-']/g : /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/   // "text" or "email"
    const errorMessage = type === "text" ? "Text input looks invalid." : "Email address looks invalid."
    const value = event.target.value
    const input = event.target
    const inputWrapper = event.target.parentNode

    function createErrorFlag(input, inputWrapper, errorMessage){
        input.classList.add("error")
        inputWrapper.classList.add("errorField")
        const errorFlag = document.createElement("span")
        errorFlag.classList.add("error-flag")
        errorFlag.textContent = errorMessage
        inputWrapper.append(errorFlag)
    }
    function removeErrorFlag(input, inputWrapper){
        if(inputWrapper.querySelector(".error-flag")){inputWrapper.querySelector(".error-flag").remove()}
        inputWrapper.classList.remove("errorField")
        input.classList.remove("error")
    }

    if(value.match(regex)){
        createErrorFlag(input, inputWrapper, errorMessage)
        setError((current) => current >= 0 && current + 1)
    } else if (value.length === 0) {
        createErrorFlag(input, inputWrapper, "Input field looks empty.")
        setError((current) => current >= 0 && current + 1)
    } else {
        removeErrorFlag(input, inputWrapper)
        setError((current) => current >= 0 && current - 1)
        setValue(value)
    }
}