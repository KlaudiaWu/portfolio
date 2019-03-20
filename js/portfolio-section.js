(function() {


    var elem = Array.from(document.getElementsByClassName("project"));
    var nextSection = document.getElementsByClassName("about-me-section");

    console.log("Tablica: " + elem);



// scroll bound animation !!!


    var offTop;
    ticking = false;
    offTop = elem[0].getBoundingClientRect().top; //Pierwszy element triggeruje rozpoczęcie scrolla horyzontalnego


    window.onscroll = function() {
        offTop = elem[0].getBoundingClientRect().top; //Pierwszy element triggeruje rozpoczęcie scrolla horyzontalnego


        if(offTop <= 0) {
            document.body.style.overflowY = "hidden";
        }

    };

    var somePixels = 0;
    window.onwheel = function(e) {
        
        if(e.deltaY > 0) {
            somePixels += 5;
            console.log("trochę tak do przodu " + somePixels);
        } else {
            somePixels -= 5;
            console.log("trochę tak do tyłu " + somePixels);
        }
        
        requestTick();
    };

    function requestTick() {
        if(!ticking) {
            requestAnimationFrame(horizontalScroll);
        }
        ticking = true;
    }

    function horizontalScroll () {
        
        // reset the tick so we can
	    // capture the next onScroll
	    ticking = false;


        //console.log(offTop);

        offTop = elem[0].getBoundingClientRect().top; //Pierwszy element triggeruje rozpoczęcie scrolla horyzontalnego

        if(offTop <= 0) {

            
            var currentScrollY = somePixels;
            elem[0].style.transform = "translateX(" + - currentScrollY + "px)";
            var offLeft = elem[0].getBoundingClientRect().left;

            if(elem[0].getBoundingClientRect().right === elem[1].getBoundingClientRect().left) {
                //Musisz jakoś zresetować wartość currentScrollY
                elem[1].style.transform = "translateX(" + - currentScrollY + "px)";
            }

            //for(i = 0; i <= elem.length; i++) {

                //console.log("Lewa krawędź: " + elem[i+1].getBoundingClientRect().left);
                //console.log("Prawa krawędź: " + elem[i].getBoundingClientRect().right);
                //console.log("Pokaż mi mój element " + elem[i]);

            //}
        }


        requestAnimationFrame(horizontalScroll);
        // https://www.html5rocks.com/en/tutorials/speed/animations/

    }


})(); 