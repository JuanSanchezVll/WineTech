CREATE DATABASE winetech;

USE winetech;

CREATE TABLE endereco (
  idEndereco INT PRIMARY KEY AUTO_INCREMENT,
  logradouro VARCHAR(255) NOT NULL,
  numero VARCHAR(10) NOT NULL,
  complemento VARCHAR(100),
  bairro VARCHAR(100) NOT NULL,
  cidade VARCHAR(100) NOT NULL,
  estado CHAR(2) NOT NULL,
  cep CHAR(8) NOT NULL
);

CREATE TABLE empresa (
  idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
  cnpj CHAR(14) UNIQUE NOT NULL,
  razaoSocial VARCHAR(200) NOT NULL,
  nomeFantasia VARCHAR(100),
  emailContato VARCHAR(150) UNIQUE NOT NULL,
  codigoSeguranca VARCHAR(255) UNIQUE NOT NULL,
  situacaoContrato BOOLEAN DEFAULT FALSE,
  dataRegistro DATETIME DEFAULT CURRENT_TIMESTAMP,
  idEndereco INT,
  CONSTRAINT fkEmpresaEndereco FOREIGN KEY (idEndereco) REFERENCES endereco(idEndereco)
);

CREATE TABLE funcionario (
  idFuncionario INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(45) NOT NULL,
  sobrenome VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  senha VARCHAR(255) NOT NULL,
  nivelAcesso TINYINT NOT NULL DEFAULT 3,
  ativo BOOLEAN DEFAULT TRUE,
  dataRegistro DATETIME DEFAULT CURRENT_TIMESTAMP,
  idEmpresa INT,
  CONSTRAINT fFuncionariokEmpresa FOREIGN KEY (idEmpresa) REFERENCES empresa(idEmpresa),
  CONSTRAINT chkNivelAcesso CHECK (nivelAcesso in (0, 1, 2, 3)),
  CONSTRAINT chkEmpresaUsuario CHECK ((nivelAcesso = 0 and idEmpresa is null) or (nivelAcesso >= 1 and idEmpresa is not null))
);

CREATE TABLE cave (
  idCave INT PRIMARY KEY AUTO_INCREMENT,
  identificacao VARCHAR(45) NOT NULL,
  idEmpresa INT,
  CONSTRAINT fkCaveEmpresa FOREIGN KEY (idEmpresa) REFERENCES empresa(idEmpresa)
);

CREATE TABLE tipoUva (
  idTipoUva INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(45) NOT NULL,
  temperaturaMinima DECIMAL(5,2) NOT NULL,
  temperaturaMaxima DECIMAL(5,2) NOT NULL,
  umidadeMinima DECIMAL(5,2) NOT NULL,
  umidadeMaxima DECIMAL(5,2) NOT NULL
);

CREATE TABLE barril (
  idBarril INT PRIMARY KEY AUTO_INCREMENT,
  identificacao VARCHAR(45) NOT NULL,
  idCave INT NOT NULL,
  idTipoUva INT NOT NULL,
 CONSTRAINT fkBarrilCave  FOREIGN KEY (idCave) REFERENCES cave(idCave),
 CONSTRAINT fkBarrilTipoUva  FOREIGN KEY (idTipoUva) REFERENCES tipoUva(idTipoUva)
);

CREATE TABLE sensor (
  idSensor INT PRIMARY KEY AUTO_INCREMENT,
  identificacao VARCHAR(45) NOT NULL,
  idBarril INT NOT NULL,
 CONSTRAINT fkSensorBarril FOREIGN KEY (idBarril) REFERENCES barril(idBarril)
);

CREATE TABLE leituraSensor (
  idLeituraSensor INT PRIMARY KEY AUTO_INCREMENT,
  temperatura DECIMAL(5,2) NOT NULL,
  umidade DECIMAL(5,2) NOT NULL,
  dataRegistro DATETIME DEFAULT CURRENT_TIMESTAMP,
  idSensor INT,
  CONSTRAINT fkLeituraSensor FOREIGN KEY (idSensor) REFERENCES sensor(idSensor)
);

CREATE TABLE alerta (
  idAlerta INT PRIMARY KEY AUTO_INCREMENT,
  gravidadeAlerta VARCHAR(30) NOT NULL,
  dataRegistro DATETIME NOT NULL,
  statusManutencao VARCHAR(45),
  idLeituraSensor INT NOT NULL,
 CONSTRAINT fkAlertaLeituraSensor FOREIGN KEY (idLeituraSensor) REFERENCES leituraSensor(idLeituraSensor)
);

INSERT INTO endereco (logradouro, numero, complemento, bairro, cidade, estado, cep) VALUES
('Rua dos Aromas', '45', 'Galpão A', 'Vinhedo Central', 'Jundiaí', 'SP', '13200001'),
('Avenida do Sol', '1200', 'Escritório', 'Laranjeiras', 'Caxias do Sul', 'RS', '95000002'),
('Travessa da Lua', '22', 'Fundos', 'Centro Velho', 'Bento Gonçalves', 'RS', '95700003');

