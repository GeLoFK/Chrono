<?php

namespace App\Entity;

use App\Repository\RoomRepository;
use Doctrine\ORM\Mapping as ORM;
use Ramsey\Uuid\UuidInterface;

#[ORM\Entity(repositoryClass: "App\Repository\RoomRepository")]
class Room
{
    #[ORM\Id]
    #[ORM\Column(type: "uuid", unique: true)]
    private ?UuidInterface $id;

    /**
     * @ORM\Column(type="json", nullable=true)
     */
    private ?array $chatMessages = [];

    public function getId(): ?UuidInterface
    {
        return $this->id;
    }

    public function setId(UuidInterface $id): self
    {
        $this->id = $id;
        return $this;
    }

    public function getChatMessages(): ?array
    {
        return $this->chatMessages;
    }

    public function setChatMessages(?array $chatMessages): self
    {
        $this->chatMessages = $chatMessages;

        return $this;
    }
}
