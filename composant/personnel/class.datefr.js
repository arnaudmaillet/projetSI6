/**
 * Classe permettant de gérer des dates
 *
 * @Author : Guy Verghote
 * @Version : 2019.1
 * @date : 31/12/2019
 */

class DateFr {

    // -----------------------------------
    // méthode statiques(à portée classe)
    // -----------------------------------

    /**
     * retourne vrai si l'année est bissextile
     *
     * @param {number} annee
     * @return {boolean}
     */

    static estBissextile(annee) {
        return (annee % 4 === 0 && annee % 100 !== 0) || annee % 400 === 0;
    }

    /**
     * retourne le nombre de jours d'un mois
     *
     * @param {number} annee
     * @param {number} mois
     * @return {number} nombre de jours
     */
    static joursDansMois(mois, annee) {
        if (mois === 2) return DateFr.estBissextile(annee) ? 29 : 28;
        if (mois === 4 || mois === 6 || mois === 9 || mois === 11) return 30;
        return 31;
    }

    /**
     * retourne le nombre de jours d'une année
     *
     * @param {number} annee
     * @return {number} nombre de jours dans l'année
     */
    static joursDansAnnee(annee) {
        return DateFr.estBissextile(annee) ? 366 : 365;
    }

    /**
     * retourne le nombre de jours écoulés depuis le premier janvier de l'année
     *
     * @param {number} annee
     * @param {number} mois
     * @param {number} jour
     * @return {number} nombre de jours
     */
    static quantieme(jour, mois, annee) {
        let total = jour;
        let i = 1;
        while (i !== mois) {
            total += DateFr.joursDansMois(i, annee);
            i++;
        }
        return total;
    }

    /**
     * retourne la différence de jours entre 2 années
     *
     * @param {number} a1 annéé de départ
     * @param {number}a2 année d'arrivée
     * @return {number}
     */
    static joursEntre2Annees(a1, a2) {
        let annee = a1;
        let nbJour = 0;
        while (annee !== a2) {
            nbJour += DateFr.joursDansAnnee(annee);
            annee++;
        }
        return nbJour;
    }

    /**
     * Retourne le nombre de jours entre deux dates
     * @param {DateFr} dateDebut
     * @param {DateFr} dateFin
     * @return {number} Nombre de jours entre les deuxs dates
     */

    static joursEntre2Dates(dateDebut, dateFin) {
        return dateFin.nbJour - dateDebut.nbJour;
    }

    /**
     * contrôle la validité de la date saisie
     *
     * @param {number} jour
     * @param {number} mois
     * @param {number} annee
     * @return {boolean} true/false
     */

    static estValide(jour, mois, annee) {
        return (mois >= 1 && mois <= 12 && jour >= 1 && jour <= DateFr.joursDansMois(mois, annee) && annee >= 1900);
    }

    /**
     * retourne le mois en lettre et sa particule de ou d'
     *
     * @param {number} mois moins en chiffre
     * @return  {array} tableau associatif contenant la particule et le mois en lettre
     */

    static getLeMois(mois) {
        let result = {};
        result['particule'] = "de ";
        switch (mois) {
            case 1 :
                result['libelle'] = "janvier";
                break;
            case 2 :
                result['libelle'] = "février";
                break;
            case 3 :
                result['libelle'] = "mars";
                break;
            case 4 :
                result['libelle'] = "avril";
                result['particule'] = "d'";
                break;
            case 5 :
                result['libelle'] = "mai";
                break;
            case 6 :
                result['libelle'] = "juin";
                break;
            case 7 :
                result['libelle'] = "juillet";
                break;
            case 8 :
                result['libelle'] = "août";
                result['particule'] = "d'";
                break;
            case 9 :
                result['libelle'] = "septembre";
                break;
            case 10 :
                result['libelle'] = "octobre";
                result['particule'] = "d'";
                break;
            case 11 :
                result['libelle'] = "novembre";
                break;
            case 12 :
                result['libelle'] = "décembre";
                break;
            default :
                result['libelle'] = "erreur";
                break;
        }
        return result;

    }

    /**
     * Retourne la date correspondant au premier jour d'une semaine dans le calendrier français
     * @param {number} annee
     * @param {number} numSemaine
     * @return {DateFr}
     */

