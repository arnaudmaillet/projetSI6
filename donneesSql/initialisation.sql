DROP database IF EXISTS connexion;

Create database connexion;

Use connexion;

Create table Utilisateur (
	id int auto_increment,
	email varchar(50) not null,
	password varchar(30) not null,
	nom varchar(25) null,
	prenom varchar(25) null,
	avatar varchar(50) null,
	typeCompte char(1) not null,
	etatCompte char(1) not null,
	primary key (id)
) engine = innoDB;

insert into Utilisateur (email, password, nom, prenom, typeCompte, etatCompte) values 
("aurelien.martin@saint-remi.net", "1111", "Martin", "Aurélien", "U", "E"),
("arnaud.maillet@saint-remi.net", "1111", "Maillet", "Arnaud", "U", "E");

