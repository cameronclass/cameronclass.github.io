<?php
define('MB', 1048576);

require_once('phpmailer/PHPMailerAutoload.php');
$mail = new PHPMailer;
$mail->CharSet = 'utf-8';

$name = $_POST['name'];
$company = $_POST['company'];
$message = $_POST['text'];
$contact = $_POST['contact'];

// $head = $_POST['head'];


//$mail->SMTPDebug = 3;                               // Enable verbose debug output

$mail->isSMTP();                                      // Set mailer to use SMTP
$mail->Host = 'mail.hosting.reg.ru';                                                                                            // Specify main and backup SMTP servers
$mail->SMTPAuth = true;                               // Enable SMTP authentication
$mail->Username = 'postmaster@jurist-spb.com'; // Ваш логин от почты с которой будут отправляться письма
$mail->Password = '1grQNRy!'; // Ваш пароль от почты с которой будут отправляться письма
$mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
$mail->Port = 465; // TCP port to connect to / этот порт может отличаться у других провайдеров

$mail->setFrom('postmaster@jurist-spb.com');
$mail->addAddress('kamrankutumov@gmail.com');   // Кому будет уходить письмо
//$mail->addAddress('example@gmail.com');               // Name is optional
//$mail->addReplyTo('info@example.com', 'Information');
//$mail->addCC('cc@example.com');
//$mail->addBCC('bcc@example.com');
//$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
//$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
$mail->isHTML(true);                                  // Set email format to HTML

$mail->Subject = "Приглашения в тендер!";

$filename = $_FILES["file"]["name"];
$temp = explode(".", $_FILES["file"]["name"]);
$extension = end($temp);
$allowedExts = ["jpeg", "jpg", "png", "docx", "doc", "xlsx", "pdf"];
$result = array();
if (isset($_FILES['file']) && empty($_FILES['file'])   ){ //|| empty($_FILES['file'])
if (($_FILES["file"]["size"] < 5 * MB)
    && in_array($extension, $allowedExts)) {
        move_uploaded_file($_FILES["file"]["tmp_name"],
            "uploads/" . $filename);
        $mail->addAttachment("uploads/" . $filename);
    } else {
        header('Content-Type: application/json; charset=UTF-8');
        $result['err'] = 'Размер файла должен быть не больше 5мб и расширение файла должно быть jpeg, jpg, png, docx, pdf';
        die(json_encode($result, JSON_UNESCAPED_UNICODE));
    }
}

$mail->Body = 'Имя: ' . $name . ' <br>Компания: ' . $company . ' <br>Контакты: ' . $contact . ' <br>Сообщение: ' . $message;
$mail->AltBody = '';

if (!$mail->send()) {
    echo 'Error';
} else {
  header("location: thanks.html");
         unlink("uploads/" . $filename);
    // header('Content-Type: application/json; charset=UTF-8');
    // $result['mess'] = 'Заявка отправлена!' . '<br><span>' . 'Скоро с вами свяжутся наши специалисты</span>';
    // die(json_encode($result));
}

?>
