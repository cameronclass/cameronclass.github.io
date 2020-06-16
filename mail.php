<?php

require_once('phpmailer/PHPMailerAutoload.php');
$mail = new PHPMailer;
$mail->CharSet = 'utf-8';

$email = $_POST['user_email'];
$subject = $_POST['subject'];
$message = $_POST['message'];



//$mail->SMTPDebug = 3;                               // Enable verbose debug output

$mail->isSMTP();                                      // Set mailer to use SMTP
$mail->Host = 'mail.yoncu.com';  																							// Specify main and backup SMTP servers
$mail->SMTPAuth = true;                               // Enable SMTP authentication
$mail->Username = 'info@studio-projects.com'; // Ваш логин от почты с которой будут отправляться письма
$mail->Password = 'Cameron.Class2000'; // Ваш пароль от почты с которой будут отправляться письма
$mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
$mail->Port = 465; // TCP port to connect to / этот порт может отличаться у других провайдеров

$mail->setFrom('info@studio-projects.com'); // от кого будет уходить письмо?
$mail->addAddress('kamrankutumov@gmail.com');     // Кому будет уходить письмо
//$mail->addAddress('ellen@example.com');               // Name is optional
//$mail->addReplyTo('info@example.com', 'Information');
//$mail->addCC('cc@example.com');
//$mail->addBCC('bcc@example.com');
//$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
//$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
$mail->isHTML(true);                                  // Set email format to HTML

$mail->Subject = 'Мой Сайт';
$mail->Body    = '' .$email . ' Написал вам <br> Тема: ' .$subject. '<br>Сообщения: ' .$message;

if(!$mail->send()) {
    echo 'Error';
} else {
    header('location: /');
}
?>
