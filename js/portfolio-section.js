(function () {


    var elem = Array.from(document.getElementsByClassName("project"));
    var nextSection = document.getElementsByClassName("about-me-section");

    console.log("Tablica: " + elem);
    var offsetValues = new Array(elem.length).fill(0);
    console.log(offsetValues);



    // scroll bound animation !!!


    var offTop;
    ticking = false;
    offTop = elem[0].getBoundingClientRect().top; //Pierwszy element triggeruje rozpoczęcie scrolla horyzontalnego

    window.onscroll = function () {
        offTop = elem[0].getBoundingClientRect().top; //Pierwszy element triggeruje rozpoczęcie scrolla horyzontalnego
        if (offTop <= 0) {
            document.body.style.overflowY = "hidden";
        }

    };
    var start = 0;
    var index = 0;
    var globalMove = 15;
    var change = 0;

    count(0);

    function count(index) {
        index = index;
        window.onwheel = function (e) {
            console.log(start++);
            if (e.deltaY > 0) {
                for (i = 0; i < index + 1; i++) {
                    offsetValues[i] += globalMove;
                }
                console.log("trochę tak do przodu " + offsetValues[index]);
            } else {
                for (i = 0; i < index + 1; i++) {
                    offsetValues[i] -= globalMove;
                }
                console.log("trochę tak do tyłu " + offsetValues[index]);
            }

            requestTick();
        };
    }

    function requestOffsetValue(index) {
        return offsetValues[index];
    }

    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(horizontalScroll);
        }
    }

    var setActive = false;

    function horizontalScroll() {

        // reset the tick so we can
        // capture the next onScroll

        //console.log(offTop);

        offTop = elem[0].getBoundingClientRect().top; //Pierwszy element triggeruje rozpoczęcie scrolla horyzontalnego
        if (offTop <= 0) {

            for (i = 0; i < elem.length; i++) {
                //Muszę ozmaczyć element aktywny
                var currentScrollY = requestOffsetValue(i);

                for (j = 1; j <= globalMove; j++) {
                    if (elem[i].getBoundingClientRect().right <= (elem[i + 1].getBoundingClientRect().left + j)) {
                        count(i + 1);
                        break;
                    } else {
                        elem[i].style.transform = "translateX(" + -currentScrollY + "px)";
                    }
                }
            }
        }

        ticking = false;

        // requestAnimationFrame(horizontalScroll);
        // https://www.html5rocks.com/en/tutorials/speed/animations/

    }

    function addClass(el, className) {
        if (el.classList)
            el.classList.add(className);
        else if (!hasClass(el, className))
            el.className += " " + className;
    }

    function hasClass(el, className) {
        if (el.classList)
            return el.classList.contains(className);
        return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
    }

    function removeClass(el, className) {
        if (el.classList)
            el.classList.remove(className);
        else if (hasClass(el, className)) {
            var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
            el.className = el.className.replace(reg, ' ');
        }
    }


})();