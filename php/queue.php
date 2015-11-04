<?php

$start = $_POST['start'];

$timeout = 600;

for ($i = 0; $i < $timeout; $i++) {
    $fh = fopen('queue.csv', 'r');

    $queue = [];
    $header = fgetcsv($fh);
    while ($row = fgetcsv($fh)) {
        $row = array_combine($header, $row);
        if ($start <= $row['timestamp']) {
            $queue[] = $row['file'];
        }
    }

    fclose($fh);

    if (!empty($queue)) {
        print(json_encode(['timestamp' => microtime(true) * 1000, 'queue' => $queue]));
        exit(0);
    }

    usleep(50000);
}

print(json_encode(['timestamp' => microtime(true) * 1000, 'queue' => []]));
