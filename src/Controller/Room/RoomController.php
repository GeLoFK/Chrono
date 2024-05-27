<?php

namespace App\Controller\Room;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\Room;
use Ramsey\Uuid\Uuid;
use App\Repository\RoomRepository;
use App\Repository\UserRepository;

class RoomController extends AbstractController
{
    /**
     * @Route("/room", name="room")
     */
    public function room(Request $request, RoomRepository $roomRepository, UserRepository $userRepository): Response
    {
        $user = $this->getUser();
        $username = 'Guest';

        if ($user) {
            $userId = $user->getId();
            $username = $userRepository->find($userId)->getFirstname();
        }

        // Получаем или создаем комнату
        $roomIdString = $request->get('roomId');
        $roomId = null;

        // Проверяем, является ли строка действительным UUID
        if ($roomIdString && Uuid::isValid($roomIdString)) {
            $roomId = Uuid::fromString($roomIdString);
        }

        if (!$roomId) {
            $roomId = Uuid::uuid4();
        }

        $room = $roomRepository->findOneBy(['id' => $roomId]);
        if (!$room) {
            $room = new Room();
            $room->setId($roomId);
            $roomRepository->save($room);
        }

        // Получаем сообщения чата для этой комнаты
        $chatMessages = $room->getChatMessages();

        // При отправке нового сообщения
        if ($request->isMethod('POST')) {
            $message = $request->request->get('message');
            $chatMessages[] = ['sender' => $username, 'message' => $message];
            $room->setChatMessages($chatMessages);
            $roomRepository->save($room);
        }

        // Преобразуем id комнаты в строку перед передачей в представление
        $roomIdAsString = $roomId->toString();

        return $this->render('room/room.html.twig', [
            'roomId' => $roomIdAsString,
            'username' => $username,
            'chatMessages' => $chatMessages,
        ]);
    }
}