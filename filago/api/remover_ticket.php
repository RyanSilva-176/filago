<?php
include "../conexao.php";
$id = intval($_GET['id'] ?? 0);
if(!$id){ echo 'ID inválido'; exit; }
$stmt = $conn->prepare("DELETE FROM fila WHERE id=?");
$stmt->bind_param("i",$id);
if($stmt->execute()) echo 'Ticket removido com sucesso!';
else echo 'Erro: '.$stmt->error;
$stmt->close();
?>