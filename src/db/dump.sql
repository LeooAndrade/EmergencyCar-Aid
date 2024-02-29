create table cliente(
	id serial primary key,
	nome text not null,
  email varchar(200) not null unique,
  senha text not null,
  celular varchar(11) not null unique
  )

create table prestador_de_servicos (
  id serial primary key,
  nome text not null,
  servico text not null,
  email varchar(200) not null unique,
  senha text not null,
  celular varchar(11) not null unique,
  endereco varchar(250)
)

create table servicos_utilizados (
  id serial primary key,
  cliente_id integer references cliente(id),
  prestador_id integer references prestador_de_servicos(id),
  descricao varchar(250) not null
)


