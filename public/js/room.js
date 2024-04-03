document.addEventListener('DOMContentLoaded', function() {
    var conn = new WebSocket('ws://localhost:8080');
    conn.onopen = function(e) {
        console.log("Connection established!");
    };

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

    document.getElementById('sendMessageBtn').addEventListener('click', function() {
        sendMessage();
    });
});
