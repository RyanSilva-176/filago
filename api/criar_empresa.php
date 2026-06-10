<?php
include "../conexao.php";
$nome = trim($_POST['nome'] ?? '');
$lat = isset($_POST['latitude']) && $_POST['latitude'] !== '' ? $_POST['latitude'] : null;
$lng = isset($_POST['longitude']) && $_POST['longitude'] !== '' ? $_POST['longitude'] : null;
if(!$nome) { echo 'Nome é obrigatório'; exit; }
// ensure columns exist: latitude, longitude on empresas table is recommended
$stmt = $conn->prepare("INSERT INTO empresas (nome, latitude, longitude) VALUES (?, ?, ?)");
$stmt->bind_param("sdd", $nome, $lat, $lng);
if($stmt->execute()) echo 'Empresa cadastrada com sucesso!';
else echo 'Erro: '. $stmt->error;
$stmt->close();
?>