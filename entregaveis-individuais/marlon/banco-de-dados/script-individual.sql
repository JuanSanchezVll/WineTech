create database winetech;

use winetech;

create table empresa (
	idEmpresa int primary key auto_increment,
    cnpj char(14) not null unique,
    razaoSocial varchar(200) not null,
    nomeFantasia varchar(100),
    emailContato varchar(100),
    telefoneContato varchar(100),
    codigoSeguranca varchar(255) not null unique,
    situacaoContrato tinyint not null default 0,
	dataRegistro datetime default current_timestamp,
    
    constraint chkSituacaoContrato check (situacaoContrato in (0, 1))
);

create table funcionario (
	idFuncionario int primary key auto_increment,
    nome varchar(45) not null,
    sobrenome varchar(100) not null,
    email varchar(100) not null unique,
    senha varchar(255) not null,
    nivelAcesso tinyint not null,
    dataRegistro datetime default current_timestamp,
    idEmpresa int not null,
    
    constraint chkNivelAcesso check (nivelAcesso in (1, 2, 3)),
    constraint foreign key (idEmpresa) references empresa (idEmpresa)
);

create table cave (
	idCave int primary key auto_increment,
    identificacao varchar(45) not null,
    idEmpresa int not null,
    
    constraint foreign key (idEmpresa) references empresa (idEmpresa)
);

create table tipoVinho (
	idTipoVinho int primary key auto_increment,
    nome varchar(45) not null,
    temperaturaMinima decimal(5, 2) not null,
    temperaturaMaxima decimal(5, 2) not null,
    umidadeMinima decimal(5, 2) not null,
    umidadeMaxima decimal(5, 2) not null
);

create table barril (
	idBarril int primary key auto_increment,
    identificacao varchar(45) not null,
    idCave int not null,
    idTipoVinho int not null,
    
    constraint foreign key (idCave) references cave (idCave),
    constraint foreign key (idTipoVinho) references tipoVinho (idTipoVinho)
);

create table sensor (
	idSensor int primary key auto_increment,
    identificacao varchar(45) not null,
    idBarril int not null,
    
    constraint foreign key (idBarril) references barril (idBarril)
);

create table leituraSensor (
	idLeituraSensor int primary key auto_increment,
    temperatura decimal(5, 2) not null,
    umidade decimal(5, 2) not null,
    dataRegistro datetime default current_timestamp,
    idSensor int not null,
    
    constraint foreign key (idSensor) references sensor (idSensor)
);