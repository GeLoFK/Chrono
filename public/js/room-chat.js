document.addEventListener('DOMContentLoaded', function() {
    var conn = new WebSocket('ws://localhost:8080');

    // Обработчик события для кнопки "Confirm"
    var confirmButton = document.getElementById('confirmButton');
    if (confirmButton) {
        confirmButton.addEventListener('click', sendMessage);
    } else {
        console.error("Confirm button not found.");
    }

    // Обработчик сообщения от WebSocket сервера
    conn.onmessage = function(e) {
        var messageData = JSON.parse(e.data);
        displayMessageFromOtherUser(messageData.sender, messageData.message);
    };

    var messageInput = document.getElementById('messageInput');

    var userId = document.getElementById('username').value;
    var username = userId ? userId : generateGuestName();

    // Функция для генерации уникального имени для гостя
    function generateGuestName() {
        return "Guest" + Math.floor(100000 + Math.random() * 900000);
    }

    // Функция для изменения имени пользователя
    function changeUsername() {
        var newUsername = document.getElementById('newUsernameInput').value.trim();
        if (newUsername !== '') {
            username = newUsername; // Обновляем имя пользователя
            console.log("New username:", username); // Добавьте здесь код для отправки нового имени на сервер
            document.getElementById('currentUsername').textContent = username; // Обновляем отображаемое имя
            document.getElementById('newUsernameInput').value = ''; // Очищаем поле ввода
        }
    }

    // Обработчик события нажатия клавиши Enter в поле ввода нового имени
    document.getElementById('newUsernameInput').addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            changeUsername();
        }
    });

    // Функция отправки сообщения через WebSocket
    function sendMessage() {
        var messageContent = messageInput.value.trim(); // Удаляем лишние пробелы в начале и конце строки
        if (messageContent === '') {
            // Если сообщение пустое, не отправляем его
            return;
        }

        var message = { sender: username, message: messageContent };
        conn.send(JSON.stringify(message));

        // Очищаем поле ввода
        messageInput.value = '';

        // Создаем элемент сообщения
        var messageElement = document.createElement('div');
        messageElement.classList.add('message');

        // Добавляем имя отправителя к сообщению
        var senderElement = document.createElement('span');
        senderElement.classList.add('sender');
        senderElement.textContent = username + ': ';
        messageElement.appendChild(senderElement);

        // Добавляем текст сообщения
        var contentElement = document.createElement('span');
        contentElement.classList.add('content');
        contentElement.textContent = messageContent;
        messageElement.appendChild(contentElement);

        // Добавляем сообщение в чат
        var chatBox = document.getElementById('chatBox');
        chatBox.appendChild(messageElement);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    // Обработчик события нажатия клавиши Enter в поле ввода сообщения
    messageInput.addEventListener('keydown', function(event) {
        if (event.keyCode === 13) { // Код клавиши Enter
            event.preventDefault();
            sendMessage();
        }
    });

    var copyTextElement = document.getElementById('copyText');

// Добавляем обработчик события клика на элемент
    copyTextElement.addEventListener('click', function() {
        // Создаем временный элемент input для копирования ссылки
        var urlInput = document.createElement('input');
        urlInput.setAttribute('value', window.location.href);
        document.body.appendChild(urlInput);
        urlInput.select();
        document.execCommand('copy');
        document.body.removeChild(urlInput);
    });

    // Функция отображения сообщения от другого пользователя
    function displayMessageFromOtherUser(sender, message) {
        var messageElement = document.createElement('div');
        messageElement.classList.add('message');

        // Добавляем имя отправителя к сообщению
        var senderElement = document.createElement('span');
        senderElement.classList.add('sender');
        senderElement.textContent = sender + ': '; // Отображаем имя отправителя
        messageElement.appendChild(senderElement);

        // Добавляем текст сообщения
        var contentElement = document.createElement('span');
        contentElement.classList.add('content');
        contentElement.textContent = message;
        messageElement.appendChild(contentElement);

        // Добавляем сообщение в чат
        var chatBox = document.getElementById('chatBox');
        chatBox.appendChild(messageElement);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    // Добавляем обработчик события для кнопки "Отправить сообщение"
    document.getElementById('sendMessageBtn').addEventListener('click', sendMessage);
});
