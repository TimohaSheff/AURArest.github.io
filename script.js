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
    name = name.replace(/[  $$  $$  ]/g, '\\$&');  
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
            document.getElementById('reservation-form').style.display = 'block'; // Показываем форму  
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

    // Сохраняем данные в localStorage  
    const tableNumber = getParameterByName('table');  
    const reservationData = { name, phone, date, time, guests, table: tableNumber || 'не выбран' };  
    localStorage.setItem('reservationData', JSON.stringify(reservationData));  

    // Если все поля валидны, показываем уведомление  
    alert('Бронь подтверждена!\nИмя: ' + name +  
        '\nТелефон: ' + phone +  
        '\nДата: ' + date +  
        '\nВремя: ' + time +  
        '\nКоличество гостей: ' + guests +  
        '\nВыбранный стол: ' + (tableNumber ? tableNumber : 'не выбран.'));  

    // Отображаем кнопку для скачивания данных только после успешного подтверждения  
    const downloadButton = document.getElementById('download-data');  
    if (downloadButton) {  
        downloadButton.style.display = 'block';  
        downloadButton.onclick = function () {  
            downloadData(reservationData);  
        };  
    }  
}  

// Функция для скачивания данных  
function downloadData(reservationData) {  
    const data = `Имя: ${reservationData.name}\nТелефон: ${reservationData.phone}\nДата: ${reservationData.date}\nВремя: ${reservationData.time}\nКоличество гостей: ${reservationData.guests}\nВыбранный стол: ${reservationData.table}`;  

    const blob = new Blob([data], { type: 'text/plain' });  
    const url = URL.createObjectURL(blob);  

    const a = document.createElement('a');  
    a.href = url;  
    a.download = 'reservation_details.txt';  
    document.body.appendChild(a);  
    a.click();  
    document.body.removeChild(a);  
    URL.revokeObjectURL(url);  
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

    // Изначально скрываем кнопку "Скачать данные"  
    const downloadButton = document.getElementById('download-data');  
    if (downloadButton) {  
        downloadButton.style.display = 'none';  
    }  
});
