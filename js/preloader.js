(function(){
    var loader = document.getElementById("preloader");
    var headerBar = document.getElementsByClassName("header-bar")[0];
    console.log(loader);
    
    window.onload = function(){
        loader.classList.add("hide-me");
    };

})();
