(function () {

    //odległość od góry do dołu dokumentu potrzena do zakończenia skryptu
    console.log("DUUUUUUUUPA" + window.scrollY + window.innerHeight);

    var sliderWrapper = document.getElementsByClassName("slider-wrapper");
    var elem = Array.from(document.getElementsByClassName("project"));
    var furtherElem = Array.from(document.getElementsByClassName("after-slider"));
    var scrollDifference = parseInt((getComputedStyle(furtherElem[0]).height)) - parseInt(window.innerHeight);

    elem = elem.concat(furtherElem);

    var scrollWidth = 0;
    for (i = 0; i < elem.length; i++) {
        elem[i].style.height = getComputedStyle(elem[i]).height;
        elem[i].style.width = getComputedStyle(elem[i]).width;
        scrollWidth += parseInt(getComputedStyle(elem[i]).height);
    }
    scrollWidth = scrollWidth + "px";

    console.log("Ta wartość powinna być taka jak kolejna: " + scrollWidth);
    console.log("3.5 ekranu to: " + 3.5 * window.innerWidth);

    var scrollPath = document.getElementsByClassName("scroll-container");
    scrollPath[0].style.height = scrollWidth;


    var width = window.width;
    var offsetLeft = parseInt(getComputedStyle(elem[1]).left);
    var elemWidth = parseInt(getComputedStyle(elem[0]).width);
    var toMove = (elemWidth - offsetLeft);
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

    var start = 0;
    var index = 0;
    var change = 0;
    var globalMove = 0;
    var prevScroll = 0;

    var wrapper = {
        obj: sliderWrapper[0],
        fixed: function () {
            this.obj.setAttribute('style', 'position: fixed; top: 0; left: 0;');
        },
        relative: function () {
            this.obj.setAttribute('style', 'position: relative;');
        },
        absolute: function () {
            this.obj.setAttribute('style', 'position: absolute; bottom: 0;');
        },
        style: function () {
            if (this.computedStyle === undefined) {
                this.computedStyle = getComputedStyle(this.obj);
            }
            return this.computedStyle;
        },
        computedStyle: undefined
    };


    function count(index) {
        index = index;
        window.onscroll = function (e) {
            offTop = scrollPath[0].getBoundingClientRect().top; //Pierwszy element triggeruje rozpoczęcie scrolla horyzontalnego
            //Muszę znaleźć odległość, która zostanie do zeskrolowania po wyłączeniu fixed na elemencie futherElem
            offBottom = scrollPath[0].getBoundingClientRect().bottom;
            if (offTop <= 0) {
                wrapper.fixed();

                for (i = 0; i < index + 1; i++) {
                    setOffsetValue(i, globalMove);
                }
            } else if (offTop > 0) {
                wrapper.relative();
            } else if (offTop <= 0 && scrollDifference === (window.scrollY) + (window.innerHeight)) {
                wrapper.absolute();

            }

            // console.log(offTop);
            // console.log(window.scrollY);


            globalMove = window.scrollY - prevScroll;
            prevScroll = window.scrollY;

            requestTick();
        };
    }

    count(0);

    function setOffsetValue(index, value) {
        offsetValues[index] += value;
    }

    function getOffsetValue(index) {
        return offsetValues[index];
    }

    function requestTick() {
        if (!ticking) {
            ticking = true;
            requestAnimationFrame(horizontalScroll);
        }
    }

    function horizontalScroll() {

        if (offTop <= 0) {
            for (i = 0; i < elem.length; i++) {
                var currentScrollY = getOffsetValue(i);

                // console.log(offsetValues);
                // console.log(currentScrollY + " - " + parseInt(window.innerWidth));
                if (i === elem.length - 2 && currentScrollY >= parseInt(window.innerWidth)) {
                    wrapper.absolute();
                    break;
                }

                console.log(i + '-' + currentScrollY);
                elem[i].style.transform = "translateX(" + -currentScrollY + "px)";
                //Warunek, jeżeli element jest przedostatni
                if (i === offsetValues.length - 2 && currentScrollY > 0) {
                    elem[i + 1].style.transform = "translateX(" + -currentScrollY + "px)";
                    count(i + 1);
                    break;

                } else if (currentScrollY >= (toMove - globalMove)) {
                    count(i + 1);
                }


            }
        }

        ticking = false;

        // https://www.html5rocks.com/en/tutorials/speed/animations/

    }

})();