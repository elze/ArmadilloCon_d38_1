<?php

include 'parseInput.php';

include 'testInput.php';

include 'contactForm.php';

include 'permissionForm.php';

include 'mailMessage.php';


if ($_SERVER["REQUEST_METHOD"] == "POST") {

	$postdata = file_get_contents("php://input");

	$clean_key_value_pairs = parse_input($postdata);

    	$email_to1 = "dillowebdesigner@armadillocon.org";

	$email_to = "";
	$email_subject = "";
	$email_message = "";	

	$email_addresses = array();

	if ($clean_key_value_pairs['form_type'] == 'permission_slip') {
		$error = permission_form_message($clean_key_value_pairs, $email_to, $email_subject, $email_message);
		array_push($email_addresses, $email_to);
		array_push($email_addresses, $email_to1);
	}
	else {
		$error = contact_form_message($clean_key_value_pairs, $email_to, $email_subject, $email_message);
		array_push($email_addresses, $email_to);
	}		

	if (empty($error)) {
		//$jasonStrResponse .= mail_message($email_to1, $clean_key_value_pairs['subject'], $email_message);
		//$jasonStrResponse .= mail_message($email_to, $clean_key_value_pairs['subject'], $email_message);
	
		//$jasonStrResponse .= mail_message($email_to1, $email_subject, $email_message);
		//$jasonStrResponse .= mail_message($email_to, $email_subject, $email_message);

		error_log("About to send the message. email_addresses = ".print_r($email_address, 1), 0);

		foreach ($email_addresses as $email_address) {			
			error_log("About to send the message. email_address = ".$email_address, 0);
			$jasonStrResponse .= mail_message($email_address, $email_subject, $email_message);
		}
	}
	else { 
		$jasonStrResponse .= '{"error": "'.$error.'"}';
	}

	error_log("jasonStr = ".$jasonStr, 0);
	error_log("jasonStrResponse = ".$jasonStrResponse, 0);

	//echo '{"data": {"senderName":"'.$sender_name.'", "emailFrom":"'.$email_from.'", "subject":"'.$email_subject.'", "category":"'.$category.'", "message":"'.$email_message.'"} }';
	//echo '{"data": {"cat" : "meow 1"}}';
	//echo $jasonStr;
	echo $jasonStrResponse;

} // end if ($_SERVER["REQUEST_METHOD"] == "POST")

?>