    static getDebutSemaine(annee, numSemaine) {
        // on se place sur le 4 janvier qui est forcément dans la semaine 1
        let uneDate = new DateFr(4, 1, annee);

        // on détermine le lundi de la première semaine
        // si le 4/01 est un lundi(1) 0, mardi(2) - 1, ... Dimanche(7) -6 soit 1 - n° du jour
        uneDate.ajouterJour(1 - uneDate.getJourSemaine());

        // on calcule le décalage en ajoutant 7 * numsemaine
        uneDate.ajouterJour((numSemaine - 1) * 7);
        return uneDate;
    }


    // méthodes statiques retournant un objet DateFr

    /**
     * génération d'un objet date représentant la date du jour
     *
     * @return {DateFr}
     */
    static getDateDuJour() {
        let now = new Date();
        let annee = now.getFullYear();
        let mois = now.getMonth() + 1;
        let jour = now.getDate();
        return new DateFr(jour, mois, annee);
    }

    /**
     * génération d'un objet date à partir d'une date au format Mysql aaaa-mm-jj
     *
     * @param {DateFr} uneDateMysql
     * @return {DateFr}
     */

    static getFromDateMysql(uneDateMysql) {
        let lesElements = /^(\d{4})[-/.](\d{1,2})[-/.](\d{1,2})$/.exec(uneDateMysql);

        let jour = parseInt(lesElements[3], 10);
        let mois = parseInt(lesElements[2], 10);
        let annee = parseInt(lesElements[1], 10);
        if (DateFr.estValide(jour, mois, annee)) {
            return new DateFr(jour, mois, annee);
        } else {
            return 0;
        }
    }

    /**
     * génération d'un objet date à partir à partir d'une date au format jj/mm/aaaa
     * quelque soit le séparateur :: / - . et le format j ou jj m ou mm
     *
     * @param {DateFr} uneDateFr
     * @return {DateFr}
     */
    static getFromDateFr(uneDateFr) {
        let lesElements = /^(\d{1,2})[-/.](\d{1,2})[-/.](\d{4})$/.exec(uneDateFr);
        let jour = parseInt(lesElements[1], 10);
        let mois = parseInt(lesElements[2], 10);
        let annee = parseInt(lesElements[3], 10);
        if (DateFr.estValide(jour, mois, annee)) {
            return new DateFr(jour, mois, annee);
        } else {
            return 0;
        }
    }

    /**
     * Retourne le dimanche de Pâques
     *
     * @param {number} annee
     * @return {DateFr}
     */
    static getPaques(annee) {
        let paques;
        let var1 = annee % 19 + 1;
        let var2 = (annee / 100) + 1;
        var2 = Math.floor(var2); // problème car le nombre n'est pas arrondi
        let var3 = ((3 * var2) / 4) - 12;
        var3 = Math.floor(var3);
        let var4 = (((8 * var2) + 5) / 25) - 5;
        var4 = Math.floor(var4);
        let var5 = ((5 * annee) / 4) - var3 - 10;
        var5 = Math.floor(var5);
        let var6 = (11 * var1 + 20 + var4 - var3) % 30;
        var6 = Math.floor(var6);
        if ((var6 == 25 && var1 > 11) || (var6 == 24)) {
            var6 = var6 + 1;
        }
        let var7 = 44 - var6;
        if (var7 < 21) {
            var7 = var7 + 30;
        }
        var7 = var7 + 7;
        var7 = var7 - (var5 + var7) % 7;
        if (var7 <= 31) {
            paques = new DateFr(var7, 3, annee);
        }
        else {
            paques = new DateFr(var7 - 31, 4, annee);
        }
        return (paques);
    }

    /**
     * Retourne les jours fériés de l'année
     *
     * @param {number} annee
     * @return {array}
     */

    static getLesJoursFeries(annee) {
        let lesJoursFeries = {};
        let paques = DateFr.getPaques(annee);
        lesJoursFeries["Jour de l'an"] = new DateFr(1, 1, annee);
        lesJoursFeries["Fête du travail"] = new DateFr(1, 5, annee);
        lesJoursFeries["8 mai 1945"] = new DateFr(8, 5, annee);
        lesJoursFeries["Fête Nationale"] = new DateFr(14, 7, annee);
        lesJoursFeries["Assomption"] = new DateFr(15, 8, annee);
        lesJoursFeries["Toussaint"] = new DateFr(1, 11, annee);
        lesJoursFeries["Armistice 1918"] = new DateFr(11, 11, annee);
        lesJoursFeries["Noël"] = new DateFr(25, 12, annee);
        lesJoursFeries["Pâques"] = paques;
        let lundiPaques = new DateFr();
        lundiPaques.nbJour = paques.nbJour + 1;
        lesJoursFeries["Lundi de Pâques"] = lundiPaques;

        let jeudiAscension = new DateFr();
        jeudiAscension.nbJour = paques.nbJour + 39;
        lesJoursFeries["Jeudi de l'Ascension"] = jeudiAscension;

        let lundiPentecote = new DateFr();
        lundiPentecote.nbJour = paques.nbJour + 50;
        lesJoursFeries["Lundi de Pentecôte"] = lundiPentecote;
        return lesJoursFeries;
    }


