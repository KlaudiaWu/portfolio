<?php

if(!isset($_SERVER['HTTP_X_REQUESTED_WITH']) || strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) != 'xmlhttprequest') {

    header('Content-Type: text/html; charset=utf-8');
    die('Dostęp zabroniony');

}

if(isset($_POST['user-name']) && isset($_POST['user-email']) && isset($_POST['user-message'])) {

    $errors = array();

    if(empty($_POST['user-name'])) {
        array_push($errors, 'Podaj swoje imię');
    }

    if(!filter_var($_POST['user-email'], FILTER_VALIDATE_EMAIL)) {
        array_push($errors, 'Podaj poprawny adres e-mail');
    }

    if(empty($_POST['user-message'])) {
        array_push($errors, 'Napisz wiadomość');
    }

    if(count($errors) > 0) {

        echo json_encode($errors);

    } else {

        $to = 'kontakt@klaudiawojciak.pl';
        $subject = 'Wiadomość od ' . $_POST['user-email'] . '  z klaudiawojciak.pl';
        $message = $_POST['user-message'];
        $headers = 'From: ' . $_POST['user-email'] . "\r\n" .
            'Reply-To: ' . $_POST['user-email'] . "\r\n" .
            'Content-Type: text/plain;charset=utf-8\r\n' .
            'X-Mailer: PHP/' . phpversion();

        $mail_sent = mail($to, $subject, $message, $headers);

        if($mail_sent) {
            echo json_encode(array(
                'success' => 'Wiadomość została wysłana poprawnie'
            ));
        } else {
            echo json_encode(array(
                'error' => 'Wystąpił błąd podczas wysyłania wiadomości'
            ));
        }

    }

} else {

    echo json_encode(array(
        'error' => 'Przesłano niepoprawne pola formularza'
    ));

}