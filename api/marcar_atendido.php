<?php
include "../conexao.php";
$id = intval($_GET['id'] ?? 0);
if(!$id){ echo 'ID inválido'; exit; }
$stmt = $conn->prepare("UPDATE fila SET status='atendido' WHERE id=?");
$stmt->bind_param("i", $id);
if($stmt->execute()) echo 'Cliente marcado como atendido!';
else echo 'Erro: '.$stmt->error;
$stmt->close();
?>