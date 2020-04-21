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