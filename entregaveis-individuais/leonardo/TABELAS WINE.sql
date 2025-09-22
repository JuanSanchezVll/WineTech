CREATE DATABASE wine;
USE wine;

-- Cadastro de empresas
CREATE TABLE cadastro_empresa (
    idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
    empresa VARCHAR(100),
    cnpj VARCHAR(18),
    email VARCHAR(320),
    senha VARCHAR(100),
    telefone VARCHAR(20),
    endereco VARCHAR(300),
    dtIngresso DATE
);

-- Cadastro de usuários
CREATE TABLE cadastro_usuarios (
    idUsuario INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(150),
    funcao VARCHAR(10),
    fkUsuario INT,
        CONSTRAINT chkFuncao 
            CHECK(funcao IN('Gestor', 'Analista')),
		CONSTRAINT fkCadastroUsuario
			FOREIGN KEY (fkUsuario)
				REFERENCES cadastro_empresa (fkUsuario),
    email VARCHAR(320),
    senha VARCHAR(100)
);

-- Login empresa
CREATE TABLE login_empresa (
    idLogin INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100),
    senha VARCHAR(100),
    fkcadastro INT UNIQUE,
		CONSTRAINT 
			FOREIGN KEY (fkCadastro)
            REFERENCES cadastro_empresa(idEmpresa)
);

-- Cadastro sensor
CREATE TABLE sensor (
    idSensor INT PRIMARY KEY AUTO_INCREMENT,
    tipo VARCHAR(50),
    unidadeMedida VARCHAR(20),
    descricao VARCHAR(200)
);

-- Dados coletados pelos sensores (baseado no arduino que você já tinha)
CREATE TABLE dados_sensor (
    idDado INT PRIMARY KEY AUTO_INCREMENT,
    valor VARCHAR(20),
    dtColeta DATE,
    horaColeta TIME,
    fkSensor INT,
		CONSTRAINT fksensordados
			FOREIGN KEY (fkSensor) 
				REFERENCES sensor(idSensor)
);

-- Contratos (já tinha, ajustei para vincular empresa)
CREATE TABLE contrato (
    idContrato INT PRIMARY KEY AUTO_INCREMENT,
    idEmpresa INT,
    dtInicio DATE,
    dtFim DATE,
    qtdSensores INT,
    unidades VARCHAR(1000),
    estado VARCHAR(11),
        CONSTRAINT chkEstado
            CHECK(estado IN('ativo', 'pausa', 'cancelado')),
	fkEmpresaContrato INT UNIQUE,
		CONSTRAINT fkEmpresaContratoRenovavel
			FOREIGN KEY (fkEmpresaContrato) 
				REFERENCES cadastro_empresa(idEmpresa)
);
