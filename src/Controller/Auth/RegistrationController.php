<?php

namespace App\Controller\Auth;

use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Doctrine\ORM\EntityManagerInterface;

class RegistrationController extends AbstractController
{
    /**
     * @Route("/registration", name="registration")
     */
    public function registration(Request $request, UserPasswordHasherInterface $passwordHasher, EntityManagerInterface $entityManager): Response
    {
        if ($request->isMethod('POST')) {
            $user = new User();
            $user->setEmail($request->request->get('email'));
            $user->setFirstname($request->request->get('firstname'));

            // Validate passwords match
            if ($request->request->get('password') !== $request->request->get('confirm_password')) {
                return new JsonResponse(['success' => false, 'message' => 'Пароли не совпадают']);
            }

            // Hash password
            $hashedPassword = $passwordHasher->hashPassword($user, $request->request->get('password'));
            $user->setPassword($hashedPassword);

            // Persist user
            $entityManager->persist($user);
            $entityManager->flush();

            if ($user->getId()) {
                return new JsonResponse(['success' => true, 'message' => 'Вы успешно зарегистрированы!']);
            } else {
                return new JsonResponse(['success' => false, 'message' => 'Ошибка, попробуйте позже']);
            }
        }

        return $this->render('auth/register.html.twig');
    }
}