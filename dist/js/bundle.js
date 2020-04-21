/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/script.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/parts/calc.js":
/*!******************************!*\
  !*** ./src/js/parts/calc.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

function calc(){
    let persons = document.querySelectorAll('.counter-block-input')[0],
    restDays = document.querySelectorAll('.counter-block-input')[1],
    place = document.getElementById('select'),
    totalValue = document.getElementById('total'),
    personSum = 0,
    daySum = 0,
    total = 0;

    totalValue.innerHTML = 0;

persons.addEventListener('change', function(){
    personSum = +this.value;
    total = personSum*daySum*4000;

    if(restDays.value == ''){
        totalValue.innerHTML = 0;
    }else{
        totalValue.innerHTML = total;
    }
});

restDays.addEventListener('change', function(){
    daySum = +this.value;
    total = personSum*daySum*4000;

    if(persons.value == ''){
        totalValue.innerHTML = 0;
    }else{
        totalValue.innerHTML = total;
    }
});

place.addEventListener('change', function(){
    if(restDays.value == '' || persons.value == ''){
        totalValue.innerHTML = 0;
    }else{
        let a = total;
        totalValue.innerHTML = a * this.options[this.selectedIndex].value;
    }
});
}
module.exports = calc;

/***/ }),

/***/ "./src/js/parts/form.js":
/*!******************************!*\
  !*** ./src/js/parts/form.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

function form(){
    let message ={
        loading: 'Загрузка...',
        success: 'Спасибо, скоро мы свяжемся с вами',
        failure: 'Что-то пошло не так'
    };

    let form = document.querySelector('.main-form'),
        input = form.getElementsByTagName('input'),
        statusMessage = document.createElement('div');

        statusMessage.classList.add('status');

    form.addEventListener('submit', (event)=>{
        event.preventDefault();
        form.appendChild(statusMessage);

        let request = new XMLHttpRequest();
        request.open('POST', 'server.php');
        request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

        let formData = new FormData(form);

        let obj = {};

        formData.forEach((value, key)=>{
            obj[key] = value;
        });

        let json = JSON.stringify(obj);

        request.send(json); 

        request.addEventListener('readystatechange', ()=>{
            if(request.readyState < 4){
                statusMessage.innerHTML = message.loading;
            }else if (request.readyState === 4 && request.status == 200){
                statusMessage.innerHTML = message.success;
            }else{
                statusMessage.innerHTML = message.failure;
            }
        });

        for(let i = 0; i < input.length; i++){
            input[i].value = '';
        }

    });
}
module.exports = form;

/***/ }),

/***/ "./src/js/parts/modalWindow.js":
/*!*************************************!*\
  !*** ./src/js/parts/modalWindow.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function modalWindow(){
    
    let more = document.querySelector('.more'),
        overlay = document.querySelector('.overlay'),
        close = document.querySelector('.popup-close');

    more.addEventListener('click', ()=>{
        overlay.style.display = 'block';
        this.classList.add('more-splash');
        document.body.style.overflow = 'hidden';
    });

    close.addEventListener('click', ()=>{
        overlay.style.display = 'none';
        more.classList.remove('more-splash');
        document.body.style.overflow = '';
    });
}
module.exports = modalWindow;

/***/ }),

/***/ "./src/js/parts/slider.js":
/*!********************************!*\
  !*** ./src/js/parts/slider.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

function slider(){
    let slideIndex = 1,
        sliders = document.querySelectorAll('.slider-item'),
        prev = document.querySelector('.prev'),
        next = document.querySelector('.next'),
        dotsWrap = document.querySelector('.slider-dots'),
        dots = document.querySelectorAll('.dot');

    showSlides(slideIndex);

    function showSlides(n){

        if(n > sliders.length){
            slideIndex = 1;
        }
        if(n < 1){
            slideIndex = sliders.length;
        }
        
        sliders.forEach((item)=>item.style.display = 'none');
        dots.forEach((item)=>item.classList.remove('dot-active'));

        sliders[slideIndex-1].style.display = 'block';
        dots[slideIndex-1].classList.add('dot-active');

    }

    function plusSlides(n){
        showSlides(slideIndex += n);
    }

    function currentSlide(n){
        showSlides(slideIndex = n);
    }

    prev.addEventListener('click', ()=>{
        plusSlides(-1);
    });
    next.addEventListener('click', ()=>{
        plusSlides(1);
    });

    dotsWrap.addEventListener('click', function(event){
        for(let i = 0; i <dots.length + 1; i++){
            if(event.target.classList.contains('dot') && event.target == dots[i-1]){
                currentSlide(i);
            }
        }
    });
}
module.exports = slider;

/***/ }),

