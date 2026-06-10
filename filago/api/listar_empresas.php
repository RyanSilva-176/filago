<?php
include "../conexao.php";
$res = $conn->query("SELECT id, nome, latitude, longitude, criado_em FROM empresas ORDER BY nome ASC");
$data = [];
while($row = $res->fetch_assoc()) $data[]=$row;
header('Content-Type: application/json');
echo json_encode($data);
?>