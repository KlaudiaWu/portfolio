(function () {


    var elem = Array.from(document.getElementsByClassName("project"));
    var furtherElem = Array.from(document.getElementsByClassName("after-slider"));
    elem = elem.concat(furtherElem);

    console.log(furtherElem);

    var width = window.width;
    var offsetLeft = parseInt(getComputedStyle(elem[1]).left);
    var elemWidth = parseInt(getComputedStyle(elem[0]).width);
    var toMove = (elemWidth - offsetLeft);
    console.log(toMove);
    // var controlValues = new Array(elem.length).fill({
    //     width: 0,
    //     left: 0,
    //     right: 0
    // });
    // for (i = 0; i < elem.length; i++) {
    //     var style = getComputedStyle(elem[i]);
    //     controlValues[i].left = style.left;
    //     controlValues[i].width = style.width
    // }

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
            ticking = true;
            requestAnimationFrame(horizontalScroll);
        }
    }

    function horizontalScroll() {


        offTop = elem[0].getBoundingClientRect().top; //Pierwszy element triggeruje rozpoczęcie scrolla horyzontalnego
        stap:
        if (offTop <= 0) {
            for (i = 0; i < elem.length; i++) {
                var currentScrollY = requestOffsetValue(i);

                if (i === elem.length - 1) {
                    break;
                }
                for (j = 1; j <= globalMove; j++) {
                    //Warunek, jeżeli element jest przedostatni
                    if (i === offsetValues.length - 2 && offsetValues[i] > 0) {
                        elem[i].style.transform = "translateX(" + -currentScrollY + "px)";
                        elem[i+1].style.transform = "translateX(" + -currentScrollY + "px)";
                        console.log(getComputedStyle(furtherElem.style.left));
                        //if (getComputedStyle(furtherElem.style.left) === 0) {
                        //   console.log("Dupa");
                        //}
                        break;
                    } else if (offsetValues[i] >= (toMove - globalMove)  ) {
                        count(i + 1);
                        elem[i].style.transform = "translateX(" + -currentScrollY + "px)";
                        break;
                    } else {
                        elem[i].style.transform = "translateX(" + -currentScrollY + "px)";
                    }
                }
            }
        }

        ticking = false;

        // https://www.html5rocks.com/en/tutorials/speed/animations/

    }

})();