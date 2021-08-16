<?php

$libelle = $_POST["libelle"];
$stepLabelList = $_POST["steps_label"];
$stepDurationList = $_POST["steps_duration"];

//var_dump($libelle);
//var_dump($stepLabelList);
//var_dump($stepDurationList);


$traning = [
    "libelle" => $libelle,
];

foreach ($stepLabelList as $key=>$stepLabel) {
    $traning["etapes"][$key]["ordre"] = $key;
    $traning["etapes"][$key]["libelle"] = $stepLabel;
    $traning["etapes"][$key]["duree"] = $stepDurationList[$key];
}

//var_dump($traning);


$traininglist = file_get_contents("data/programs.json");

//var_dump($traininglist);

$traininglist = json_decode($traininglist,true);

$traininglist = array_merge($traininglist, [$traning]);
//var_dump($traininglist);

file_put_contents("data/programs.json", json_encode($traininglist));

header("/");
