<?php
include "../conexao.php";
$nome = trim($_POST['nome'] ?? '');
$empresa_id = intval($_POST['empresa_id'] ?? 0);
if(!$nome || !$empresa_id){ echo 'Todos os campos são obrigatórios!'; exit; }
$stmt = $conn->prepare("INSERT INTO fila (nome, empresa_id, status) VALUES (?, ?, 'aguardando')");
$stmt->bind_param("si", $nome, $empresa_id);
if($stmt->execute()) echo 'Você entrou na fila com sucesso!';
else echo 'Erro: '. $stmt->error;
$stmt->close();
?>