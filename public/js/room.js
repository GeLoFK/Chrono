function sendMessage() {
    // Получаем значение введенного сообщения
    var messageContent = document.getElementById('messageInput').value;

    // Создаем новый элемент сообщения
    var messageElement = document.createElement('div');
    messageElement.classList.add('message');

    // Создаем элементы для имени отправителя и текста сообщения
    var senderElement = document.createElement('span');
    senderElement.classList.add('sender');
    senderElement.textContent = 'Вы'; // Имя отправителя - можно указать ваше имя или имя пользователя
    var contentElement = document.createElement('span');
    contentElement.classList.add('content');
    contentElement.textContent = messageContent; // Текст сообщения

    // Добавляем элементы имени отправителя и текста сообщения в элемент сообщения
    messageElement.appendChild(senderElement);
    messageElement.appendChild(contentElement);

    // Находим блок чата и добавляем в него новое сообщение
    var chatBox = document.getElementById('chatBox');
    chatBox.appendChild(messageElement);

    // Очищаем поле ввода после отправки сообщения
    document.getElementById('messageInput').value = '';
}

function showVideo() {
    var iframe = document.createElement('iframe');
    iframe.setAttribute('width', '560');
    iframe.setAttribute('height', '315');
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('allowfullscreen', '');

    // Находим контейнер для видео и добавляем iframe внутрь
    var videoBox = document.querySelector('.Video__box');
    videoBox.innerHTML = ''; // Очищаем контейнер от предыдущего содержимого, если оно есть
    videoBox.appendChild(iframe);
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('copyText').addEventListener('click', function() {
        var urlToCopy = window.location.href; // Получаем текущий URL страницы
        navigator.clipboard.writeText(urlToCopy); // Копируем URL в буфер обмена
    });

    // Добавляем обработчик события для кнопки отправки сообщения
    document.getElementById('sendMessageBtn').addEventListener('click', function() {
        sendMessage();
    });
});