    /**
     * constructeur d'un objet date à partir de trois paramètres
     * @param {number} jour
     * @param {number} mois
     * @param {number} annee
     */

    // sanbs paramètre le constructeur retourne la date du jour.
    constructor(jour = 0, mois = 0, annee = 0) {
		if (jour == 0 && mois == 0 && annee == 0) {
			let now = new Date();
			annee = now.getFullYear();
			mois = now.getMonth() + 1;
			jour = now.getDate();
		}
        if (DateFr.estValide(jour, mois, annee)) {
            this.nbJour = DateFr.joursEntre2Annees(1900, annee) + DateFr.quantieme(jour, mois, annee);
        } else {
            this.nbJour = 1;
        }
    }

    /**
     * transformation de nbJour en un tableau contenant l'année le mois et le jour correspondant
     *
     * @return {array} lesElements tableau contenant l'année; le mois et le jour en chiffre
     */
    getLesElements() {
        let lesElements = {};
        lesElements['annee'] = 1900;
        lesElements['mois'] = 1;
        let nbJour = this.nbJour;
        while (nbJour > DateFr.joursDansAnnee(lesElements['annee'])) {
            nbJour -= DateFr.joursDansAnnee(lesElements['annee']);
            lesElements['annee']++;
        }
        while (nbJour > DateFr.joursDansMois(lesElements['mois'], lesElements['annee'])) {
            nbJour -= DateFr.joursDansMois(lesElements['mois'], lesElements['annee']);
            lesElements['mois']++;
        }
        lesElements['jour'] = nbJour;
        return lesElements;
    }


    // -----------------------------------
    // méthode sur les objets
    // -----------------------------------

    /**
     * retourne le nombre de jours écoulés depuis le 01/01/1900
     *
     * @return {number}
     */
    getNbJour() {
        return this.nbJour;
    }

    /**
     * retourne le jour en chiffre
     *
     * @return {string}
     */
    getJour() {
        let lesElements = this.getLesElements();
        return lesElements['jour'];
    }

    /**
     * retourne le jour en lettre
     *
     * @return {string}
     */
    getJourEnLettre() {
        let numJour = this.getJourSemaine();
        let nomJour;
        switch (numJour) {
            case 1 :
                nomJour = "lundi";
                break;
            case 2 :
                nomJour = "mardi";
                break;
            case 3 :
                nomJour = "mercredi";
                break;
            case 4 :
                nomJour = "jeudi";
                break;
            case 5 :
                nomJour = "vendredi";
                break;
            case 6 :
                nomJour = "samedi";
                break;
            case 7 :
                nomJour = "dimanche";
                break;
            default :
                nomJour = "erreur";
                break;
        }
        return nomJour;
    }

    /**
     * retourne le mois en chiffre
     *
     * @return {number}
     */
    getMois() {
        return this.getLesElements()['mois'];
    }

    /**
     * retourne le mois en lettre
     *
     * @return {string}
     */
    getMoisEnLettre() {
        let numMois = this.getMois();
        let nomMois;
        switch (numMois) {
            case 1 :
                nomMois = "janvier";
                break;
            case 2 :
                nomMois = "février";
                break;
            case 3 :
                nomMois = "mars";
                break;
            case 4 :
                nomMois = "avril";
                break;
            case 5 :
                nomMois = "mai";
                break;
            case 6 :
                nomMois = "juin";
                break;
            case 7 :
                nomMois = "juillet";
                break;
            case 8 :
                nomMois = "août";
                break;
            case 9 :
                nomMois = "septembre";
                break;
            case 10 :
                nomMois = "octobre";
                break;
            case 11 :
                nomMois = "novembre";
                break;
            case 12 :
                nomMois = "décembre";
                break;
            default :
                nom = "erreur";
                break;
        }
        return nomMois;
    }

