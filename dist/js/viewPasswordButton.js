var ShowPasswordToggle = document.querySelector("#pass");
ShowPasswordToggle.onclick = function() {
    document.querySelector("#pass").classList.add("input-password");
    document.getElementById("toggle-password-pass").classList.remove("d-none");
    const passwordInput = document.querySelector("#pass");
    const togglePasswordButton = document.getElementById("toggle-password-pass");
    togglePasswordButton.addEventListener("click", togglePassword);
    function togglePassword() {
        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            togglePasswordButton.setAttribute("aria-label", "Hide password.")
        } else {
            passwordInput.type = "password";
            togglePasswordButton.setAttribute("aria-label", "Show password as plain text. " + "Warning: this will display your password on the screen.")
        }
    }
};
var ShowPasswordToggle = document.querySelector("#newpass");
ShowPasswordToggle.onclick = function() {
    document.querySelector("#newpass").classList.add("input-password");
    document.getElementById("toggle-password-newpass").classList.remove("d-none");
    const passwordInput = document.querySelector("#newpass");
    const togglePasswordButton = document.getElementById("toggle-password-newpass");
    togglePasswordButton.addEventListener("click", togglePassword);
    function togglePassword() {
        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            togglePasswordButton.setAttribute("aria-label", "Hide password.")
        } else {
            passwordInput.type = "password";
            togglePasswordButton.setAttribute("aria-label", "Show password as plain text. " + "Warning: this will display your password on the screen.")
        }
    }
};
