<?php

namespace App\Controller\Room;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class RoomController extends AbstractController
{
    /**
     * @Route("/room", name="room")
     */
    public function room(): Response
    {
        // Ваш код здесь
        return $this->render('room/room.html.twig');
    }
}
