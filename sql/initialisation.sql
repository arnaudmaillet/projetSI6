DROP database IF EXISTS gestionSession;

Create database gestionSession;

Use gestionSession;

Create table session (
	id int auto_increment,
	email varchar(50) not null,
	password varchar(65) not null,
	nom varchar(25) null,
	prenom varchar(25) null,
	typeSession char(1) not null,
    question varchar(50) not null,
    reponse varchar(65) not null,
	nbEssai int not null,
	etatSession char(1) not null,
    msgSessionBloque longtext null,
	primary key (id)
) engine = innoDB;


insert into Session (email, password, nom, prenom, typeSession, etatSession, nbEssai, question, reponse) values
("arnaud.maillet@saint-remi.net", sha2('1111', 256), "Maillet", "Arnaud", "A", "E", 3, "test", sha2('0000', 256)), 
("aurelien.martin@saint-remi.net", sha2('1111', 256), "Martin", "Aurélien", "U", "E", 3, "test", sha2('0000', 256)),
("Jules.CREUZOT@saint-remi.net", sha2('1111', 256), "Jules", "", "A", "E", 3, "test", sha2('0000', 256)),
("karim.HMIDI@saint-remi.net", sha2('1111', 256), "Hmidi", "", "U", "D", 0, "test", sha2('0000', 256)),
("leonard.PYRAM@saint-remi.net", sha2('1111', 256), "Leonard", "Pyram", "U", "D", 0, "test", sha2('0000', 256)),
("oceance.FOURDAIN@saint-remi.net", sha2('1111', 256), "", "Océance", "U", "E", 3, "test", sha2('0000', 256)),
("jeremy.DAWAGNE@saint-remi.net", sha2('1111', 256), "Jeremy", "", "A", "E", 3, "test", sha2('0000', 256)),
("jeremie.DESSOUT@saint-remi.net", sha2('1111', 256), "Dessout", "", "U", "E", 3, "test", sha2('0000', 256)),
("anton.KREMER@saint-remi.net", sha2('1111', 256), "Kremer", "Anton", "U", "E", 3, "test", sha2('0000', 256)),
("gregoire.MAILLARD@saint-remi.net", sha2('1111', 256), "", "Gregoire", "U", "E", 3, "test", sha2('0000', 256)),
("kevin.HERBET@saint-remi.net", sha2('1111', 256), "Herbet", "Kevin", "U", "E", 3, "test", sha2('0000', 256)),
("pierre.DELAPORTE@saint-remi.net", sha2('1111', 256), "Delaporte", "", "U", "E", 3, "test", sha2('0000', 256)),
("theo.DELAPORTE@saint-remi.net", sha2('1111', 256), "Delaporte", "Théo", "U", "E", 3, "test", sha2('0000', 256)),
("yanis.MEZGHACHE@saint-remi.net", sha2('1111', 256), "", "Yanis", "U", "E", 3, "test", sha2('0000', 256)),
("alexis.NANCELLE@saint-remi.net", sha2('1111', 256), "Nancelle", "ALexis", "U", "E", 3, "test", sha2('0000', 256)),
("alexandre.BOULOGNE@saint-remi.net", sha2('1111', 256), "", "Alexandre", "U", "E", 3, "test", sha2('0000', 256)),
("corentin.POSSON@saint-remi.net", sha2('1111', 256), "Posson", "Corentin", "A", "E", 3, "test", sha2('0000', 256));


create table theme (
   id int auto_increment,
   nom varchar(50) not null,
   primary key (id)
) engine = InnoDB;

create table questionForum (
   id int auto_increment,
   date_maj char(19) not null,
   idSession int not null,
   libelle longtext not null,
   idTheme int not null,
   primary key (id),
   foreign key (idSession) references session(id) on delete cascade,
   foreign key (idTheme) references theme(id)
) engine = InnoDB;

create table reponseForum (
   id int auto_increment,
   date_ajout char(19) not null,
   idSession int not null,
   libelle longtext not null,
   idQuestionForum int not null,
   primary key (id),
   foreign key (idSession) references session(id) on delete cascade,
   foreign key (idQuestionForum) references questionForum(id) on delete cascade
) engine = InnoDB;

create view affichageQuestionForum as
select questionForum.id as idQuestion, questionForum.date_maj ,questionForum.idSession, questionForum.libelle, questionForum.idTheme, session.email, session.nom, session.prenom
from session, questionForum
where session.id = questionForum.idSession;

create view affichageReponseForum as
select reponseForum.id as idReponse, reponseForum.date_ajout, reponseForum.libelle, questionForum.id as idQuestion, session.email, session.nom, session.prenom
from session, reponseForum, questionForum
where session.id = reponseForum.idSession
and questionForum.id = reponseForum.idQuestionForum;


insert into theme(id, nom) values 
  (1, "Bienvenue sur le site"),
  (2, "Charte des règles à respecter");
  
insert into questionForum (id, date_maj, idSession, libelle, idtheme) values
  (1, NOW(), 1, "<p>Bienvenue sur notre site de gestion des comptes. Les administrateurs sont là pour vous aider</p>", 1),
  (2, NOW(), 2, "<p>Quelles sont les règles à respecter ?</p>", 2),
  (3, NOW(), 2, "<p>Comment fonctionne le site</p>", 1),
  (4, NOW(), 2, "<p>Si des utilisateurs ne respectent pas la charte, Merci de le signaler ici</p>", 2),
  (5, NOW(), 1, "<p>test1</p>", 1),
  (6, NOW(), 3, "<p>test2</p>", 1),
  (7, NOW(), 14, "<p>test3</p>", 1),
  (8, NOW(), 5, "<p>test4</p>", 1),
  (9, NOW(), 6, "<p>test5</p>", 1),
  (10, NOW(), 3, "<p>test6</p>", 1),
  (11, NOW(), 2, "<p>test7</p>", 1),
  (12, NOW(), 12, "<p>test8</p>", 1),
  (13, NOW(), 10, "<p>test9</p>", 1),
  (14, NOW(), 5, "<p>test10</p>", 1);
  
insert into reponseForum (id, date_ajout, idSession, libelle, idQuestionForum) values
(1, NOW(), 1, "<p>Pour le moment les administrateurs sont Arnaud MAILLET et Aurélien MARTIN</p>", 1),
(2, NOW(), 1, "<p>Sur demande, d'autres utilisateurs peuvent être assignés au grade d'administrateur</p>", 1),
(3, NOW(), 2, "<p>Cette page vous permet de discuter entre vous sur le forum du site</p>", 3),
(4, NOW(), 13, "<p>test1</p>", 5),
(5, NOW(), 3, "<p>test2</p>", 5),
(6, NOW(), 3, "<p>test3</p>", 5),
(7, NOW(), 14, "<p>test4</p>", 5),
(8, NOW(), 6, "<p>test5</p>", 5),
(9, NOW(), 3, "<p>test6</p>", 5),
(10, NOW(), 7, "<p>test7</p>", 5),
(11, NOW(), 12, "<p>test8</p>", 5),
(12, NOW(), 10, "<p>test9</p>", 5),
(13, NOW(), 6, "<p>test10</p>", 5),
(14, NOW(), 11, "<p>test11</p>", 5),
(15, NOW(), 10, "<p>test12</p>", 5),
(16, NOW(), 7, "<p>test13</p>", 5),
(17, NOW(), 9, "<p>test14</p>", 5),
(18, NOW(), 8, "<p>test15</p>", 5),
(20, NOW(), 1, "<p>test16</p>", 5);


select * from affichageQuestionForum;
select * from affichageReponseForum;

Select etatSession from Session
    where etatSession = 'E';
    



