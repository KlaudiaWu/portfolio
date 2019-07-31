function captchaCallback (token) {
    document.getElementById("captcha").value = token;
    
    console.log(document.getElementById("g-recaptcha-response").value);
}
