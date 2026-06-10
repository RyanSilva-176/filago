<?php
include "../conexao.php";
$id = intval($_GET['id'] ?? 0);
if(!$id){ echo 'ID inválido'; exit; }
// delete empresa (fila has FK ON DELETE CASCADE if DB set)
$stmt = $conn->prepare("DELETE FROM empresas WHERE id=?");
$stmt->bind_param("i",$id);
if($stmt->execute()) echo 'Empresa removida (e tickets relacionados).';
else echo 'Erro: '.$stmt->error;
$stmt->close();
?>