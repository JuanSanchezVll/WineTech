CREATE DATABASE winetech;

USE winetech;

CREATE TABLE endereco (
  id_endereco INT PRIMARY KEY AUTO_INCREMENT,
  logradouro VARCHAR(255) NOT NULL,
  numero VARCHAR(10) NOT NULL,
  complemento VARCHAR(100),
  bairro VARCHAR(100) NOT NULL,
  cidade VARCHAR(100) NOT NULL,
  estado CHAR(2) NOT NULL,
  cep CHAR(8) NOT NULL
);

CREATE TABLE empresa (
  id_empresa INT PRIMARY KEY AUTO_INCREMENT,
  cnpj CHAR(14) UNIQUE NOT NULL,
  razao_social VARCHAR(200) NOT NULL,
  nome_fantasia VARCHAR(100),
  email_contato VARCHAR(150) UNIQUE NOT NULL,
  codigo_seguranca VARCHAR(255) UNIQUE NOT NULL,
  situacao_contrato BOOLEAN DEFAULT FALSE,
  data_registro DATETIME DEFAULT CURRENT_TIMESTAMP,
  id_endereco INT UNIQUE,
  CONSTRAINT fk_empresa_endereco FOREIGN KEY (id_endereco) REFERENCES endereco (id_endereco)
);

CREATE TABLE funcionario (
  id_funcionario INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(45) NOT NULL,
  sobrenome VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  senha VARCHAR(255) NOT NULL,
  nivel_acesso TINYINT NOT NULL DEFAULT 3,
  ativo BOOLEAN DEFAULT TRUE,
  data_registro DATETIME DEFAULT CURRENT_TIMESTAMP,
  id_empresa INT,
  CONSTRAINT fk_funcionario_empresa FOREIGN KEY (id_empresa) REFERENCES empresa (id_empresa),
  CONSTRAINT chk_nivel_acesso CHECK (nivel_acesso in (0, 1, 2, 3)),
  CONSTRAINT chk_empresa_usuario CHECK ((nivel_acesso = 0 and id_empresa is null) or (nivel_acesso >= 1 and id_empresa is not null))
);

CREATE TABLE cave (
  id_cave INT PRIMARY KEY AUTO_INCREMENT,
  identificacao VARCHAR(45) NOT NULL,
  id_empresa INT,
  CONSTRAINT fk_cave_empresa FOREIGN KEY (id_empresa) REFERENCES empresa (id_empresa)
);

CREATE TABLE tipo_uva (
  id_tipo_uva INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(45) NOT NULL,
  temperatura_minima DECIMAL(5,2) NOT NULL,
  temperatura_maxima DECIMAL(5,2) NOT NULL,
  umidade_minima DECIMAL(5,2) NOT NULL,
  umidade_maxima DECIMAL(5,2) NOT NULL
);

CREATE TABLE barril (
  id_barril INT PRIMARY KEY AUTO_INCREMENT,
  identificacao VARCHAR(45) NOT NULL,
  id_cave INT NOT NULL,
  id_tipo_uva INT NOT NULL,
 CONSTRAINT fk_barril_cave  FOREIGN KEY (id_cave) REFERENCES cave (id_cave),
 CONSTRAINT fk_barril_tipo_uva  FOREIGN KEY (id_tipo_uva) REFERENCES tipo_uva (id_tipo_uva)
);

CREATE TABLE sensor (
  id_sensor INT PRIMARY KEY AUTO_INCREMENT,
  identificacao VARCHAR(45) NOT NULL,
  id_barril INT NOT NULL UNIQUE,
 CONSTRAINT fk_sensor_barril FOREIGN KEY (id_barril) REFERENCES barril (id_barril)
);

CREATE TABLE leitura_sensor (
  id_leitura_sensor INT PRIMARY KEY AUTO_INCREMENT,
  temperatura DECIMAL(5,2) NOT NULL,
  umidade DECIMAL(5,2) NOT NULL,
  data_registro DATETIME DEFAULT CURRENT_TIMESTAMP,
  id_sensor INT,
  CONSTRAINT fk_leitura_sensor FOREIGN KEY (id_sensor) REFERENCES sensor (id_sensor)
);


INSERT INTO endereco (logradouro, numero, complemento, bairro, cidade, estado, cep) VALUES
('Rua dos Aromas', '45', 'Galpão A', 'Vinhedo Central', 'Jundiaí', 'SP', '13200001'),
('Avenida do Sol', '1200', 'Escritório', 'Laranjeiras', 'Caxias do Sul', 'RS', '95000002'),
('Travessa da Lua', '22', 'Fundos', 'Centro Velho', 'Bento Gonçalves', 'RS', '95700003');

