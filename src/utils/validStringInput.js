export function validStringInput(event, type, setValue, setError){
    const regex = type === "text" ? /[^a-zA-ZÀ-ÿ\-']/g : /[^a-zA-ZÀ-ÿ\-']/g
    const errorMessage = type === "text" ? "Text looks invalid." : "Email adress looks invalid."
    const value = event.target.value
    const input = event.target
    const inputWrapper = event.target.parentNode
    if(value.match(regex) || value.length === 0){
        input.classList.add("error")
        inputWrapper.classList.add("errorField")
        const errorFlag = document.createElement("span")
        errorFlag.classList.add("error-flag")
        errorFlag.textContent = errorMessage
        inputWrapper.append(errorFlag)
        setError((current) => current + 1)
    } else {
        if(inputWrapper.querySelector(".error-flag")){inputWrapper.querySelector(".error-flag").remove()}
        inputWrapper.classList.remove("errorField")
        input.classList.remove("error")
        setError((current) => current - 1)
        setValue(value)
    }
}