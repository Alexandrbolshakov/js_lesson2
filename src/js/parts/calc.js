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