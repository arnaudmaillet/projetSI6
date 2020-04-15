DROP database IF EXISTS connexion;

Create database connexion;

Use connexion;

Create table Session (
	id int auto_increment,
	email varchar(50) not null,
	password varchar(30) not null,
	nom varchar(25) null,
	prenom varchar(25) null,
	avatar varchar(50) null,
	typeCompte char(1) not null,
	etatCompte char(1) not null,
    nbEssai int not null,
	primary key (id)
) engine = innoDB;

insert into Session (email, password, nom, prenom, typeCompte, etatCompte, nbEssai) values 
("aurelien.martin@saint-remi.net", "1111", "Martin", "Aurélien", "U", "E", 3);

insert into Session (email, password, nom, prenom, typeCompte, etatCompte, nbEssai) values 
("arnaud.maillet@saint-remi.net", "1111", "Maillet", "Arnaud", "U", "E", 3);

select * from Session;

Select etatCompte from Session
    where etatCompte = 'E';


