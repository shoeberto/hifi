<?php

$start = $_POST['start'];
$end = $_POST['end'];

$fh = fopen('queue.csv', 'r');

$queue = [];
$header = fgetcsv($fh);
while ($row = fgetcsv($fh)) {
    $row = array_combine($header, $row);
    if ($start <= $row['timestamp'] && $end >= $row['timestamp']) {
        $queue[] = $row['file'];
    }
}

fclose($fh);

print(json_encode($queue));
