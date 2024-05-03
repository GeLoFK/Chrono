document.addEventListener('DOMContentLoaded', function() {
    // Load the YouTube IFrame Player API asynchronously
    var tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    var conn = new WebSocket('ws://localhost:8080');

    // Устанавливаем обработчик события для кнопки "Confirm"
    var confirmButton = document.getElementById('confirmButton');
    if (confirmButton) {
        confirmButton.addEventListener('click', showVideo);
    } else {
        console.error("Confirm button not found.");
    }

// Функция отображения видео по ссылке
    function showVideo() {
        var videoLink = document.getElementById('videoLink').value;
        if (videoLink.trim() === '') {
            alert("Please enter a valid video link!");
            return;
        }

        // Извлекаем идентификатор видео из ссылки YouTube
        var videoId = extractVideoId(videoLink);
        if (!videoId) {
            alert("Invalid YouTube video link!");
            return;
        }

        // Создаем плеер YouTube IFrame Player
        var player = new YT.Player('player', {
            height: '315',
            width: '560',
            videoId: videoId,
            events: {
                'onReady': onPlayerReady
            }
        });

        // Отправляем сообщение с информацией о видео через WebSocket
        conn.send(JSON.stringify({ message: "Playing video: " + videoLink }));

        // Очищаем поле ввода ссылки
        document.getElementById('videoLink').value = '';
    }

// Функция извлечения идентификатора видео из ссылки YouTube
    function extractVideoId(url) {
        var regExp = /^.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/;
        var match = url.match(regExp);
        return (match && match[1].length === 11) ? match[1] : null;
    }

// Функция, вызываемая при готовности плеера
    function onPlayerReady(event) {
        event.target.playVideo();
    }


    // Обработчик сообщения от WebSocket сервера
    conn.onmessage = function(e) {
        var messageData = JSON.parse(e.data);
        var messageElement = document.createElement('div');
        messageElement.classList.add('message');

        var senderElement = document.createElement('span');
        senderElement.classList.add('sender');
        senderElement.textContent = messageData.sender + ': ';

        var contentElement = document.createElement('span');
        contentElement.classList.add('content');
        contentElement.textContent = messageData.message;

        messageElement.appendChild(senderElement);
        messageElement.appendChild(contentElement);

        var chatBox = document.getElementById('chatBox');
        chatBox.appendChild(messageElement);
        chatBox.scrollTop = chatBox.scrollHeight;
    };

    // Функция отправки сообщения через WebSocket
    function sendMessage() {
        var messageContent = document.getElementById('messageInput').value;
        conn.send(JSON.stringify({ message: messageContent }));
        document.getElementById('messageInput').value = '';

        // Добавляем сообщение в чат после его отправки
        var messageElement = document.createElement('div');
        messageElement.classList.add('message');

        var contentElement = document.createElement('span');
        contentElement.classList.add('content');
        contentElement.textContent = messageContent;


        messageElement.appendChild(contentElement);

        var chatBox = document.getElementById('chatBox');
        chatBox.appendChild(messageElement);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    // Добавляем обработчик события для кнопки "Отправить сообщение"
    document.getElementById('sendMessageBtn').addEventListener('click', sendMessage);
});
