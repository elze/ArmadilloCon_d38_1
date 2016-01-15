<?php

function test_input($data) {
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);
  return $data;
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {

	$error = "";

    	$email_to1 = "dillowebdesigner@armadillocon.org";

    	$email_to2 = "dillo37programming@gmail.com"; 

	$sender_name = $_POST['sender_name']." 1";
	$email_from = $_POST['email_from']." 2";
    	$email_subject = $_POST['subject']." 3";
	$category = $_POST['category']." 4";
     	$email_message .= $_POST['message']." 5";

	//print_r($_POST);

	error_log("From POST: sender_name = ".$sender_name." email_from = ".$email_from." email_subject = ".$email_subject." category = ".$category." email_message = ".$email_message, 0);

	/******
	$keyValueStr = "";
	foreach ($_POST as $key => $value) {	
		$keyValueStr .= $key." = ".$value."^";
	}
	echo $keyValueStr;
	********/

	$postdata = file_get_contents("php://input");	
	//echo $postdata;

	error_log("postdata = ".$postdata, 0);

 	$clean_key_value_pairs = array();
	
	$jasonStrResponse = "";
	$jasonStr = "{";
	$pairs = explode("&", $postdata);
	foreach ($pairs as $pair) {	
		error_log("pair = ".$pair, 0);
		list($key, $value) = explode("=", $pair);
		$processedKey = test_input($key);
		$processedValue = test_input($value);
		$clean_key_value_pairs[$processedKey] = $processedValue;
		$jasonStr .= '"'.$processedKey.'": "'.$processedValue.'",';
		error_log("processedKey = ".$processedKey." processedValue = ".$processedValue, 0);		
	}
	$jasonStr = rtrim($jasonStr, ",");
	$jasonStr .= "}";


	include 'contactForm.php';

	if (empty($error)) {

	$email_message = "Sender: ".$sender_name."\nSender email: ".$email_from."\nCategory: ".$category."\nMessage: ".$email_message;

	$headers = 'From: '.$email_to."\r\n".
	'Reply-To: '.$email_to."\r\n" .
	'X-Mailer: PHP/' . phpversion();
	$headers1 = 'From: '.$email_to1."\r\n". 
	'Reply-To: '.$email_to1."\r\n" .
	'X-Mailer: PHP/' . phpversion();

	$wasAccepted = mail($email_to, $email_subject, $email_message, $headers); 	 
	//$wasAccepted1 = mail($email_to1, $email_subject, $email_message, $headers1); 

	$jasonStrResponse .= '{"Email accepted for delivery": "'.$wasAccepted1.'"}';

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