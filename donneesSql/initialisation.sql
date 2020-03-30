DROP database IF EXISTS Connexion;

Create database connexion;

Use connexion;

Create table Utilisateur (
	id int auto_increment,
	email varchar(50) not null,
	password varchar(30) not null,
	nom varchar(25) not null,
	prenom varchar(25) not null,
	avatar varchar(50) not null,
	typeCompte char(1) not null,
	etatCompte char(1) not null,
	primary key (id)
) engine = innoDB;

insert into Utilisateur values 
(null, "aurelien.martin@saint-remi.net", "1111", "Martin", "Aurélien", "avatar", "U", "E"),
(null, "arnaud.maillet@saint-remi.net", "1111", "Maillet", "Arnaud", "avatar", "U", "E");
