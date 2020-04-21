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
