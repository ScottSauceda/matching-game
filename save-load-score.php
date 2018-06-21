<?php

    // save-load-score/php
    //  echo 'Hello from php'
    // take in the AJAX vars from
    // saveSCore() func in profile.php
    $attempts = $_GET['attempts'];
    $matches = $_GET['matches'];
    $average = $_GET['average'];
    $seconds = $_GET['seconds'];
    $score = $_GET['score'];
    $mbrID = 1; // hard-coded, pending login functionality

    // connect to db
    include 'db-config.php';

    $conn = mysqli_connect('localhost', $db_user, $db_pass);
    mysqli_select_db($conn, $db_name);

    //C for CRUD: Create a new record into db
    $query = "INSERT INTO scores (mbrID, attempts, matches, average, seconds, score) VALUES($mbrID, '$attempts', '$matches', '$average', '$seconds', '$score')";

    mysqli_query($conn, $query);

    // ##**##** SECOND QUERY **##**##

    // R in CRUD: Read records (just the top 10 high scores)
    $query2 = "SELECT * FROM scores , members WHERE scores.mbrID = members.IDmbr
    ORDER BY score DESC LIMIT 10";

    $result = mysqli_query($conn, $query2);

      // loop through the results, one row at a time, making a table.
      $tbl = "<table width='100%' border='0' cellpadding='5'>";
      $tbl .= '<tr>
                <th>Score</th>
                <th>Player</th>
                <th>Time</th>
                <th>When</th>
                </tr>';
      while($row = mysqli_fetch_array($result)) {
           // concat row after row of high scores
           $tbl .= '<tr>
                    <td>' . $row['score'] . '</td>
                    <td>' . $row['user'] . '</td>
                    <td>' . $row['seconds'] . '</td>
                    <td>' . $row['dateTime'] . '</td>
                    </tr>';
      } // close the whiel loop once all data is out

      $tbl .= '</table>'; // finally close the table

    echo $tbl; // send the responseText back to AJAX
      
?>