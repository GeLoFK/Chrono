function createRoom() {
    // Генерация случайного идентификатора комнаты
    var roomId = generateRoomId();

    // Перенаправление пользователя на страницу /room с добавленным идентификатором комнаты
    window.location.href = 'https://127.0.0.1:8000/room?roomId=' + roomId;
}

// Функция для генерации случайного идентификатора комнаты
function generateRoomId() {
    // Генерация случайного числа или использование другого метода генерации уникального идентификатора
    // В этом примере используется метод Math.random() для генерации случайного числа и его преобразование в строку
    var randomId = Math.random().toString(36).substr(2, 10); // Преобразование случайного числа в строку с основанием 36
    return randomId;
}