<?php

function parse_input($postdata) {

	$error = "";

    	$email_to1 = "dillowebdesigner@armadillocon.org";

    	$email_to2 = "dillo37programming@gmail.com"; 

	/*******
	$sender_name = $_POST['sender_name']." 1";
	$email_from = $_POST['email_from']." 2";
    	$email_subject = $_POST['subject']." 3";
	$category = $_POST['category']." 4";
     	$email_message .= $_POST['message']." 5";
	********/

	//print_r($_POST);

	error_log("From POST: sender_name = ".$sender_name." email_from = ".$email_from." email_subject = ".$email_subject." category = ".$category." email_message = ".$email_message, 0);

	/******
	$keyValueStr = "";
	foreach ($_POST as $key => $value) {	
		$keyValueStr .= $key." = ".$value."^";
	}
	echo $keyValueStr;
	********/
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

	return $clean_key_value_pairs;
}


?>

