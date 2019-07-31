// 1. Check if inputs are not empty
// 2. Check if email is correct
// 3. Check if re-captcha return true
// 4. Send information

//Dla poprawnego działania, elemsenty, które mają być 
//sprawdzone powinny zawierać klasę check lub re-captcha-response

var form = document.getElementById("contact-form");
var errorMessage = document.getElementById("error-message");
var successMessage = document.getElementById("success-message");
var recaptcha = document.getElementById("captcha");

var toCheck = Array.from(form);

var elems = [];
var email = '';

var validation = {
    createListToCheck: function() {
        for(i=0; i<toCheck.length; i++) {
            if(toCheck[i].classList.contains("check")){
            elems.push(toCheck[i]);
            }
            if(toCheck[i].classList.contains("email")){
                email = toCheck[i].value;
            }
        }
        return elems, email;
    },
    showErrorMessage: function() {
        errorMessage.style.display = "block";
    },
    showSuccessMessage: function() {
        successMessage.style.display = "block";
    },
    checkIfEmpty: function() {
        //Check recaptcha
        for(i=0; i<elems.length; i++){
            if (elems[i].value === '' || elems[i].value === elems[i].defaultValue) {
                this.showErrorMessage();
                return false;
            }
        }
        if(recaptcha.value === '') {
            this.showErrorMessage();
            return false;
        }
    },
    emailValidation: function(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        console.log(re.test(email));
        if (re.test(String(email).toLowerCase()) === false ) {
            this.showErrorMessage();
            return false;
        }
    },
    validate: function() {
        this.createListToCheck();
        console.log(elems);
        this.checkIfEmpty();
        console.log(email)
        this.emailValidation(email);

    }

}

function sendEmail(e){
    var data = {};
    [].forEach.call(elems, function(elem){
        data[elem.name] = elem.value;
    });
    
    AJAX({
        type: form.getAttribute("method"),
        url: form.getAttribute("action"),
        data: data,
        success: function(resp, xhr) {
            var response = JSON.parse(resp);
            if("error" in response) {
                validation.showErrorMessage();
            } else if ("success" in response) {
                validation.showSuccessMessage();
                form.parentNode.removeChild(form);
            }
        }
    });
}

form.addEventListener("submit", function validateAndSend(e) {
    e.preventDefault();
    validation.validate();
    
    sendEmail();
});