    /**
     * retourne l'année
     *
     * @return {number}
     */
    getAnnee() {
        return this.getLesElements()['annee'];
    }

    /**
     * retourne le numéro du jour dans la semaine
     *(lundi = 1, mardi = 2....)
     *
     * @return {number}
     */
    getJourSemaine() {
        return (this.nbJour - 1) % 7 + 1;
    }

    /**
     * retourne le nombre de jours écoulés depuis le premier janvier de l'année
     *
     * @return {number}
     */
    getQuantieme() {
        return DateFr.quantieme(this.getJour(), this.getMois(), this.getAnnee());
    }

    /**
     * Retourne le nombre de jours dans le mois
     *
     * @return {number}
     */
    getNbJoursMois() {
        return DateFr.joursDansMois(this.getMois(), this.getAnnee());
    }

    /**
     * retourne le numéro de la semaine
     *
     * @return {number}
     */
    getNumeroSemaine() {
        let jeudi = new DateFr(this.getJour(), this.getMois(), this.getAnnee());
        jeudi.ajouterJour(4 - this.getJourSemaine());
        let le4janvier = new DateFr(4, 1, jeudi.getAnnee());
        let lundi = new DateFr(le4janvier.getJour(), le4janvier.getMois(), le4janvier.getAnnee());
        lundi.ajouterJour(1 - le4janvier.getJourSemaine());
        let nbSemaine = 0;
        let numjour = lundi.nbJour;
        while (numjour <= jeudi.nbJour) {
            numjour += 7;
            nbSemaine++;
        }
        return nbSemaine;
    }

    /**
     * méthode ajoutant un nombre nb de jour à un objet date
     *
     * @param {number} nb nombre de jours à ajouter
     */
    ajouterJour(nb) {
        this.nbJour += nb;
    }

    /**
     * méthode retirant un nombre nb de jour à un objet date
     *
     * @param {number} nb nombre de jours à retirer
     */
    retirerJour(nb) {
        this.nbJour -= nb;
		if (this.nbJour < 0) {
			this.nbJour = 0;
		}
    }

     /**
     * méthode ajoutant un nombre d'année à un objet date
     *
     * @param {number} nb nombre de jours à ajouter
     */
    ajouterAnnee(nb) {
        let lesElements = this.getLesElements();
		let jour = lesElements["jour"];
        let mois = lesElements["mois"];
		let annee = lesElements["annee"] + nb;
		this.nbJour = DateFr.joursEntre2Annees(1900, annee) + DateFr.quantieme(jour, mois, annee);
    }

    /**
     * méthode retirant un nombre d'année à un objet date
     *
     * @param {number} nb nombre d'année à retirer
     */
    retirerAnnee(nb) {
        let lesElements = this.getLesElements();
		let jour = lesElements["jour"];
        let mois = lesElements["mois"];
		let annee = lesElements["annee"] - nb;
		if (annee < 1900) {
			this.nbJour = 0;
		} else {
			this.nbJour = DateFr.joursEntre2Annees(1900, annee) + DateFr.quantieme(jour, mois, annee);
		}
    }
	
	/**
     * méthode ajoutant un nombre de mois à un objet date
     *
     * @param {number} nb nombre de mois à ajouter
	 * Si on part du dernier jour du mois on doit retomber sur le dernier jour 
	 * 
     */
    ajouterMois(nb) {
        let lesElements = this.getLesElements();
		let jour = lesElements["jour"];
        let mois = lesElements["mois"];
		let annee = lesElements["annee"];
        let dernierJour = DateFr.joursDansMois(mois, annee) == jour;
		for (let i = 1; i <= nb; i++)
		{
			mois++;
			if (mois > 12)
			{
				mois = 1;
				annee++;
			}
			
		}
		if (jour > DateFr.joursDansMois(mois, annee ) || dernierJour)
		{
			jour = DateFr.joursDansMois(mois, annee);
		}
		this.nbJour = DateFr.joursEntre2Annees(1900, annee) + DateFr.quantieme(jour, mois, annee);
    }

