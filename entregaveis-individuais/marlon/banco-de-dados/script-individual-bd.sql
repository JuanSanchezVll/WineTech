create database projeto_pi;

use projeto_pi;

create table empresa (
	id_empresa int primary key auto_increment,
    razao_social varchar(100) not null,
    nome_fantasia varchar(100) not null,
    cnpj char(14) not null unique
);

create table funcionario (
	id_usuario int primary key auto_increment,
    nome varchar(45) not null,
    sobrenome varchar(100) not null,
    email varchar(100) not null unique,
    senha varchar(255) not null,
    nivel_acesso tinyint not null default 3,
    fk_empresa int not null,
    
    constraint chkNivel check (nivel_acesso >= 1 and nivel_acesso <= 3),
    constraint foreign key (fk_empresa) references empresa (id_empresa)
);

create table endereco (
	id_endereco int primary key auto_increment,
    cep char(8) not null,
    logradouro varchar(150) not null,
    numero varchar(12),
    cidade varchar(150) not null,
    uf char(2) not null
);

create table filial (
	id_filial int primary key auto_increment,
    nome varchar(100) not null,
    fk_endereco int not null,
    fk_empresa int not null,
    
    constraint foreign key (fk_endereco) references endereco (id_endereco),
    constraint foreign key (fk_empresa) references empresa (id_empresa)
);

create table setor (
	id_setor int primary key auto_increment,
    nome varchar(45) not null,
    fk_filial int not null,
    
    constraint foreign key (fk_filial) references filial (id_filial)
);

create table sensor (
	id_sensor int primary key auto_increment,
    nome varchar(45) not null,
    fk_setor int not null,
    
    constraint foreign key (fk_setor) references setor (id_setor)
);

create table captura (
	id_captura int primary key auto_increment,
    valor decimal(5, 2) not null,
    data_registro datetime default current_timestamp,
    tipo varchar(10) not null,
    fk_sensor int not null,
    
    constraint chkTipo check (tipo in ('temperatura', 'umidade')),
    constraint foreign key (fk_sensor) references sensor (id_sensor)
);

