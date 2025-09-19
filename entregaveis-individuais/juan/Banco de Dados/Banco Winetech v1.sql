/*
Integrantes:

GRUPO 11
Juan
Leo 
Otavio
Rafa
Marlon
Yuri

*/

/*

empresa (1) → (N) usuario
→ uma empresa pode ter vários usuários (funcionários).
empresa (1) → (N) barril
→ cada empresa possui vários barris.
tipoVinho (1) → (N) barril
→ um tipo de vinho pode estar em vários barris.
barril (1) → (N) sensor_DHT11
→ cada barril recebe várias leituras (monitoramento).

*/


SHOW DATABASES;

-- Criando banco
CREATE DATABASE winetech;
USE winetech;

-- EMPRESA (Vinícola)
CREATE TABLE empresa (
    idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    cnpj CHAR(14) NOT NULL UNIQUE,
    telefone VARCHAR(20),
    email VARCHAR(100),
    cidade VARCHAR(100),
    uf CHAR(2),
    pais VARCHAR(50) DEFAULT 'Brasil',
    dtCadastro DATETIME DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO empresa (nome, cnpj, telefone, email, cidade, uf) VALUES
('Vinícola Vale Verde', '12345678000199', '11999998888', 'contato@vale.com', 'Bento Gonçalves', 'RS'),
('Vinícola Serra Azul', '98765432000111', '21988887777', 'contato@serra.com', 'São Roque', 'SP'),
('Vinícola Ouro Branco', '45612378000155', '31977776666', 'contato@ouro.com', 'Curitiba', 'PR'),
('Vinícola Monte Alto', '32165498000122', '51966665555', 'contato@monte.com', 'Caxias do Sul', 'RS'),
('Vinícola Pampa Fino', '74125896000144', '47955554444', 'contato@pampa.com', 'Joinville', 'SC');


-- USUÁRIO (Funcionários/Enólogos)
CREATE TABLE usuario (
    idUsuario INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    cpf CHAR(11) NOT NULL UNIQUE,
    email VARCHAR(100),
    senha VARCHAR(30) NOT NULL,
    dtCadastro DATETIME DEFAULT CURRENT_TIMESTAMP,
    fkEmpresa INT NOT NULL,
    CONSTRAINT fk_usuario_empresa FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa)
);

INSERT INTO usuario (nome, cpf, email, senha, fkEmpresa) VALUES
('Carlos Ferreira', '12345678901', 'carlos@vale.com', '12345', 1),
('Ana Souza', '98765432109', 'ana@serra.com', 'abcde', 2),
('Marcos Lima', '45678912300', 'marcos@ouro.com', 'senha123', 3),
('Juliana Rocha', '65498732111', 'juliana@monte.com', '123abc', 4),
('Fernanda Alves', '85296374122', 'fernanda@pampa.com', 'qwerty', 5);


-- BARRIL
CREATE TABLE barril (
    idBarril INT PRIMARY KEY AUTO_INCREMENT,
    codigoIdentificacao VARCHAR(30) NOT NULL, -- Ex: B-2025-01
    capacidadeLitros DECIMAL(6,2) DEFAULT 225.00,
    valorEstimado DECIMAL(10,2),
    dtCadastro DATETIME DEFAULT CURRENT_TIMESTAMP,
    fkEmpresa INT NOT NULL,
    CONSTRAINT fk_barril_empresa FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa),
    fkTipoVinho INT NOT NULL,
    CONSTRAINT fk_barril_tipovinho FOREIGN KEY (fkTipoVinho) REFERENCES tipoVinho(idTipo)
);

INSERT INTO barril (codigoIdentificacao, capacidadeLitros, valorEstimado, fkEmpresa, fkTipoVinho) VALUES
('B-2025-01', 225.00, 15000.00, 1, 1),
('B-2025-02', 200.00, 18000.00, 2, 2),
('B-2025-03', 300.00, 20000.00, 3, 3),
('B-2025-04', 225.00, 17000.00, 4, 4),
('B-2025-05', 250.00, 16000.00, 5, 5);


-- Sensor DHT_11
CREATE TABLE sensor_DHT11 (
    idSensor INT PRIMARY KEY AUTO_INCREMENT,
    tempAtual DECIMAL(5,2) NOT NULL,
    umidAtual DECIMAL(5,2) NOT NULL,
    dtHora DATETIME DEFAULT CURRENT_TIMESTAMP,
    fkBarril INT NOT NULL,
    CONSTRAINT fk_monitoramento_barril FOREIGN KEY (fkBarril) REFERENCES barril(idBarril)
);

