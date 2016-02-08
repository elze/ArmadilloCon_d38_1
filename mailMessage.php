<?php

function mail_message($email_to, $email_subject, $email_message) {
	$headers = 'From: '.$email_to."\r\n".
	'Reply-To: '.$email_to."\r\n" .
	'X-Mailer: PHP/' . phpversion();

	$wasAccepted = mail($email_to, $email_subject, $email_message, $headers);
	//$wasAccepted1 = mail($email_to1, $email_subject, $email_message, $headers1); 

	$jasonStrResponse .= '{"Email accepted for delivery": "'.$wasAccepted1.'"}';
	return $jasonStrResponse;
}
?>