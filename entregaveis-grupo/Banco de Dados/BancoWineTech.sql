CREATE DATABASE winetech;
 use winetech;

CREATE TABLE endereco (
  idEndereco INT PRIMARY KEY AUTO_INCREMENT,
  logradouro VARCHAR(255) NOT NULL,
  numero VARCHAR(10) NOT NULL,
  complemento VARCHAR(100),
  bairro VARCHAR(100) NOT NULL,
  cidade VARCHAR(100) NOT NULL,
  estado CHAR(2) NOT NULL,
  cep CHAR(9) NOT NULL
);

CREATE TABLE empresa (
  idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
  cnpj CHAR(14) UNIQUE NOT NULL,
  razaoSocial VARCHAR(200) NOT NULL,
  nomeFantasia VARCHAR(100),
  emailContato VARCHAR(100) UNIQUE,
  codigoSeguranca VARCHAR(255),
  situacaoContrato TINYINT,
  dataRegistro DATETIME NOT NULL,
  fk_endereco INT UNIQUE,
  CONSTRAINT FKendereco FOREIGN KEY (fk_endereco) REFERENCES endereco(idEndereco)
);

CREATE TABLE funcionario (
  idFuncionario INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(45) NOT NULL,
  sobrenome VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  senha VARCHAR(255) NOT NULL,
  nivelAcesso TINYINT,
  ativo TINYINT,
  dataRegistro DATETIME NOT NULL,
  fk_Empresa INT,
  CONSTRAINT FKempresa FOREIGN KEY (fk_Empresa) REFERENCES empresa(idEmpresa)
);

CREATE TABLE cave (
  idCave INT PRIMARY KEY AUTO_INCREMENT,
  identificacao VARCHAR(45) UNIQUE NOT NULL,
  fk_Empresa INT,
  CONSTRAINT FKempresaCave FOREIGN KEY (fk_Empresa) REFERENCES empresa(idEmpresa)
);

CREATE TABLE tipoUva (
  idTipoUva INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(45) NOT NULL,
  temperaturaMaxima DECIMAL(5,2),
  temperaturaMinima DECIMAL(5,2),
  umidadeMaxima DECIMAL(5,2),
  umidadeMinima DECIMAL(5,2)
);

CREATE TABLE barril (
  idBarril INT PRIMARY KEY AUTO_INCREMENT,
  identificacao VARCHAR(45) UNIQUE NOT NULL,
  fk_idCave INT,
  fk_TipoUva INT,
 CONSTRAINT FKcave  FOREIGN KEY (fk_idCave) REFERENCES cave(idCave),
 CONSTRAINT FKTipoUva  FOREIGN KEY (fk_TipoUva) REFERENCES tipoUva(idTipoUva)
);

CREATE TABLE sensor (
  idSensor INT PRIMARY KEY AUTO_INCREMENT,
  identificacao VARCHAR(45) UNIQUE NOT NULL,
  fk_idBarril INT,
 CONSTRAINT FKbarril FOREIGN KEY (fk_idBarril) REFERENCES barril(idBarril)
);

CREATE TABLE leituraSensor (
  idLeituraSensor INT PRIMARY KEY AUTO_INCREMENT,
  temperatura DECIMAL(5,2) NOT NULL,
  umidade DECIMAL(5,2) NOT NULL,
  dataRegistro DATETIME NOT NULL,
  fk_idSensor INT,
  CONSTRAINT FKsensor FOREIGN KEY (fk_idSensor) REFERENCES sensor(idSensor)
);

CREATE TABLE alerta (
  idAlerta INT PRIMARY KEY AUTO_INCREMENT,
  gravidade_alerta VARCHAR(30) NOT NULL,
  dt_hora_alerta DATETIME NOT NULL,
  status_manutencao VARCHAR(45),
  fk_leituraSensor INT,
 CONSTRAINT FKalerta  FOREIGN KEY (fk_leituraSensor) REFERENCES leituraSensor(idLeituraSensor)
);


INSERT INTO endereco (logradouro, numero, complemento, bairro, cidade, estado, cep) VALUES
('Rua dos Aromas', '45', 'Galpão A', 'Vinhedo Central', 'Jundiaí', 'SP', '13200-001'),
('Avenida do Sol', '1200', 'Escritório', 'Laranjeiras', 'Caxias do Sul', 'RS', '95000-002'),
('Travessa da Lua', '22', 'Fundos', 'Centro Velho', 'Bento Gonçalves', 'RS', '95700-003');

