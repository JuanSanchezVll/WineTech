CREATE DATABASE winetech;

USE winetech;

CREATE TABLE empresa (
  id_empresa INT PRIMARY KEY AUTO_INCREMENT,
  cnpj CHAR(14) UNIQUE NOT NULL,
  razao_social VARCHAR(200) NOT NULL,
  nome_fantasia VARCHAR(100),
  email_contato VARCHAR(150) UNIQUE NOT NULL,
  codigo_seguranca VARCHAR(255) UNIQUE NOT NULL,
  situacao_contrato BOOLEAN DEFAULT FALSE,
  data_hora_registro DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE endereco (
  id_endereco INT PRIMARY KEY AUTO_INCREMENT,
  logradouro VARCHAR(255) NOT NULL,
  numero VARCHAR(10) NOT NULL,
  complemento VARCHAR(100),
  bairro VARCHAR(100) NOT NULL,
  cidade VARCHAR(100) NOT NULL,
  estado CHAR(2) NOT NULL,
  cep CHAR(8) NOT NULL,
  id_empresa INT NOT NULL,

  CONSTRAINT fk_endereco_empresa FOREIGN KEY (id_empresa) REFERENCES empresa (id_empresa)
);

CREATE TABLE nivel_acesso (
  id_nivel_acesso TINYINT PRIMARY KEY,
  nome VARCHAR(45) NOT NULL,
  descricao VARCHAR(255),

  CONSTRAINT chk_id_nivel_acesso CHECK (id_nivel_acesso in (1, 2, 3, 4))
);

CREATE TABLE usuario (
  id_usuario INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(45) NOT NULL,
  sobrenome VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  senha VARCHAR(255) NOT NULL,
  ativo BOOLEAN DEFAULT TRUE,
  data_hora_registro DATETIME DEFAULT CURRENT_TIMESTAMP,
  id_empresa INT,
  id_nivel_acesso TINYINT NOT NULL,
  CONSTRAINT fk_funcionario_empresa FOREIGN KEY (id_empresa) REFERENCES empresa (id_empresa),
  CONSTRAINT fk_funcionario_nivel_acesso FOREIGN KEY (id_nivel_acesso) REFERENCES nivel_acesso (id_nivel_acesso),
  CONSTRAINT chk_empresa_usuario CHECK ((id_nivel_acesso = 1 and id_empresa is null) or (id_nivel_acesso > 1 and id_empresa is not null))
);

CREATE TABLE cave (
  id_cave INT PRIMARY KEY AUTO_INCREMENT,
  identificacao VARCHAR(45) NOT NULL,
  id_empresa INT NOT NULL,
  CONSTRAINT fk_cave_empresa FOREIGN KEY (id_empresa) REFERENCES empresa (id_empresa)
);

CREATE TABLE uva (
  id_uva INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(45) NOT NULL,
  temperatura_minima DECIMAL(5,2) NOT NULL,
  temperatura_maxima DECIMAL(5,2) NOT NULL,
  umidade_minima DECIMAL(5,2) NOT NULL,
  umidade_maxima DECIMAL(5,2) NOT NULL,
  id_empresa INT NOT NULL,
  CONSTRAINT fk_uva_empresa FOREIGN KEY (id_empresa) REFERENCES empresa (id_empresa)
);

CREATE TABLE barril (
  id_barril INT PRIMARY KEY AUTO_INCREMENT,
  identificacao VARCHAR(45) NOT NULL,
  id_cave INT NOT NULL,
  id_uva INT NOT NULL,
 CONSTRAINT fk_barril_cave FOREIGN KEY (id_cave) REFERENCES cave (id_cave),
 CONSTRAINT fk_barril_uva FOREIGN KEY (id_uva) REFERENCES uva (id_uva)
);

CREATE TABLE sensor (
  id_sensor INT PRIMARY KEY AUTO_INCREMENT,
  identificacao VARCHAR(45) NOT NULL,
  id_barril INT NOT NULL UNIQUE,
  CONSTRAINT fk_sensor_barril FOREIGN KEY (id_barril) REFERENCES barril (id_barril)
);

CREATE TABLE leitura (
  id_leitura INT AUTO_INCREMENT,
  temperatura DECIMAL(5,2) NOT NULL,
  umidade DECIMAL(5,2) NOT NULL,
  data_hora_registro DATETIME DEFAULT CURRENT_TIMESTAMP,
  id_sensor INT NOT NULL,

  CONSTRAINT pk_leitura PRIMARY KEY (id_leitura, id_sensor),
  CONSTRAINT fk_leitura_sensor FOREIGN KEY (id_sensor) REFERENCES sensor (id_sensor)
);

CREATE TABLE alerta (
  id_alerta INT AUTO_INCREMENT,
  data_hora_registro DATETIME DEFAULT CURRENT_TIMESTAMP,
  id_leitura INT NOT NULL,
  id_sensor INT NOT NULL,

  CONSTRAINT pk_alerta PRIMARY KEY (id_alerta, id_leitura, id_sensor),
  CONSTRAINT fk_alerta_leitura FOREIGN KEY (id_leitura, id_sensor) REFERENCES leitura (id_leitura, id_sensor)
);

INSERT INTO empresa (cnpj, razao_social, nome_fantasia, email_contato, codigo_seguranca, situacao_contrato) VALUES
	('12345678000199', 'ViVinho Soluções LTDA', 'ViVinho', 'contato@vivinho.com', 'CODSEG123', TRUE),
	('98765432000155', 'Vinícola São João LTDA', 'VinoJoão', 'contato@vinojoao.com', 'CODSEG456', TRUE);
    
INSERT INTO endereco (logradouro, numero, complemento, bairro, cidade, estado, cep, id_empresa) VALUES
('Av. das Uvas', '100', NULL, 'Centro', 'Campinas', 'SP', '13000000', 1),
('Rua das Vinhas', '250', 'Galpão 2', 'Industrial', 'Jundiaí', 'SP', '13200000', 2);

INSERT INTO nivel_acesso (id_nivel_acesso, nome, descricao) VALUES
	(1, 'Equipe WineTech', 'Visualiza todas as empresas cadastradas e pode alterar a situação de constrato (ativo/inativo)'),
	(2, 'Administrador', 'Tem permissão total nas entidades da empresa'),
	(3, 'Enólogo', 'Tem permissão total nas entidades da empresa exceto em funcionários'),
	(4, 'Operador', 'Tem acesso apenas a dashboard');
    
INSERT INTO usuario (nome, sobrenome, email, senha, data_hora_registro, id_empresa, id_nivel_acesso) VALUES
	('Marlon', 'Souza', 'marlon@winetech.com', 'senha123', '2024-01-10', NULL, 1),
	('Rafael', 'Souza', 'rafael@winetech.com', 'senha123', '2024-01-10', NULL, 1),
	('Juan', 'Sanchez', 'juan@winetech.com', 'senha123', '2024-01-10', NULL, 1),
	('Otavio', 'Augusto', 'otavio@winetech.com', 'senha123', '2024-01-10', NULL, 1),
	('Leonardo', 'Scavazza', 'leonardo@winetech.com', 'senha123', '2024-01-10', NULL, 1),
	('Carlos', 'Limeira', 'carlos@vivinho.com', 'senha123', now(), 1, 2),
    ('Ana', 'Lima', 'ana@vivinho.com', 'senha123', now(), 1, 3),
	('João', 'Pereira', 'joao@vivinho.com', 'senha123', now(), 1, 4),
    ('Marcia', 'Oliveira', 'marcia@vinojoao.com', 'senha123', now(), 2, 2);
    
INSERT INTO cave (identificacao, id_empresa) VALUES
	('CAVE-A', 1),
	('CAVE-B', 1),
	('CAVE-A', 2);
    
INSERT INTO uva (nome, temperatura_minima, temperatura_maxima, umidade_minima, umidade_maxima, id_empresa) VALUES
	('Merlot', 10.0, 14.0, 60.0, 80.0, 1),
	('Cabernet Sauvignon', 9.0, 13.0, 55.0, 75.0, 1),
	('Malbec', 14.0, 16.0, 60.0, 75.0, 1),
    ('Merlot', 10.0, 14.0, 60.0, 80.0, 2);
    
INSERT INTO barril (identificacao, id_cave, id_uva) VALUES
	('BARRIL-A001', 1, 1),
	('BARRIL-A002', 1, 1),
	('BARRIL-A003', 1, 2), 
	('BARRIL-A004', 1, 2), 
	('BARRIL-B001', 2, 3), 
	('BARRIL-B002', 2, 3), 
	('BARRIL-1', 3, 4), 
	('BARRIL-2', 3, 4);  
    
INSERT INTO sensor (identificacao, id_barril) VALUES
	('SENSOR-A001', 1),
	('SENSOR-A002', 2),
	('SENSOR-A003', 3),
	('SENSOR-B001', 4),
	('SENSOR-B002', 5),
	('SENSOR-1', 6),
	('SENSOR-2', 7);
    
-- leituras do barril 1 cave1 da empresa 1
INSERT INTO leitura (temperatura, umidade, id_sensor) VALUES
	(12.3, 70.1, 1),
	(11.8, 68.5, 1),
	(13.2, 75.0, 1),
	(14.5, 82.0, 1), -- alerta 4
	(9.5, 65.0, 1),  -- alerta 5
	(12.7, 78.1, 1),
	(10.1, 60.5, 1),
	(15.2, 85.0, 1), -- alerta 8
	(13.7, 79.3, 1),
	(11.0, 58.0, 1); -- alerta 10

-- leituras do barril 2 da cave1 da empresa 1 
INSERT INTO leitura (temperatura, umidade, id_sensor) VALUES
	(12.0, 70.0, 2),
	(13.8, 77.0, 2),
	(10.5, 63.2, 2),
	(9.0, 59.0, 2),   -- alerta 14
	(14.8, 83.5, 2), -- alerta 15
	(11.3, 61.2, 2),
	(12.7, 79.5, 2),
	(13.9, 81.1, 2), -- alerta 18
	(10.9, 74.0, 2),
	(15.5, 90.0, 2); -- alerta 20

-- leituras do barril 3 da cave1 da empresa 1 
INSERT INTO leitura (temperatura, umidade, id_sensor) VALUES
	(11.5, 70.0, 3),
	(12.7, 65.2, 3),
	(9.8, 58.3, 3),
	(13.5, 80.0, 3), -- alerta 24
	(8.2, 70.1, 3),  -- alerta 25
	(10.3, 60.7, 3),
	(12.5, 72.9, 3),
	(14.1, 78.5, 3), -- alerta 28
	(11.1, 69.0, 3),
	(9.2, 54.0, 3);  -- alerta 30

-- leituras do barril 4 da cave1 da empresa 1 
INSERT INTO leitura (temperatura, umidade, id_sensor) VALUES
	(10.9, 68.2, 4),
	(12.3, 70.4, 4),
	(11.1, 67.0, 4),
	(13.7, 79.5, 4), -- alerta 34
	(9.0, 55.5, 4),
	(8.5, 52.0, 4),  -- alerta 36
	(12.9, 73.1, 4),
	(10.0, 57.2, 4),
	(14.0, 81.0, 4), -- alerta 39
	(9.3, 54.3, 4);  -- alerta 40
    
-- leituras do barril 1 da cave2 da empresa 1 
INSERT INTO leitura (temperatura, umidade, id_sensor) VALUES
	(14.5, 70.0, 5),
	(15.2, 72.1, 5),
	(16.0, 74.0, 5),
	(13.8, 65.5, 5), -- alerta 44
	(17.2, 80.0, 5), -- alerta 45
	(14.9, 71.0, 5),
	(15.7, 74.8, 5),
	(16.5, 77.0, 5), -- alerta 48
	(14.2, 69.2, 5),
	(18.0, 82.0, 5); -- alerta 50

-- leituras do barril 2 da cave2 da empresa 1 
INSERT INTO leitura (temperatura, umidade, id_sensor) VALUES
	(15.1, 70.0, 6),
	(14.7, 68.0, 6),
	(16.2, 72.3, 6),
	(13.5, 59.9, 6), -- alerta 54
	(17.0, 78.2, 6), -- alerta 55
	(15.8, 74.4, 6),
	(14.3, 63.2, 6),
	(16.9, 76.0, 6), -- alerta 58
	(15.0, 71.7, 6),
	(18.5, 84.1, 6); -- alerta 60

-- leituras do barril 1 cave1 da empresa 1 
INSERT INTO leitura (temperatura, umidade, id_sensor) VALUES
	(12.0, 70.0, 7),
	(11.1, 66.0, 7),
	(13.5, 78.1, 7),
	(9.7, 50.1, 7),   -- alerta 64
	(14.8, 82.4, 7),  -- alerta 65
	(10.2, 61.4, 7),
	(12.8, 79.0, 7),
	(15.1, 88.0, 7),  -- alerta 68
	(11.7, 68.0, 7),
	(9.9, 59.0, 7);   -- alerta 70

INSERT INTO alerta (id_leitura, id_sensor) VALUES
	(4, 1),
    (5, 1),
    (8, 1),
    (10, 1),
	(14, 2),
    (15, 2),
    (18, 2),
    (20, 2),
	(24, 3),
    (25, 3),
    (28, 3),
    (30, 3),
	(34, 4),
    (36, 4),
    (39, 4),
    (40, 4),
	(44, 5),
    (45, 5),
    (48, 5),
    (50, 5),
	(54, 6),
    (55, 6),
    (58, 6),
    (60, 6),
	(64, 7),
    (65, 7),
    (68, 7),
    (70, 7);

select s.identificacao as nome from sensor as s join barril as b on b.id_barril = s.id_barril
join cave as c on c.id_cave = b.id_cave
where c.id_empresa = 1;

CREATE VIEW vw_dash AS
	SELECT
		b.identificacao AS Barril,
		tu.nome AS 'Vinho armazenado',
		l.temperatura as Temperatura,
		CONCAT(tu.temperatura_minima, 'C - ', tu.temperatura_maxima, 'C') AS 'Faixa de Temperatura Ideal',
		CASE
		  WHEN l.temperatura > tu.temperatura_maxima THEN 'Temperatura ALTA'
		  WHEN l.temperatura < tu.temperatura_minima THEN 'Temperatura BAIXA'
		  ELSE 'OK'
		END AS 'Status Temperatura',
		l.umidade as Umidade,
		CONCAT(tu.umidade_minima, '% - ', tu.umidade_maxima, '%') AS 'Faixa de Umidade Ideal',
		CASE
		  WHEN l.umidade > tu.umidade_maxima THEN 'Umidade ALTA'
		  WHEN l.umidade < tu.umidade_minima THEN 'Umidade BAIXA'
		  ELSE 'OK'
		END AS 'Status Umidade',
		l.data_hora_registro AS 'Data e Hora Leitura'
	  FROM barril AS b
		JOIN uva AS tu
			ON b.id_uva = tu.id_uva
		JOIN sensor AS s
			ON b.id_barril = s.id_barril
		JOIN leitura AS l
			ON s.id_sensor = l.id_sensor;

SELECT * FROM vw_dash;

CREATE VIEW vw_leitura_atual AS
	SELECT
		l.temperatura,
		l.umidade,
		u.temperatura_minima,
		u.temperatura_maxima,
		u.umidade_minima,
		u.umidade_maxima
	FROM leitura l
	JOIN sensor s ON l.id_sensor = s.id_sensor
	JOIN barril b ON s.id_barril = b.id_barril
	JOIN uva u ON b.id_uva = u.id_uva
	LIMIT 1;
    
SELECT * FROM vw_leitura_atual;    

CREATE VIEW vw_alertas_por_cave AS
	SELECT
		c.id_empresa,
		COUNT(*) AS alertas,
		c.identificacao
	FROM alerta a
	JOIN leitura l ON a.id_leitura = l.id_leitura AND a.id_sensor = l.id_sensor
	JOIN sensor s ON l.id_sensor = s.id_sensor
	JOIN barril b ON s.id_barril = b.id_barril
	JOIN cave c ON b.id_cave = c.id_cave
	GROUP BY c.identificacao, c.id_empresa;

DROP USER 'winetech'@'%';
DROP USER 'winetech-sensor'@'%';

CREATE USER 'winetech-sensor'@'%' IDENTIFIED BY 'Winetech.2025';

GRANT INSERT ON winetech.leitura TO 'winetech-sensor'@'%';

CREATE USER 'winetech'@'%' IDENTIFIED BY 'Winetech.2026';

GRANT SELECT, INSERT, UPDATE, DELETE ON winetech.* TO 'winetech'@'%';

flush privileges;

SELECT user, host FROM mysql.user;

SELECT @@PORT, @@VERSION, @@hostname;

select * from empresa;
select * from usuario;