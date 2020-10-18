<?php
define('MB', 1048576);

require_once('phpmailer/PHPMailerAutoload.php');
$mail = new PHPMailer;
$mail->CharSet = 'utf-8';

$modal_name = $_POST['modal_name'];
$number = $_POST['modal_number'];
$name = $_POST['name'];
$company = $_POST['company'];
$message = $_POST['text'];
$contact = $_POST['contact'];
// $head = $_POST['head'];


//$mail->SMTPDebug = 3;                               // Enable verbose debug output

$mail->isSMTP();                                      // Set mailer to use SMTP  mail.nic.ru
$mail->Host = 'mail.nic.ru';                                                                                            // Specify main and backup SMTP servers
$mail->SMTPAuth = true;                               // Enable SMTP authentication
$mail->Username = 'postmaster@wazzup.pro'; // Ваш логин от почты с которой будут отправляться письма  postmaster@wazzup.pro
$mail->Password = 'Cameron.Class2701'; // Ваш пароль от почты с которой будут отправляться письма  Cameron.Class2701
$mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
$mail->Port = 465; // TCP port to connect to / этот порт может отличаться у других провайдеров

$mail->setFrom('postmaster@wazzup.pro');
$mail->addAddress('mail@wazzup.pro');   // Кому будет уходить письмо  mail@wazzup.pro
$mail->addAddress('kamrankutumov@gmail.com');   // Кому будет уходить письмо  mail@wazzup.pro
//$mail->addAddress('example@gmail.com');               // Name is optional
//$mail->addReplyTo('info@example.com', 'Information');
//$mail->addCC('cc@example.com');
//$mail->addBCC('bcc@example.com');
//$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
//$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
$mail->isHTML(true);                                  // Set email format to HTML

$mail->Subject = "Заявка на консультацию!";
$filename = $_FILES["file"]["name"];
$temp = explode(".", $_FILES["file"]["name"]);
$extension = end($temp);
$allowedExts = ["jpeg", "jpg", "png", "docx", "doc", "xlsx", "pdf"];
$result = array();
if (isset($_FILES['file'])){
if (($_FILES["file"]["size"] < 5 * MB)
    && in_array($extension, $allowedExts)) {
        move_uploaded_file($_FILES["file"]["tmp_name"],
            "uploads/" . $filename);
        $mail->addAttachment("uploads/" . $filename);
    } else {
        header('Content-Type: application/json; charset=UTF-8');
        $result['err'] = 'Размер файла должен быть не больше 5мб и расширение файла должно быть jpeg, jpg, png, docx, pdf';
        die(json_encode($result));
    }
}

$mail->Body = $modal_name . ' оставил(а) заявку. <br>Номер Телефона:<br>' . $number;
$mail->AltBody = '';

if (!$mail->send()) {
    echo 'Error';
} else {
  header("location: thanks.html");
    //     unlink("uploads/" . $filename);
    // header('Content-Type: application/json; charset=UTF-8');
    // $result['mess'] = 'Заявка отправлена!' . '<br><span>' . 'Скоро с вами свяжутся наши специалисты</span>';
    // die(json_encode($result));
}

?>
