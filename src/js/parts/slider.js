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