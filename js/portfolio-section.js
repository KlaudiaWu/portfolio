(function () {
    function Container(name) {
        var grabbed = document.getElementsByClassName(name);
        this.object = grabbed[0];
    }

    Container.prototype = {
        bound: function () {
            return this.object.getBoundingClientRect();
        },
        fixed: function () {
            this.object.setAttribute('style', 'position: fixed; top: 0; left: 0;');
        },
        relative: function () {
            this.object.setAttribute('style', 'position: relative;');
        }
    };

    function ScrollElement(index, htmlElement) {
        this.index = index;
        this.htmlElement = htmlElement;
        this.frozen = false;
        this.prev = false;
        this.next = false;
        this.translateX = 0;
        this.cover = 0;
        this.bounds = {
            left: this.bound().left,
            right: this.bound().right,
        };
    }

    ScrollElement.prototype = {
        bound: function () {
            return this.htmlElement.getBoundingClientRect();
        },
        setPrev: function (prev) {
            this.prev = prev;
        },
        getPrev: function () {
            return this.prev;
        },
        setNext: function (next) {
            this.next = next;
        },
        getNext: function () {
            return this.next;
        },
        move: function (distance) {
            this.translateX = distance;
            this.translateY = 0;
            if (this.getNext()) {
                this.getNext().move(this.translateX - this.cover);
            }
            else {
                if (this.translateX >= this.bounds.left) {
                    this.translateX = this.bounds.left;
                    this.translateY = distance - this.bounds.left;
                }
            }
            if (distance > 0) {
                this.htmlElement.style.transform = "translate(" + -this.translateX + "px," + -this.translateY + "px)";
            }
            else {
                this.htmlElement.style.transform = "translate(0px, 0px)";
            }
        }
    };

    function Application(wrapper, path, element_class_list) {
        this.raw = {
            wrapper: new Container(wrapper),
            path: new Container(path),
            elements: new Array
        };
        this.wrapper = this.raw.wrapper;
        this.path = this.raw.path;
        this.elements = new Array;

        for (var name in element_class_list) {
            this.appendElements(element_class_list[name]);
        }

        this.setup();
        this.init();
    }

    Application.prototype = {
        appendElements: function (name) {
            var grabbed = Array.from(document.getElementsByClassName(name));
            this.raw.elements = this.raw.elements.concat(grabbed);
        },
        setup: function () {
            var l = this.raw.elements.length;
            var width = 0;
            var width_dimension = '';
            var prev = false;
            for (i = 0; i < l; i++) {
                item = new ScrollElement(i, this.raw.elements[i]);
                item.setPrev(prev);
                if (item.getPrev()) {
                    item.getPrev().setNext(item);
                }
                this.elements.push(item);
                prev = item;
                (i === l - 1) ? width_dimension = 'height' : width_dimension = 'width'; // short hand if - () ? if true : if false;

                width += parseInt(getComputedStyle(this.raw.elements[i])[width_dimension]);
            }
            this.path.object.style.height = width + 'px';
        },
        init: function () {
            for (var el in this.elements) {
                var element = this.elements[el];
                if (element.getNext()) {
                    element.cover = element.bound().right - element.getNext().bound().left;
                }
            }
            this.firstElement = this.elements[0];
        },
        run: function () {
            var distance = -this.path.bound().top; //pokonany dystans scroll-container (mega scroll)

            if (this.started === undefined) {
                this.started = true;
            }

            if (distance >= 0) {
                this.wrapper.fixed();
                this.firstElement.move(distance);
            } else if (distance < 0) {
                this.wrapper.relative();
                this.firstElement.move(0);
            }
        }
    }



    document.onreadystatechange = () => {
        if (document.readyState === 'complete') {
            var App = new Application(
                "slider-wrapper",
                "scroll-container",
                { 0: "project", 1: "after-slider" }
            );

            window.onscroll = function () {
                App.run();
            };

            window.onresize = function () {
                clearTimeout(timer);
                var timer = setTimeout(function () {
                    window.location.reload();
                }, 500);
            }
        }
    };
})();