    /**
     * méthode retirant un nombre de mois à un objet date
     *
     * @param {number} nb nombre de mois à retirer
	 * Si on part du dernoer jour du mois on doit retomber sur le dernier jour 
     */
    retirerMois(nb) {
        let lesElements = this.getLesElements();
		let jour = lesElements["jour"];
        let mois = lesElements["mois"];
		let annee = lesElements["annee"];
		let dernierJour = DateFr.joursDansMois(mois, annee) == jour;
		for (let i = 1; i <= nb; i++)
		{
			mois--;
			if (mois < 1)
			{
				mois = 12;
				annee--;
				if (annee < 1900) {
					this.nbJour = 0;
					return;
				}
			}

		}
		if (jour > DateFr.joursDansMois(mois, annee) || dernierJour )
		{
			jour = DateFr.joursDansMois(mois, annee);
		}
		this.nbJour = DateFr.joursEntre2Annees(1900, annee) + DateFr.quantieme(jour, mois, annee);
    }
	
	
	

    /**
     * méthode de comparaison
     *
     * @param {DateFr} uneDate objet date utilisé pour la comparaison
     * @return {boolean} si les dates sont identiques
     */
    estEgale(uneDate) {
        return this.nbJour === uneDate.nbJour;
    }

    /**
     * méthode de comparaison
     *
     * @param {DateFr} uneDate objet date utilisé pour la comparaison
     * @return {boolean} si la date est plus grande que uneDate
     */
    estPlusGrande(uneDate) {
        return this.nbJour > uneDate.nbJour;
    }
	
	/**
     * méthode de comparaison
     *
     * @param {DateFr} uneDate objet date utilisé pour la comparaison
     * @return {boolean} si la date est plus grande que uneDate
     */
    estApres(uneDate) {
        return this.nbJour > uneDate.nbJour;
    }

    /**
     * méthode de comparaison
     *
     * @param {DateFr} uneDate objet date utilisé pour la comparaison
     * @return true si la date est plus petite que uneDate
     */
    estPlusPetite(uneDate) {
        return this.nbJour < uneDate.nbJour;
    }
	
	/**
     * méthode de comparaison
     *
     * @param {DateFr} uneDate objet date utilisé pour la comparaison
     * @return true si la date est plus petite que uneDate
     */
    estAvant(uneDate) {
        return this.nbJour < uneDate.nbJour;
    }

    /**
     * retourne l'écart en jours avec la date passée en paramètre
     *
     * @param {DateFr} uneDate
     * @return {number} number Nombre de jours
     */

    ecartEnJours(uneDate) {
        return this.nbJour - uneDate.nbJour;
    }

    /**
     * retourne vrai si le jour est férié
     *
     * @return {boolean}
     */
    estFerie() {
        let lesElements = this.getLesElements();
        let annee = lesElements['annee'];
        let mois = lesElements['mois'];
        let jour = lesElements['jour'];
        let resultat = false;
        if ((mois === 1 && jour === 1) || (mois === 5 && jour === 1) ||
            (mois === 5 && jour === 8) || (mois === 7 && jour === 14) ||
            (mois === 8 && jour === 15) || (mois === 11 && jour === 11) ||
            (mois === 11 && jour === 1) || (mois === 12 && jour === 25)) {
            resultat = true;
        } else {
            let var1, var2, var3, var4, var5, var6, var7;
            let paques;
            var1 = annee % 19 + 1;
            var2 = (annee / 100) + 1;
            var2 = Math.floor(var2); // problème car le nombre n'est pas arrondi
            var3 = ((3 * var2) / 4) - 12;
            var3 = Math.floor(var3);
            var4 = (((8 * var2) + 5) / 25) - 5;
            var4 = Math.floor(var4);
            var5 = ((5 * annee) / 4) - var3 - 10;
            var5 = Math.floor(var5);
            var6 = (11 * var1 + 20 + var4 - var3) % 30;
            var6 = Math.floor(var6);
            if ((var6 == 25 && var1 > 11) || (var6 == 24)) {
                var6 = var6 + 1;
            }
            var7 = 44 - var6;
            if (var7 < 21) {
                var7 = var7 + 30;
            }
            var7 = var7 + 7;
            var7 = var7 - (var5 + var7) % 7;
            if (var7 <= 31) {
                paques = new DateFr(var7, 3, annee);
            }
            else {
                paques = new DateFr(var7 - 31, 4, annee);
            }

            if (this.nbJour == paques.nbJour || this.nbJour == paques.nbJour + 1 || this.nbJour == paques.nbJour + 39 || this.nbJour == paques.nbJour + 50) {
                resultat = true;
            }
        }
        return resultat;
    }

