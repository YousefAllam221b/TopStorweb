var ShowPasswordTogglePass = document.querySelector("#pass");
ShowPasswordTogglePass.onclick = function() {
    document.querySelector("#pass").classList.add("input-password");
    document.getElementById("toggle-password-pass").classList.remove("d-none");
    const passwordInputPass = document.querySelector("#pass");
    const togglePasswordButtonPass = document.getElementById("toggle-password-pass");
    togglePasswordButtonPass.addEventListener("click", togglePassword);
    function togglePassword() {
        if (passwordInputPass.type === "password") {
            passwordInputPass.type = "text";
            togglePasswordButtonPass.setAttribute("aria-label", "Hide password.")
        } else {
            passwordInputPass.type = "password";
            togglePasswordButtonPass.setAttribute("aria-label", "Show password as plain text.")
        }
    }
};

var ShowPasswordToggleNewpass = document.querySelector("#newpass");
ShowPasswordToggleNewpass.onclick = function() {
    document.querySelector("#newpass").classList.add("input-password");
    document.getElementById("toggle-password-newpass").classList.remove("d-none");
    const passwordInputNewpass = document.querySelector("#newpass");
    const togglePasswordButtonNewpass = document.getElementById("toggle-password-newpass");
    togglePasswordButtonNewpass.addEventListener("click", togglePassword);
    function togglePassword() {
        if (passwordInputNewpass.type === "password") {
            passwordInputNewpass.type = "text";
            togglePasswordButtonNewpass.setAttribute("aria-label", "Hide password.")
        } else {
            passwordInputNewpass.type = "password";
            togglePasswordButtonNewpass.setAttribute("aria-label", "Show password as plain text. " + "Warning: this will display your password on the screen.")
        }
    }
};
