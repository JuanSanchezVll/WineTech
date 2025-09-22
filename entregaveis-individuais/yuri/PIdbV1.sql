-- =====================================================================
-- SCRIPT DE CRIAÇÃO DO BANCO DE DADOS PARA O PROJETO DE VINÍCOLAS
-- =====================================================================

-- 1. CRIAÇÃO DO BANCO DE DADOS E SELEÇÃO
CREATE DATABASE VinicolaDB;
USE VinicolaDB;

-- 2. CRIAÇÃO DAS TABELAS

-- Tabela `Barril`: Armazena os dados de cada barril de vinho.
CREATE TABLE Barril (
    idBarril INT PRIMARY KEY AUTO_INCREMENT,
    codigoBarril VARCHAR(20) NOT NULL UNIQUE,
    tipoUva VARCHAR(50),
    safra INT,
    volumeLitros DECIMAL(5,2),
    dtEnvasamento DATE,
    localizacaoAdega VARCHAR(100)
);

-- Tabela `Sensor`: Cadastra os dispositivos de monitoramento.
CREATE TABLE Sensor (
    idSensor INT PRIMARY KEY AUTO_INCREMENT,
    fkBarril INT NOT NULL,
    codigoHardware VARCHAR(30) NOT NULL UNIQUE,
    dtInstalacao DATETIME,
    statusSensor VARCHAR(20)
);

-- Tabela `LeituraSensor`: Armazena o histórico de dados coletados.
CREATE TABLE LeituraSensor (
    idLeitura BIGINT PRIMARY KEY AUTO_INCREMENT,
    fkSensor INT NOT NULL,
    dtHoraLeitura DATETIME,
    valorTemperatura DECIMAL(4,2),
    valorUmidade DECIMAL(4,2),
    alertaGerado VARCHAR(10)
);

-- =====================================================================
-- 3. INSERÇÃO DE DADOS DE EXEMPLO
-- =====================================================================

-- Inserindo 3 barris diferentes
INSERT INTO Barril (codigoBarril, tipoUva, safra, volumeLitros, dtEnvasamento, localizacaoAdega) VALUES
('BRL-A01-MER-23', 'Merlot', 2023, 225.00, '2024-03-15', 'Corredor A, Nível 1, Posição 1'),
('BRL-A02-CS-23', 'Cabernet Sauvignon', 2023, 225.00, '2024-03-20', 'Corredor A, Nível 1, Posição 2'),
('BRL-B01-SAN-24', 'Sangiovese', 2024, 225.00, '2025-04-01', 'Corredor B, Nível 1, Posição 1');

-- Inserindo 1 sensor para cada barril
INSERT INTO Sensor (fkBarril, codigoHardware, dtInstalacao, statusSensor) VALUES
(1, 'DHT22-HW-001', '2025-09-01 10:00:00', 'Ativo'),
(2, 'DHT22-HW-002', '2025-09-01 10:05:00', 'Ativo'),
(3, 'DHT22-HW-003', '2025-09-01 10:10:00', 'Ativo');

-- Inserindo leituras para o Sensor 1 (Barril de Merlot)
-- Leituras ideais (Temp: 14-16°C, Umidade: ~70%)
INSERT INTO LeituraSensor (fkSensor, dtHoraLeitura, valorTemperatura, valorUmidade, alertaGerado) VALUES
(1, '2025-09-18 14:00:00', 15.10, 70.50, 'Ideal'),
(1, '2025-09-18 15:00:00', 15.30, 70.20, 'Ideal');

-- Inserindo leituras para o Sensor 2 (Barril de Cabernet Sauvignon)
-- Leituras de alerta (Temp: 16-22°C)
INSERT INTO LeituraSensor (fkSensor, dtHoraLeitura, valorTemperatura, valorUmidade, alertaGerado) VALUES
(2, '2025-09-18 16:00:00', 18.50, 68.00, 'Alerta'),
(2, '2025-09-18 17:00:00', 19.20, 67.50, 'Alerta');

-- Inserindo leituras para o Sensor 3 (Barril de Sangiovese)
-- Leitura crítica simulando uma falha no ar condicionado (Temp: >22°C) 
INSERT INTO LeituraSensor (fkSensor, dtHoraLeitura, valorTemperatura, valorUmidade, alertaGerado) VALUES
(3, '2025-09-18 18:00:00', 23.10, 75.00, 'Crítico'),
(3, '2025-09-18 19:00:00', 23.80, 76.20, 'Crítico');

-- =====================================================================
-- 4. CONFIGURAÇÃO DAS CHAVES ESTRANGEIRAS
-- =====================================================================

-- Conecta a tabela Sensor com a tabela Barril
ALTER TABLE Sensor ADD CONSTRAINT fk_Sensor_Barril
	FOREIGN KEY (fkBarril) REFERENCES Barril(idBarril);

-- Conecta a tabela LeituraSensor com a tabela Sensor
ALTER TABLE LeituraSensor ADD CONSTRAINT fk_Leitura_Sensor
	FOREIGN KEY (fkSensor) REFERENCES Sensor(idSensor);

-- =====================================================================
-- 5. EXEMPLOS DE CONSULTAS (`SELECT`)
-- =====================================================================

-- Consulta 1: Ver o histórico completo de leituras de um sensor específico (o do barril de Merlot)
SELECT * FROM LeituraSensor WHERE fkSensor = 1;

-- Consulta 2: Listar as últimas leituras de todos os barris, mostrando os detalhes do barril
SELECT
    b.codigoBarril,
    b.tipoUva,
    l.dtHoraLeitura,
    l.valorTemperatura,
    l.valorUmidade,
    l.alertaGerado
FROM Barril AS b
JOIN Sensor AS s ON b.idBarril = s.fkBarril
JOIN LeituraSensor AS l ON s.idSensor = l.fkSensor
ORDER BY l.dtHoraLeitura DESC;

-- Consulta 3: Identificar quais barris registraram um alerta 'Crítico'
SELECT
    b.codigoBarril,
    b.localizacaoAdega,
    s.codigoHardware,
    l.dtHoraLeitura,
    l.valorTemperatura,
    l.alertaGerado
FROM Barril AS b
JOIN Sensor AS s ON b.idBarril = s.fkBarril
JOIN LeituraSensor AS l ON s.idSensor = l.fkSensor
WHERE l.alertaGerado = 'Crítico';