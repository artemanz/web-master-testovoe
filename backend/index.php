<?
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

$logFile = './logs.log';

$data = file_get_contents('php://input');

if (!empty($data)) {
  $logData = date('Y-m-d H:i:s') . ' - ' . $data . PHP_EOL;

  file_put_contents($logFile, $logData, FILE_APPEND);

  echo $data;
}
