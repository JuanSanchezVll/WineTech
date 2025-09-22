CREATE DATABASE Vinicola;

use Vinicola;

CREATE TABLE Empresa (
    id_empresa INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    cnpj CHAR(14) UNIQUE NOT NULL,
    FKendereco INT UNIQUE,
    dt_cadastro DATETIME,
    CONSTRAINT fk_endereco FOREIGN KEY (FKendereco) REFERENCES Endereco(id_endereco)
);

CREATE TABLE Endereco (
    id_endereco INT AUTO_INCREMENT PRIMARY KEY,
    cep_endereco VARCHAR(9) NOT NULL,
    numero_endereco VARCHAR(20) NULL,
    bairro_endereco VARCHAR(30) NULL,
    cidade_endereco VARCHAR(50) NOT NULL,
    estado_endereco VARCHAR(20) NOT NULL,
    uf_endereco CHAR(2) NOT NULL
);
 
CREATE TABLE Usuario (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    fk_empresa INT NOT NULL,
    nome_usuario VARCHAR(100) NOT NULL,
    email_usuario VARCHAR(100) UNIQUE NOT NULL,
    senha_usuario VARCHAR(50) NOT NULL,
    cargo_usuario VARCHAR(50) NOT NULL,
    permissao_usuario VARCHAR(20) NOT NULL,
    CONSTRAINT chk_permissao_usuario CHECK (permissao_usuario IN ('Admin','Operador', 'Visualizador')),
    CONSTRAINT chk_email_usuario CHECK (email_usuario LIKE '%@%'),
    CONSTRAINT fk_empresa_usuario FOREIGN KEY (fk_empresa) REFERENCES Empresa(id_Empresa)
);

CREATE TABLE Arduino (
    id_arduino INT AUTO_INCREMENT PRIMARY KEY,
	fk_empresa varchar (20) NOT NULL,
    cave_instalacao_arduino VARCHAR(100) NOT NULL,
    stats_arduino VARCHAR(20) NOT NULL,
    temperatura_arduino DECIMAL(5,2) NOT NULL,
    umidade DECIMAL(5,2) NOT NULL,
    dt_hora_arduino DATETIME NOT NULL,
    CONSTRAINT chk_stats_arduino_arduino CHECK (stats_arduino IN ('Ativo', 'Inativo', 'Manutenção'))
);

CREATE TABLE Alerta (
    id_alerta INT AUTO_INCREMENT PRIMARY KEY,
    fk_arduino INT NOT NULL, 
    gravidade_alerta VARCHAR (30),
    dt_hora_alerta DATETIME NOT NULL,
    status_manutenção VARCHAR(20) NOT NULL,
	CONSTRAINT chk_tipo_gravidade_alerta CHECK (gravidade_alerta IN ('Baixa','Alta')),
	CONSTRAINT chk_status_manutenção CHECK (status_manutenção IN ('Acionado', 'Resolvido'))
);