INSERT INTO tipoUva (nome, temperaturaMinima, temperaturaMaxima, umidadeMinima, umidadeMaxima) VALUES
('Merlot', 14.00, 16.00, 60.00, 75.00),
('Cabernet Sauvignon', 14.00, 16.00, 60.00, 75.00),
('Malbec', 14.00, 16.00, 60.00, 75.00);

INSERT INTO empresa (cnpj, razaoSocial, nomeFantasia, emailContato, codigoSeguranca, situacaoContrato, dataRegistro, idEndereco) VALUES
('00000000000001', 'Vinícola Nova Era S.A.', 'Nova Era Vinhos', 'contato@novaera.com', 'SEGRT54321', 1, '2024-01-01 10:00:00', 1),
('00000000000002', 'Adega Superior Ltda.', 'Adega Master', 'suporte@masteradega.com', 'XCVBN09876', 1, '2024-01-02 11:00:00', 2),
('00000000000003', 'Vinhos Finos do Sul', 'Vino Sul', 'financeiro@vinosul.com.br', 'QWERT67890', 0, '2024-01-03 12:00:00', 3);

INSERT INTO funcionario (nome, sobrenome, email, senha, nivelAcesso, ativo, dataRegistro, idEmpresa) VALUES
('Julia', 'Alves', 'julia.a@novaera.com', 'senha001', 2, 1, '2024-01-04 13:00:00', 1),
('Pedro', 'Santos', 'pedro.s@novaera.com', 'senha002', 1, 1, '2024-01-05 14:00:00', 1),
('Alice', 'Rocha', 'alice.r@masteradega.com', 'senha003', 2, 1, '2024-01-06 15:00:00', 2);

INSERT INTO cave (identificacao, idEmpresa) VALUES
('CAVE-JDI-A', 1),
('CAVE-JDI-B', 1),
('CAVE-CSUL-A', 2);

INSERT INTO barril (identificacao, idCave, idTipoUva) VALUES
('BARRIL-001A', 1, 1), -- Cave JDI-A, Tannat
('BARRIL-002B', 1, 2), -- Cave JDI-A, Merlot
('BARRIL-003C', 2, 3); -- Cave JDI-B, Sauvignon Blanc

INSERT INTO sensor (identificacao, idBarril) VALUES
('SEN-T-001', 1),
('SEN-T-002', 2),
('SEN-H-003', 3);

INSERT INTO leituraSensor (temperatura, umidade, dataRegistro, idSensor) VALUES
(15.50, 68.00, '2024-09-25 16:00:00', 1),
(18.20, 81.00, '2024-09-25 16:05:00', 2),
(10.00, 72.00, '2024-09-25 16:10:00', 3);

INSERT INTO alerta (gravidadeAlerta, dataRegistro, statusManutencao, idLeituraSensor) VALUES
('URGENTE', '2024-09-25 16:00:01', 'CORRIGIDO', 1),
('CRÍTICA', '2024-09-25 16:05:01', 'PENDENTE', 2),
('MODERADA', '2024-09-25 16:10:01', 'AGENDADO', 3); 

SELECT
    b.identificacao AS Barril,
    t.nome AS TipoUva,
    ls.temperatura AS 'Temperatura Atual',
    ls.umidade AS 'Umidade Atual',
    CONCAT(t.temperaturaMinima, '°C - ', t.temperaturaMaxima, '°C') AS 'Faixa ideal de temperatura',
    CONCAT(t.umidadeMinima, '% - ', t.umidadeMaxima, '%') AS 'Faixa ideal de umidade',
    CASE
        WHEN ls.temperatura < t.temperaturaMinima THEN '❌ Temperatura BAIXA'
        WHEN ls.temperatura > t.temperaturaMaxima THEN '❌ Temperatura ALTA'
        ELSE '✅ Temperatura OK'
    END AS 'Status Temperatura',
    
    CASE
        WHEN ls.umidade < t.umidadeMinima THEN '❌ Umidade BAIXA'
        WHEN ls.umidade > t.umidadeMaxima THEN '❌ Umidade ALTA'
        ELSE '✅ Umidade OK'
    END AS 'Status Umidade'
FROM leituraSensor ls
JOIN sensor s ON ls.idSensor = s.idSensor
JOIN barril b ON s.idBarril = b.idBarril
JOIN tipoUva t ON b.idTipoUva = t.idTipoUva;


-- CRIAR USUÁRIO E DAR AS PERMISSÕES
CREATE USER 'winetech-sensor'@'%' IDENTIFIED BY 'Winetech.2025';

GRANT INSERT on winetech.leituraSensor to 'winetech-sensor'@'%';

CREATE USER 'winetech'@'%' IDENTIFIED BY 'Winetech.2026';

GRANT ALL PRIVILEGES ON winetech.* TO'winetech'@'%';

flush privileges;

SELECT user, host FROM mysql.user;

SELECT @@PORT, @@VERSION, @@hostname;

