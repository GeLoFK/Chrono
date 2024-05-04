<?php

namespace App\Doctrine\Types;

use Doctrine\DBAL\Platforms\AbstractPlatform;
use Doctrine\DBAL\Types\GuidType;
use Ramsey\Uuid\Uuid;

class UuidType extends GuidType
{
    public function convertToDatabaseValue($value, AbstractPlatform $platform)
    {
        return $value->toString();
    }

    public function convertToPHPValue($value, AbstractPlatform $platform)
    {
        return Uuid::fromString($value);
    }

    public function getName()
    {
        return 'uuid';
    }
}
