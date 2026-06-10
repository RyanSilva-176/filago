<?php
include "../conexao.php";
$empresa_id = intval($_GET['empresa_id'] ?? 0);
$stmt = $conn->prepare("SELECT * FROM fila WHERE empresa_id=? AND status='aguardando' ORDER BY id ASC LIMIT 1");
$stmt->bind_param("i",$empresa_id);
$stmt->execute();
$res = $stmt->get_result();
if($cliente = $res->fetch_assoc()){
  $upd = $conn->prepare("UPDATE fila SET status='chamado' WHERE id=?");
  $upd->bind_param("i", $cliente['id']);
  $upd->execute();
  echo 'Chamando: '. $cliente['nome'];
}else echo 'Nenhum cliente aguardando.';
?>