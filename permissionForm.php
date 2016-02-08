<?php

function permission_form_message($clean_key_value_pairs, &$email_to, &$email_subject, &$email_message) {

	$clean_key_value_pairs['subject'] = "ArmadilloCon 38 writers workshop permission slip";
	$email_from = $clean_key_value_pairs['email_from'];
	$sender_name = $clean_key_value_pairs['sender_name'];

 	$email_subject = "ArmadilloCon 38 writers workshop permission slip";

	error_log("permissionForm.php: sender_name = ".$sender_name." email_from = ".$email_from." email_subject = ".$email_subject." category = ".$category." email_message = ".$email_message, 0);

	if (empty($sender_name)) {
		$error .= "Author's name is missing. ";
	}

	if (empty($email_from)) {
		$error .= "Author's email adddress is missing. ";
		//$send_email = FALSE;	
	}
	$manuscript_title = $clean_key_value_pairs['manuscript_title'];
	if (empty($manuscript_title)) {	
		$error .= "Manuscript title is missing.";
	}

	$email_to = "armadilloconwritersworkshop@gmail.com"; 

	if (empty($error)) {
		$email_message = "Author name: ".$sender_name."\nAuthor email: ".$email_from."\nManuscript title: ".$manuscript_title."\nFor the purposes of the ArmadilloCon Writers' Workshop only, I hereby give permission to the representatives of ArmadilloCon to print and/or electronically distribute my original work of fiction.";
	}
	return $error;
}
?>