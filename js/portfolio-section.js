(function () {

    

    var sliderWrapper = document.getElementsByClassName("slider-wrapper");
    var elem = Array.from(document.getElementsByClassName("project"));
    var furtherElem = Array.from(document.getElementsByClassName("after-slider"));
    elem = elem.concat(furtherElem);

    var scrollWidth = 0;
    for (i = 0; i < elem.length; i++) {
        console.log(getComputedStyle(elem[i]).height);
        elem[i].style.height = getComputedStyle(elem[i]).height;
        elem[i].style.width = getComputedStyle(elem[i]).width;
       scrollWidth += parseInt(getComputedStyle(elem[i]).width);
    }
    scrollWidth = scrollWidth + "px";

    var scrollPath = document.getElementsByClassName("scroll-container");
    scrollPath[0].style.height = scrollWidth;

    console.log(getComputedStyle(scrollPath[0]).height);
    console.log(scrollWidth);

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

    window.onscroll = function () {

    };
    var start = 0;
    var index = 0;
    var globalMove = 0;
    var change = 0;
    var prevScroll = 0;

    count(0);

    function count(index) {
        index = index;
        window.onscroll = function (e) {
            offTop = scrollPath[0].getBoundingClientRect().top; //Pierwszy element triggeruje rozpoczęcie scrolla horyzontalnego
            if (offTop <= 0) {
                sliderWrapper[0].style.height = getComputedStyle(sliderWrapper[0]).height;
                sliderWrapper[0].style.width = getComputedStyle(sliderWrapper[0]).width;
                sliderWrapper[0].style.position = "fixed";
                sliderWrapper[0].style.top = 0;
                sliderWrapper[0].style.left = 0;
                for (i = 0; i < index + 1; i++) {
                    offsetValues[i] += globalMove;
                }
            }
            globalMove = window.scrollY - prevScroll;
            prevScroll = window.scrollY;
                
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