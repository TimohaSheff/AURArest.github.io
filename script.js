// map.html  
let selectedTable = null;  

function selectTable(tableId) {  
    // Убираем выделение с предыдущего стола, если он был выбран  
    if (selectedTable) {  
        const previousTableElement = document.getElementById(selectedTable);  
        if (previousTableElement) {  
            previousTableElement.classList.remove('selected');  
        }  
    }  
    
    // Устанавливаем новый выбранный стол  
    selectedTable = tableId;  
    const newTableElement = document.getElementById(selectedTable);  
    if (newTableElement) {  
        newTableElement.classList.add('selected');  
        document.getElementById('confirm-reservation').style.display = 'block';  
    }  
}  

// Проверка наличия кнопки для подтверждения бронирования  
const confirmButton = document.getElementById('confirm-reservation');  
if (confirmButton) {  
    confirmButton.addEventListener('click', function () {  
        // Проверяем, выбран ли стол  
        if (selectedTable) {  
            const tableNumber = selectedTable.replace('table', '');  
            location.href = 'forms.html?table=' + tableNumber;  
        }
    });  
}  

// forms.html  
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

// Ждем загрузки DOM и затем выполняем функцию  
document.addEventListener('DOMContentLoaded', displayReservationDetails);  


// menu.html  
window.onscroll = function () {  
    const button = document.getElementById("backToTop");  
    if (button) { // Проверяем наличие кнопки  
        if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {  
            button.style.display = "block";  
        } else {  
            button.style.display = "none";  
        }  
    }  
};  

// Проверка наличия кнопки "Вернуться наверх"  
const backToTopButton = document.getElementById("backToTop");  
if (backToTopButton) {  
    backToTopButton.onclick = function () {  
        document.body.scrollTop = 0; // Для Safari  
        document.documentElement.scrollTop = 0; // Для Chrome, Firefox, IE и Opera  
    };  
}