INSERT INTO sensor_DHT11 (tempAtual, umidAtual, fkBarril) VALUES
(15.50, 65.00, 1),  -- dentro do ideal (Merlot: 12–18°C, 60–70%)
(20.00, 75.00, 2),  -- acima do ideal (Cabernet: máx 19°C, umid máx 68%)
(9.50, 55.00, 3),   -- abaixo do ideal (Chardonnay: min 10°C, umid min 58%)
(14.00, 70.00, 4),  -- limite superior, ainda aceitável
(18.50, 60.00, 5);  -- próximo do limite superior do Pinot Noir

-- TIPO DE VINHO
CREATE TABLE tipoVinho (
    idTipo INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(50) NOT NULL, -- Ex: Merlot, Syrah
    temperaturaMin DECIMAL(5,2) NOT NULL,
    temperaturaMax DECIMAL(5,2) NOT NULL,
    umidadeMin DECIMAL(5,2) NOT NULL,
    umidadeMax DECIMAL(5,2) NOT NULL,
    dtSafra DATE
);


INSERT INTO tipoVinho (nome, temperaturaMin, temperaturaMax, umidadeMin, umidadeMax, dtSafra) VALUES
('Merlot', 12.00, 18.00, 60.00, 70.00, '2022-01-01'),
('Syrah', 14.00, 20.00, 57.00, 72.00, '2022-06-01'),
('Carménère', 13.00, 18.00, 58.00, 68.00, '2021-05-01'),
('Malbec', 14.00, 19.00, 59.00, 69.00, '2023-03-01'),
('Tempranillo', 13.00, 18.00, 60.00, 70.00, '2020-01-01');

SELECT * FROM sensor_DHT11;
SELECT * FROM empresa;
SELECT * FROM barril;
SELECT * FROM tipoVinho;
SELECT * FROM usuario;


SELECT *
FROM barril AS b
JOIN empresa AS e ON b.fkEmpresa = e.idEmpresa
JOIN tipoVinho AS t ON b.fkTipoVinho = t.idTipo
JOIN sensor_DHT11 AS s ON b.idBarril = s.fkBarril
LEFT JOIN usuario AS u ON e.idEmpresa = u.fkEmpresa
ORDER BY b.idBarril, s.dtHora;


-- Ver todos os usuários e a empresa em que trabalham
SELECT u.nome AS Usuario, e.nome AS Empresa
FROM usuario u
JOIN empresa e ON u.fkEmpresa = e.idEmpresa;



-- Listar todos os barris com o tipo de vinho e a empresa
SELECT b.codigoIdentificacao, b.capacidadeLitros, b.valorEstimado,
       t.nome AS TipoVinho, e.nome AS Empresa
FROM barril b
JOIN tipoVinho t ON b.fkTipoVinho = t.idTipo
JOIN empresa e ON b.fkEmpresa = e.idEmpresa;



-- Mostrar as leituras de temperatura/umidade e verificar se estão fora do ideal
SELECT 
    b.codigoIdentificacao AS Barril,
    t.nome AS TipoVinho,
    s.tempAtual AS Temperatura,
    s.umidAtual AS Umidade,
    CONCAT(t.temperaturaMin, '°C - ', t.temperaturaMax, '°C') AS FaixaTempIdeal,
    CONCAT(t.umidadeMin, '% - ', t.umidadeMax, '%') AS FaixaUmidIdeal,
    CASE 
        WHEN s.tempAtual < t.temperaturaMin THEN '❌ Temperatura BAIXA'
        WHEN s.tempAtual > t.temperaturaMax THEN '❌ Temperatura ALTA'
        WHEN s.tempAtual = t.temperaturaMax THEN '⚠️ Temperatura no limite superior'
        WHEN s.tempAtual = t.temperaturaMin THEN '⚠️ Temperatura no limite inferior'
        ELSE '✅ Temperatura OK'
    END AS StatusTemp,
    CASE 
        WHEN s.umidAtual < t.umidadeMin THEN '❌ Umidade BAIXA'
        WHEN s.umidAtual > t.umidadeMax THEN '❌ Umidade ALTA'
        WHEN s.umidAtual = t.umidadeMax THEN '⚠️ Umidade no limite superior'
        WHEN s.umidAtual = t.umidadeMin THEN '⚠️ Umidade no limite inferior'
        ELSE '✅ Umidade OK'
    END AS StatusUmid
FROM sensor_DHT11 s
JOIN barril b ON s.fkBarril = b.idBarril
JOIN tipoVinho t ON b.fkTipoVinho = t.idTipo;
