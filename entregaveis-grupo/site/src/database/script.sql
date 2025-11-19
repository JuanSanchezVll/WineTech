create DATABASE winetech;

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
  id_funcionario INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(45) NOT NULL,
  sobrenome VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  senha VARCHAR(255) NOT NULL,
  nivel_acesso TINYINT NOT NULL DEFAULT 3,
  ativo BOOLEAN DEFAULT TRUE,
  data_hora_registro DATETIME DEFAULT CURRENT_TIMESTAMP,
  id_empresa INT NOT NULL,
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
  umidade_maxima DECIMAL(5,2) NOT NULL
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
  gravidade VARCHAR(45) NOT NULL,
  status VARCHAR(45) NOT NULL,
  data_hora_registro DATETIME DEFAULT CURRENT_TIMESTAMP,
  id_leitura INT NOT NULL UNIQUE,

  CONSTRAINT pk_alerta PRIMARY KEY (id_alerta, id_leitura),
  CONSTRAINT fk_alerta_leitura FOREIGN KEY (id_leitura) REFERENCES leitura (id_leitura),
  CONSTRAINT chk_gravidade CHECK (gravidade IN ('baixa', 'media', 'alta')),
  CONSTRAINT chk_status CHECK (status IN ('nao resolvido', 'em manutencao', 'resolvido'))
);

INSERT INTO empresa (cnpj, razao_social, nome_fantasia, email_contato, codigo_seguranca, data_hora_registro) VALUES
('00000000000001', 'Vinícola Nova Era S.A.', 'Nova Era Vinhos', 'contato@novaera.com', 'SEGRT54321', '2024-01-01 10:00:00'),
('00000000000002', 'Adega Superior Ltda.', 'Adega Master', 'suporte@masteradega.com', 'XCVBN09876', '2024-01-02 11:00:00'),
('00000000000003', 'Vinhos Finos do Sul', 'Vino Sul', 'financeiro@vinosul.com.br', 'QWERT67890', '2024-01-03 12:00:00');

INSERT INTO endereco (logradouro, numero, complemento, bairro, cidade, estado, cep, id_empresa) VALUES
('Rua dos Aromas', '45', 'Galpão A', 'Vinhedo Central', 'Jundiaí', 'SP', '13200001', 1),
('Avenida do Sol', '1200', 'Escritório', 'Laranjeiras', 'Caxias do Sul', 'RS', '95000002', 2),
('Travessa da Lua', '22', 'Fundos', 'Centro Velho', 'Bento Gonçalves', 'RS', '95700003', 3);

INSERT INTO nivel_acesso (id_nivel_acesso, nome, descricao) VALUES
  (1, 'Equipe WineTech', 'Visualiza todas as empresas cadastradas e pode alterar a situação de constrato (ativo/inativo)'),
  (2, 'Administrador', 'Tem permissão total nas entidades da empresa'),
  (3, 'Enólogo', 'Tem permissão total nas entidades da empresa exceto em funcionários'),
  (4, 'Operador', 'Tem acesso apenas a dashboard');

INSERT INTO usuario (nome, sobrenome, email, senha, data_hora_registro, id_empresa, id_nivel_acesso) VALUES
('Julia', 'Alves', 'julia.a@novaera.com', 'senha001', '2024-01-04 13:00:00', 1, 2),
('Pedro', 'Santos', 'pedro.s@novaera.com', 'senha002', '2024-01-05 14:00:00', 1, 3),
('Alice', 'Rocha', 'alice.r@masteradega.com', 'senha003', '2024-01-06 15:00:00',1, 4);

INSERT INTO cave (identificacao, id_empresa) VALUES
('CAVE-JDI-A', 1),
('CAVE-JDI-B', 1),
('CAVE-CSUL-A', 2);

INSERT INTO uva (nome, temperatura_minima, temperatura_maxima, umidade_minima, umidade_maxima) VALUES
('Merlot', 14.00, 16.00, 60.00, 75.00),
('Cabernet Sauvignon', 14.00, 16.00, 60.00, 75.00),
('Malbec', 14.00, 16.00, 60.00, 75.00);

INSERT INTO barril (identificacao, id_cave, id_uva) VALUES
('BARRIL-001A', 1, 1),
('BARRIL-002B', 1, 2),
('BARRIL-003C', 2, 3);

INSERT INTO sensor (identificacao, id_barril) VALUES
('SEN-T-001', 1),
('SEN-T-002', 2),
('SEN-H-003', 3);

INSERT INTO leitura (temperatura, umidade, data_hora_registro, id_sensor) VALUES
(15.50, 68.00, '2024-09-25 16:00:00', 1),
(18.20, 81.00, '2024-09-25 16:05:00', 2),
(10.00, 72.00, '2024-09-25 16:10:00', 3);
 
INSERT INTO alerta (gravidade, status, id_leitura) VALUES
  ('media', 'nao resolvido', 2),
  ('baixa', 'nao resolvido', 3);

SELECT
    b.identificacao AS Barril,
    tu.nome AS 'Vinho armazenado',
    ls.temperatura as Temperatura,
    CONCAT(tu.temperatura_minima, 'C - ', tu.temperatura_maxima, 'C') AS 'Faixa de Temperatura Ideal',
    CASE
      WHEN ls.temperatura > tu.temperatura_maxima THEN 'Temperatura ALTA'
      WHEN ls.temperatura < tu.temperatura_minima THEN 'Temperatura BAIXA'
      ELSE 'OK'
    END AS 'Status Temperatura',
    ls.umidade as Umidade,
    CONCAT(tu.umidade_minima, '% - ', tu.umidade_maxima, '%') AS 'Faixa de Umidade Ideal',
    CASE
      WHEN ls.umidade > tu.umidade_maxima THEN 'Umidade ALTA'
      WHEN ls.umidade < tu.umidade_minima THEN 'Umidade BAIXA'
      ELSE 'OK'
    END AS 'Status Umidade',
    ls.data_hora_registro AS 'Data e Hora Leitura'
  FROM barril AS b
    JOIN uva AS tu
        ON b.id_uva = tu.id_uva
    JOIN sensor AS s
        ON b.id_barril = s.id_barril
    JOIN leitura AS ls
        ON s.id_sensor = ls.id_sensor;

-- CRIAR USUÁRIO E DAR AS PERMISSÕES
CREATE USER 'winetech-sensor'@'%' IDENTIFIED BY 'Winetech.2025';

GRANT INSERT ON winetech.leitura TO 'winetech-sensor'@'%';

CREATE USER 'winetech'@'%' IDENTIFIED BY 'Winetech.2026';

GRANT SELECT, INSERT, UPDATE, DELETE ON winetech.* TO 'winetech'@'%';

flush privileges;

SELECT user, host FROM mysql.user;

SELECT @@PORT, @@VERSION, @@hostname;

select * from empresa;
select * from usuario;
USE winetech;

