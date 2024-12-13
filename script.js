let selectedTable = null;  

// Функция для выбора стола  
function selectTable(tableId) {  
    if (selectedTable) {  
        const previousTableElement = document.getElementById(selectedTable);  
        if (previousTableElement) {  
            previousTableElement.classList.remove('selected');  
        }  
    }  

    selectedTable = tableId;  
    const newTableElement = document.getElementById(selectedTable);  
    if (newTableElement) {  
        newTableElement.classList.add('selected');  
        document.getElementById('confirm-reservation').style.display = 'block';  
    }  
}  

// Проверка наличия кнопки для подтверждения бронирования  
function setupReservationButton() {  
    const confirmButton = document.getElementById('confirm-reservation');  
    if (confirmButton) {  
        confirmButton.addEventListener('click', function () {  
            if (selectedTable) {  
                const tableNumber = selectedTable.replace('table', '');  
                location.href = 'forms.html?table=' + tableNumber;  
            }  
        });  
    }  
}  

// Функция для получения параметров из URL  
function getParameterByName(name) {  
    const url = window.location.href;  
    name = name.replace(/[\[\]]/g, '\\$&');  
    const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),  
        results = regex.exec(url);  
    if (!results) return null;  
    if (!results[2]) return '';  
    return decodeURIComponent(results[2].replace(/\+/g, ' '));  
}  

// Проверка и вывод деталей бронирования  
function displayReservationDetails() {  
    const urlSelectedTable = getParameterByName('table');  
    const tableNumber = urlSelectedTable && !isNaN(urlSelectedTable) ? Number(urlSelectedTable) : null;  

    const reservationDetails = document.getElementById('reservation-details');  
    if (reservationDetails) {  
        if (tableNumber !== null) {  
            reservationDetails.textContent = 'Выбранный стол: ' + tableNumber;  
        } else {  
            reservationDetails.textContent = 'Стол не выбран.';  
        }  
    }  
}  

// Функция валидации и подтверждения бронирования  
function validateAndSubmitForm(event) {  
    event.preventDefault(); // Предотвращаем отправку формы  

    // Получаем значения полей  
    const name = document.getElementById('name').value.trim();  
    const phone = document.getElementById('phone').value.trim();  
    const date = document.getElementById('date').value;  
    const time = document.getElementById('time').value;  
    const guests = document.getElementById('guests').value;  

    // Валидация полей  
    if (!name || !phone || !date || !time || !guests) {  
        alert('Пожалуйста, заполните все поля.');  
        return;  
    }  

    // Упрощенное условие для номера телефона  
    const phonePattern = /^[\+()\d\s-]+$/;  
    if (!phonePattern.test(phone)) {  
        alert('Пожалуйста, введите корректный номер телефона.');  
        return;  
    }  

    // Получаем номер выбранного стола  
    const tableNumber = getParameterByName('table');  

    // Если все поля валидны, показываем уведомление  
    alert('Бронь подтверждена!\nИмя: ' + name +   
          '\nТелефон: ' + phone +   
          '\nДата: ' + date +   
          '\nВремя: ' + time +   
          '\nКоличество гостей: ' + guests +   
          '\nВыбранный стол: ' + (tableNumber ? tableNumber : 'не выбран.'));  
}  

// Функция для управления кнопкой "Вернуться наверх"  
function setupBackToTopButton() {  
    const backToTopButton = document.getElementById("backToTop");  
    window.onscroll = function () {  
        if (backToTopButton) {  
            if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {  
                backToTopButton.style.display = "block";  
            } else {  
                backToTopButton.style.display = "none";  
            }  
        }  
    };  

    if (backToTopButton) {  
        backToTopButton.onclick = function () {  
            document.body.scrollTop = 0; // Для Safari  
            document.documentElement.scrollTop = 0; // Для Chrome, Firefox, IE и Opera  
        };  
    }  
}  

// Ждем загрузки DOM и выполняем нужные функции в зависимости от страницы  
document.addEventListener('DOMContentLoaded', function () {  
    if (document.getElementById('confirm-reservation')) {  
        setupReservationButton();  
    }  
    if (document.getElementById('reservation-details')) {  
        displayReservationDetails();  
    }  
    if (document.getElementById('name')) {  
        const form = document.getElementById('reservation-form');  
        form.addEventListener('submit', validateAndSubmitForm);  
    }  
    setupBackToTopButton();  
});