    /*
    *   retourne le nom du jour férié
    *
    * @return {string}
    */
    getNomJourFerie() {
        let nom = "";
        let lesElements = this.getLesElements();
        let annee = lesElements['annee'];
        let mois = lesElements['mois'];
        let jour = lesElements['jour'];
        let paques = DateFr.getPaques(annee);

        if (mois == 1 && jour == 1) {
            nom = "jour de l'An";
        }
        else if (mois == 5 && jour == 1) {
            nom = "Fête de Travail";
        }
        else if (mois == 5 && jour == 8) {
            nom = "victoire 1945";
        }
        else if (mois == 7 && jour == 14) {
            nom = "Fête Nationale";
        }
        else if (mois == 8 && jour == 15) {
            nom = "Assomption";
        }
        else if (mois == 11 && jour == 1) {
            nom = "Toussaint";
        }
        else if (mois == 11 && jour == 11) {
            nom = "Armistice 1918";
        }
        else if (mois == 12 && jour == 25) {
            nom = "Noël";
        }
        if (this.nbJour == paques.nbJour) {
            nom = "Pâques";
        }
        else if (this.nbJour == paques.nbJour + 1) {
            nom = "Lundi de Pâques";
        }
        else if (this.nbJour == paques.nbJour + 39) {

            nom = "Ascencion";
        }
        else if (this.nbJour == paques.nbJour + 50) {
            nom = "Lundi de Pentecôte";
        }
        return (nom);
    }

    /**
     * retourne vrai si le jour est un jour ouvrable : du lundi au vendredi sauf jour férié
     *
     * @return {boolean}
     */
    estJourOuvrable() {
        return !this.estFerie() && this.getJourSemaine() < 6;
    }

    /**
     * retourne le jour ouvrable suivant : du lundi au vendredi sauf jour férié
     *
     * @return {DateFr}
     */

    getJourOuvrableSuivant() {
        let jourOuvrableSuivant = new DateFr();
        jourOuvrableSuivant.nbJour = this.nbJour + 1;
        while (!jourOuvrableSuivant.estJourOuvrable()) {
            jourOuvrableSuivant.nbJour += 1;
        }
        return jourOuvrableSuivant;
    }

    /**
     * retourne le jour ouvrable précédent : du lundi au vendredi sauf jour férié
     *
     * @return {DateFr}
     */

    getJourOuvrablePrecedent() {
        let jourOuvrablePrecedent = new DateFr();
        jourOuvrablePrecedent.nbJour = this.nbJour - 1;
        while (!jourOuvrablePrecedent.estJourOuvrable()) {
            jourOuvrablePrecedent.nbJour -= 1;
        }
        return jourOuvrablePrecedent;
    }

    /**
     * retourne la date au format jj/mm/aaaa. Le séparateur à utiliser est passé en paramètre
     *
     * @param {string} separateur séparateur entre les éléments d'une date
     * @return {string} au format jj/mm/aaaa
     */
    toFormatCourt(separateur = "/") {
        let lesElements = this.getLesElements();
        return ("0" + lesElements['jour']).slice(-2) + separateur + ("0" + lesElements['mois']).slice(-2) + separateur + lesElements['annee'];
    }

    /**
     * retourne la date au format au format jjjj jj mmmm aaaa en remplaçant jj par premier lorsque j = 1j
     *
     * @return {string}
     */
    toFormatLong() {
        let lesElements = this.getLesElements();
        let d = this.getJourEnLettre() + " ";
        if (lesElements['jour'] === 1) {
            d += "premier";
        } else {
            d += ("0" + lesElements['jour']).slice(-2)
        }
        d += " " + this.getMoisEnLettre() + " " + lesElements['annee'];
        return d;
    }

    /**
     * retourne la date au format Mysql aaaa-mm-jj
     *
     * @return {string}
     */
    toFormatMySQL() {
        let lesElements = this.getLesElements();
        return lesElements['annee'] + "-" + ("0" + lesElements['mois']).slice(-2) + "-" + ("0" + lesElements['jour']).slice(-2);
    }
	
	// conserver à titre de compatibilité des anciennes versions
	
    toMySQL() {
        let lesElements = this.getLesElements();
        return lesElements['annee'] + "-" + ("0" + lesElements['mois']).slice(-2) + "-" + ("0" + lesElements['jour']).slice(-2);
    }

	toFormatMysql() {
        let lesElements = this.getLesElements();
        return lesElements['annee'] + "-" + ("0" + lesElements['mois']).slice(-2) + "-" + ("0" + lesElements['jour']).slice(-2);
    }

}