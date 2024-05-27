<?php

namespace App\Repository;

use App\Entity\Room;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

class RoomRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Room::class);
    }

    public function save(Room $room): void
    {
        $entityManager = $this->getEntityManager();
        $entityManager->persist($room);
        $entityManager->flush();
        // Обновление сущности комнаты для сохранения изменений в чате
        $entityManager->refresh($room);
    }

    public function findById(string $id): ?Room
    {
        return $this->findOneBy(['id' => $id]);
    }

    public function findAll(): array
    {
        return $this->findAll();
    }

}
