<?php
include "../conexao.php";
$empresa_id = intval($_GET['empresa_id'] ?? 0);
$stmt = $conn->prepare("SELECT * FROM fila WHERE empresa_id=? ORDER BY id ASC");
$stmt->bind_param("i", $empresa_id);
$stmt->execute();
$res = $stmt->get_result();
$arr = [];
while($r = $res->fetch_assoc()) $arr[] = $r;
header('Content-Type: application/json');
echo json_encode($arr);
?>