/***/ "./src/js/parts/tabs.js":
/*!******************************!*\
  !*** ./src/js/parts/tabs.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

function tabs(){
        let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent');
        
    function hideTabContent(a) {
        for (let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    }

    hideTabContent(1);

    function showTabContent(b){
        if(tabContent[b].classList.contains('hide')){
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
    }

    info.addEventListener('click', (event)=>{
        let target = event.target;
        if(target && target.classList.contains('info-header-tab')){
            for(let i = 0; i < tab.length; i++){
                if(target == tab[i]){
                    hideTabContent(0);
                    showTabContent(i);
                    break;
                }
            }
        }
    });
}

module.exports = tabs;

/***/ }),

/***/ "./src/js/parts/timer.js":
/*!*******************************!*\
  !*** ./src/js/parts/timer.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

function timer(){
    let deadLine = '2020-05-01';

    function getTimeRemaining(endTime){

        let t = Date.parse(endTime) - Date.parse(new Date());

        let seconds = Math.floor((t/1000)%60);
        let minutes = Math.floor((t/1000/60)%60);
        let hours = Math.floor((t/1000/60/60)%24);
        let days = Math.floor(t/1000/60/60/24);
        return{
            'total' : t,
            'seconds' : seconds,
            'minutes' : minutes,
            'hours' : hours,
            'days' : days
        };

    }

    function setClock(id, endTime){
        let timer = document.getElementById(id);
        let days = timer.querySelector('.days');
        let hours = timer.querySelector('.hours');
        let minutes = timer.querySelector('.minutes');
        let seconds = timer.querySelector('.seconds');
        let timeInterval = setInterval(updateClock, 1000);

        function updateClock(){
            let t = getTimeRemaining(endTime);

            function addZero(num){
                if(num<=9){
                    return '0'+num;
                }else{
                    return num;
                }
            }

            days.textContent = addZero(t.days);
            hours.textContent = addZero(t.hours);
            minutes.textContent = addZero(t.minutes);
            seconds.textContent = addZero(t.seconds);

            if(t.total<=0){
                clearInterval(timeInterval);
                days.textContent = '00';
                hours.textContent = '00';
                minutes.textContent = '00';
                seconds.textContent = '00';
            }
        }

    }

    setClock('timer', deadLine);
}

module.exports = timer;


/***/ }),

/***/ "./src/js/script.js":
/*!**************************!*\
  !*** ./src/js/script.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

window.addEventListener('DOMContentLoaded', ()=>{
    "use strict";  
    let tabs = __webpack_require__(/*! ./parts/tabs.js */ "./src/js/parts/tabs.js"),
        calc = __webpack_require__(/*! ./parts/calc.js */ "./src/js/parts/calc.js"),
        slider = __webpack_require__(/*! ./parts/slider.js */ "./src/js/parts/slider.js"),
        form = __webpack_require__(/*! ./parts/form.js */ "./src/js/parts/form.js"),
        modalWindow = __webpack_require__(/*! ./parts/modalWindow.js */ "./src/js/parts/modalWindow.js"),
        timer = __webpack_require__(/*! ./parts/timer */ "./src/js/parts/timer.js");

    tabs();
    calc();
    slider();
    form();
    modalWindow();
    timer();

    // Timer
    
    // Modal window 

// Form 

    // Slider 

    // Calc 
   
});

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map