INSERT INTO tipo_uva (nome, temperatura_minima, temperatura_maxima, umidade_minima, umidade_maxima) VALUES
('Merlot', 14.00, 16.00, 60.00, 75.00),
('Cabernet Sauvignon', 14.00, 16.00, 60.00, 75.00),
('Malbec', 14.00, 16.00, 60.00, 75.00);

INSERT INTO empresa (cnpj, razao_social, nome_fantasia, email_contato, codigo_seguranca, situacao_contrato, data_registro, id_endereco) VALUES
('00000000000001', 'Vinícola Nova Era S.A.', 'Nova Era Vinhos', 'contato@novaera.com', 'SEGRT54321', 1, '2024-01-01 10:00:00', 1),
('00000000000002', 'Adega Superior Ltda.', 'Adega Master', 'suporte@masteradega.com', 'XCVBN09876', 1, '2024-01-02 11:00:00', 2),
('00000000000003', 'Vinhos Finos do Sul', 'Vino Sul', 'financeiro@vinosul.com.br', 'QWERT67890', 0, '2024-01-03 12:00:00', 3);

INSERT INTO funcionario (nome, sobrenome, email, senha, nivel_acesso, ativo, data_registro, id_empresa) VALUES
('Julia', 'Alves', 'julia.a@novaera.com', 'senha001', 2, 1, '2024-01-04 13:00:00', 1),
('Pedro', 'Santos', 'pedro.s@novaera.com', 'senha002', 1, 1, '2024-01-05 14:00:00', 1),
('Alice', 'Rocha', 'alice.r@masteradega.com', 'senha003', 2, 1, '2024-01-06 15:00:00', 2);

INSERT INTO cave (identificacao, id_empresa) VALUES
('CAVE-JDI-A', 1),
('CAVE-JDI-B', 1),
('CAVE-CSUL-A', 2);

INSERT INTO barril (identificacao, id_cave, id_tipo_uva) VALUES
('BARRIL-001A', 1, 1), -- Cave JDI-A, Tannat
('BARRIL-002B', 1, 2), -- Cave JDI-A, Merlot
('BARRIL-003C', 2, 3); -- Cave JDI-B, Sauvignon Blanc

INSERT INTO sensor (identificacao, id_barril) VALUES
('SEN-T-001', 1),
('SEN-T-002', 2),
('SEN-H-003', 3);

INSERT INTO leitura_sensor (temperatura, umidade, data_registro, id_sensor) VALUES
(15.50, 68.00, '2024-09-25 16:00:00', 1),
(18.20, 81.00, '2024-09-25 16:05:00', 2),
(10.00, 72.00, '2024-09-25 16:10:00', 3);
 
 
SELECT
    b.identificacao AS Barril,
    t.nome AS TipoUva,
    ls.temperatura AS 'Temperatura Atual',
    ls.umidade AS 'Umidade Atual',
    CONCAT(t.temperatura_minima, '°C - ', t.temperatura_maxima, '°C') AS 'Faixa ideal de temperatura',
    CONCAT(t.umidade_minima, '% - ', t.umidade_maxima, '%') AS 'Faixa ideal de umidade',
    CASE
        WHEN ls.temperatura < t.temperatura_minima THEN '❌ Temperatura BAIXA'
        WHEN ls.temperatura > t.temperatura_maxima THEN '❌ Temperatura ALTA'
        ELSE '✅ Temperatura OK'
    END AS 'Status Temperatura',
    
    CASE
        WHEN ls.umidade < t.umidade_minima THEN '❌ Umidade BAIXA'
        WHEN ls.umidade > t.umidade_maxima THEN '❌ Umidade ALTA'
        ELSE '✅ Umidade OK'
    END AS 'Status Umidade'
FROM leitura_sensor ls
JOIN sensor s ON ls.id_sensor = s.id_sensor
JOIN barril b ON s.id_barril = b.id_barril
JOIN tipo_uva t ON b.id_tipo_uva = t.id_tipo_uva;


-- CRIAR USUÁRIO E DAR AS PERMISSÕES
CREATE USER 'winetech-sensor'@'%' IDENTIFIED BY 'Winetech.2025';

GRANT INSERT on winetech.leitura_sensor to 'winetech-sensor'@'%';

CREATE USER 'winetech'@'%' IDENTIFIED BY 'Winetech.2026';

GRANT ALL PRIVILEGES ON winetech.* TO'winetech'@'%';

flush privileges;

SELECT user, host FROM mysql.user;

SELECT @@PORT, @@VERSION, @@hostname;
