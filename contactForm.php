<?php

function contact_form_message($clean_key_value_pairs, &$email_to,  &$email_subject, &$email_message) {

	// That's right, responsibilities_email_addresses.php is not in Github. I didn't want to make the committee members
	// email addresses public, which they would become in Github.

	include 'responsibilities_email_addresses.php';

	$category = $clean_key_value_pairs['category'];
	$email_subject = $clean_key_value_pairs['subject'];
	$email_from = $clean_key_value_pairs['email_from'];
	$sender_name = $clean_key_value_pairs['sender_name'];

	error_log("contactForm.php: sender_name = ".$sender_name." email_from = ".$email_from." email_subject = ".$email_subject." category = ".$category." email_message = ".$email_message, 0);

	if (empty($sender_name)) {
		$error .= "Sender's name is missing. ";
	}

	if (empty($email_from)) {
		$error .= "Sender's email adddress is missing. ";
		//$send_email = FALSE;	
	}
	$email_message = $clean_key_value_pairs['message'];
	if (empty($email_message)) {	
		$error .= "Message is missing.";
	}

	if (empty($category)) {
		$error .= "Category is missing. ";
	}
	$email_to = $responsibilities_email_addresses[$category];	
	if (empty($email_to)) {
		//$email_to = 'dillowebdesigner@armadillocon.org';
		$error .= "Category ".$category." is not recognized. ";
	}
	if (empty($error)) {
		$email_message = "Sender: ".$sender_name."\nSender email: ".$email_from."\nCategory: ".$category."\nMessage: ".$email_message;
	}
	return $error;
}
?>