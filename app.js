'use strict';

let radio = document.querySelectorAll('input[type="radio"]');
let answers = document.querySelectorAll('.answer')
let form = document.querySelector('#unicorn-quiz');
let result = document.querySelector('.result');
let section = document.querySelector('section');
let a = 0;
let b = 0;
let c = 0;
let d = 0;
let e = 0;
let answer = '';
let dialog = document.getElementById('dialog');
let personName = document.querySelector('#name');
let good = document.querySelector('.name');
let button_p = document.querySelector('.button_p')

// УБИРАЕМ проверку сервера, используем ТОЛЬКО localStorage
document.addEventListener('DOMContentLoaded', function() {
    const localName = localStorage.getItem('userName');
    
    if (localName) {
        // Имя есть на этом устройстве
        personName.style.display = 'none';
        good.style.display = 'block';
        good.innerText = 'Привет, ' + localName;
        button_p.style.display = 'block';
    } else {
        // Имени нет на этом устройстве
        personName.style.display = 'block';
    }
});

// При отправке формы
personName.addEventListener('submit', function(event){
    event.preventDefault();
    let f = new FormData(personName);
    let userName = f.get('name');
    
    // Сохраняем ТОЛЬКО локально (на этом устройстве)
    localStorage.setItem('userName', userName);
    
    personName.style.display = 'none';
    good.style.display = 'block';
    good.innerText = 'Привет, ' + userName;
    button_p.style.display = 'block';
    
    // На сервер НЕ отправляем (или отправляем только для статистики)
});

button_p.addEventListener('click', function(event){
    localStorage.removeItem('userName');
    good.style.display = 'none';
    button_p.style.display = 'none';
    personName.style.display = 'block';
        
});

for (let i = 0; i < radio.length; i++) {
    radio[i].addEventListener('click', function(event) {
        for (let j = 0; j < answers.length; j++){
            if (radio[j].checked) {
                answers[j].classList.add('checked')
            }
            else {
                answers[j].classList.remove('checked')
            }
        }
    });

};

form.addEventListener('submit', function(event){
    event.preventDefault();
    for (let i = 0; i < radio.length; i++){
        if (radio[i].checked){
            if (radio[i].value == 'Вилл') {
                a += 1
            } else if (radio[i].value == 'Ирма') {
                b += 1
            } else if (radio[i].value == 'Тарани') {
                c += 1
            } else if (radio[i].value == 'Корнелия') {
                d += 1
            } else if (radio[i].value == 'Хай') {
                e += 1
            };
        };
        
    };
    if (!form.checkValidity()) {
        let newDiv = document.createElement('p');
        newDiv.innerText = 'Даны ответы не на все вопросы!';
        newDiv.style.color = 'red';
        section.after(newDiv);
        form.reportValidity();
        return; // Прекращаем выполнение функции
    }
    else {
        if (Math.max(a, b, c, d, e) == a) {
            answer = 'Вилл Вандом'
        } else if (Math.max(a, b, c, d, e) == b) {
            answer = 'Ирма Лэр'
        } else if (Math.max(a, b, c, d, e) == c) {
            answer = 'Тарани Кук'
        } else if (Math.max(a, b, c, d, e) == d) {
            answer = 'Корнелия Хейл'
        } else if (Math.max(a, b, c, d, e) == e) {
            answer = 'Хай Лин'
        }
        let data = {ans: answer}
        localStorage.setItem('answer', JSON.stringify(data));
        window.open('who_are_you.html', '_blank');
        console.log(answer);
    }
});



document.addEventListener('DOMContentLoaded', function(){
    let q = document.querySelectorAll('input[type="radio"]');
    q.forEach(radio => {
        radio.addEventListener('change', function() {
            setTimeout(() => {
                let s = this.closest('.question');
                let y = s.nextElementSibling;
                y.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 100);
        });
    });

});