INSERT INTO tipoUva (nome, temperaturaMaxima, temperaturaMinima, umidadeMaxima, umidadeMinima) VALUES
('Tannat', 17.00, 13.00, 75.00, 60.00),
('Merlot', 16.50, 12.00, 80.00, 65.00),
('Sauvignon Blanc', 12.00, 8.00, 78.00, 68.00);

select * from tipoUva;

INSERT INTO empresa (cnpj, razaoSocial, nomeFantasia, emailContato, codigoSeguranca, situacaoContrato, dataRegistro, fk_endereco) VALUES
('00000000000001', 'Vinícola Nova Era S.A.', 'Nova Era Vinhos', 'contato@novaera.com', 'SEGRT54321', 1, '2024-01-01 10:00:00', 1),
('00000000000002', 'Adega Superior Ltda.', 'Adega Master', 'suporte@masteradega.com', 'XCVBN09876', 1, '2024-01-02 11:00:00', 2),
('00000000000003', 'Vinhos Finos do Sul', 'Vino Sul', 'financeiro@vinosul.com.br', 'QWERT67890', 0, '2024-01-03 12:00:00', 3);

INSERT INTO funcionario (nome, sobrenome, email, senha, nivelAcesso, ativo, dataRegistro, fk_Empresa) VALUES
('Julia', 'Alves', 'julia.a@novaera.com', 'senha001', 2, 1, '2024-01-04 13:00:00', 1),
('Pedro', 'Santos', 'pedro.s@novaera.com', 'senha002', 1, 1, '2024-01-05 14:00:00', 1),
('Alice', 'Rocha', 'alice.r@masteradega.com', 'senha003', 2, 1, '2024-01-06 15:00:00', 2);

INSERT INTO cave (identificacao, fk_Empresa) VALUES
('CAVE-JDI-A', 1),
('CAVE-JDI-B', 1),
('CAVE-CSUL-A', 2);

INSERT INTO barril (identificacao, fk_idCave, fk_TipoUva) VALUES
('BARRIL-001A', 1, 1), -- Cave JDI-A, Tannat
('BARRIL-002B', 1, 2), -- Cave JDI-A, Merlot
('BARRIL-003C', 2, 3); -- Cave JDI-B, Sauvignon Blanc
select * from barril;
INSERT INTO sensor (identificacao, fk_idBarril) VALUES
('SEN-T-001', 1),
('SEN-T-002', 2),
('SEN-H-003', 3);
select * from sensor;

INSERT INTO leituraSensor (temperatura, umidade, dataRegistro, fk_idSensor) VALUES
(15.50, 68.00, '2024-09-25 16:00:00', 13),
(18.20, 81.00, '2024-09-25 16:05:00', 14),
(10.00, 72.00, '2024-09-25 16:10:00', 15);
select * from leituraSensor;

INSERT INTO alerta (gravidade_alerta, dt_hora_alerta, status_manutencao, fk_leituraSensor) VALUES
('URGENTE', '2024-09-25 16:00:01', 'CORRIGIDO', 10),
('CRÍTICA', '2024-09-25 16:05:01', 'PENDENTE', 11),
('MODERADA', '2024-09-25 16:10:01', 'AGENDADO', 12);

SELECT
    b.identificacao AS Barril,
    t.nome AS TipoUva,
    ls.temperatura AS TemperaturaAtual,
    ls.umidade AS UmidadeAtual,
    CONCAT(t.temperaturaMinima, '°C - ', t.temperaturaMaxima, '°C') AS FaixaTempIdeal,
    CONCAT(t.umidadeMinima, '% - ', t.umidadeMaxima, '%') AS FaixaUmidIdeal,
    CASE
        WHEN ls.temperatura < t.temperaturaMinima THEN '❌ Temperatura BAIXA'
        WHEN ls.temperatura > t.temperaturaMaxima THEN '❌ Temperatura ALTA'
        ELSE '✅ Temperatura OK'
    END AS StatusTemp,
    
    CASE
        WHEN ls.umidade < t.umidadeMinima THEN '❌ Umidade BAIXA'
        WHEN ls.umidade > t.umidadeMaxima THEN '❌ Umidade ALTA'
        ELSE '✅ Umidade OK'
    END AS StatusUmid
FROM leituraSensor ls
JOIN sensor s ON ls.fk_idSensor = s.idSensor
JOIN barril b ON s.fk_idBarril = b.idBarril
JOIN tipoUva t ON b.fk_TipoUva = t.idTipoUva;