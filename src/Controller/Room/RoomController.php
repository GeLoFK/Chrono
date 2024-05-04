<?php

namespace App\Controller\Room;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\Room;
use Ramsey\Uuid\Uuid;
use App\Repository\RoomRepository;

class RoomController extends AbstractController
{
    /**
     * @Route("/room", name="room")
     */
    public function room(Request $request, RoomRepository $roomRepository): Response
    {
        $uuid = Uuid::uuid4();

        $room = new Room();

        $room->setId($uuid);

        $roomRepository->save($room);

        return $this->render('room/room.html.twig', [
            'roomId' => $uuid->toString(),
        ]);
    }
}
