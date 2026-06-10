-- Caso sua tabela empresas não tenha latitude/longitude, execute:
ALTER TABLE empresas
ADD COLUMN latitude DECIMAL(10,7) NULL,
ADD COLUMN longitude DECIMAL(10,7) NULL;