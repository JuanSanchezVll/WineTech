create database projeto_pi;

use projeto_pi;

create table empresa (
	id_empresa int primary key auto_increment,
    razao_social varchar(100) not null,
    nome_fantasia varchar(100) not null,
    cnpj char(14) unique not null
);

create table usuario (
	id_usuario int primary key auto_increment,
    nome varchar(45) not null,
    sobrenome varchar(100) not null,
    email varchar(100) not null,
    senha varchar(255) not null,
    nivel_acesso tinyint,
    fk_empresa int not null,
    
    constraint chkNivel check (nivel_acesso >= 1 and nivel_acesso <= 5),
    constraint foreign key (fk_empresa) references empresa (id_empresa)
);

create table setor (
	id_setor int primary key auto_increment,
    nome varchar(45) not null,
    fk_empresa int not null,
    
    constraint foreign key (fk_empresa) references empresa (id_empresa)
);

create table sensor (
	id_sensor int primary key auto_increment,
    nome varchar(45) not null,
    fk_setor int not null,
    
    constraint foreign key (fk_setor) references setor (id_setor)
);

create table captura (
	id_captura int primary key auto_increment,
    valor decimal(5, 2),
    data_registro datetime default current_timestamp,
    fk_sensor int not null,
    
    constraint foreign key (fk_sensor) references sensor (id_sensor)
);

