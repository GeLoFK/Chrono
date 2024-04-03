<?php

namespace App\Controller\Room;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\WebSocket\WebSocket\Chat;

class RoomController extends AbstractController
{
    /**
     * @Route("/room", name="room")
     */
    public function room(): Response
    {
        return $this->render('room/room.html.twig');
    }
}
