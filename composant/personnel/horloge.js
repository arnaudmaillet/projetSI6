/*
    Affichage d'une horloge digitale
    Version utilisation d'une classe Horloge contenant deux méthodes statiques et une méthode dessiner
    Un objet Horloge contient un attribut ctx représentant le context de la zone de dessin
    La balise canvas est générée au chargement
    utilisation :
        Définir une balise conteneur ayant comme id 'horloge'
        lui associer éventuellement un attribut data-size pour définir la taille souhaitée : au minumum 100
        <div id="horloge" data-size=100></div>
        Charger le script horloge2.js dans votre page html.
 */

class Horloge {

     #ctx; // définition d'un attribut privé


    constructor(ctx) {
        this.ctx = ctx;
    }

    static distance(xA, yA, xB, yB) {
        return Math.sqrt(Math.pow(xB - xA, 2) + Math.pow(yB - yA, 2));
    }

    static dessinerFleche(ctx, xA, yA, xB, yB, ArrowLength, ArrowWidth, ArrowInset) {
        if (ArrowLength === undefined) ArrowLength = 10;
        if (ArrowWidth === undefined) ArrowWidth = 8;
        if (ArrowInset === undefined) ArrowInset = 10;
        ctx.lineCap = "round";
        ctx.fillStyle = ctx.strokeStyle;
        let AB = this.distance(xA, yA, xB, yB);
        let xBp = xB + ArrowInset * (xB - xA) / AB;
        let yBp = yB + ArrowInset * (yB - yA) / AB;
        let xC = xB + ArrowLength * (xA - xB) / AB;
        let yC = yB + ArrowLength * (yA - yB) / AB;
        let xD = xC + ArrowWidth * (-(yB - yA)) / AB;
        let yD = yC + ArrowWidth * ((xB - xA)) / AB;
        let xE = xC - ArrowWidth * (-(yB - yA)) / AB;
        let yE = yC - ArrowWidth * ((xB - xA)) / AB;
        ctx.beginPath();
        ctx.moveTo(xA, yA);
        ctx.lineTo(xB, yB);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(xD, yD);
        ctx.lineTo(xB, yB);
        ctx.lineTo(xE, yE);
        ctx.lineTo(xBp, yBp);
        ctx.fill();
    }

    dessiner() {
        let now = new Date();
        let seconde = now.getSeconds();
        let minute = now.getMinutes();
        let heure = now.getHours();
        this.ctx.save();
        this.ctx.clearRect(0, 0, 400, 400);
        this.ctx.translate(200, 200);
        // dessiner cadran
        this.ctx.fillStyle = "black";
        this.ctx.beginPath();
        this.ctx.arc(0, 0, 10, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.beginPath();
        this.ctx.lineWidth = 5;
        this.ctx.strokeStyle = '#24445C';
        this.ctx.arc(0, 0, 180, 0, Math.PI * 2);
        this.ctx.stroke();

        // dessiner heure
        //let valeur = ('0' + heure).slice(-2) + ":" + ('0' + minute).slice(-2) + ":" + ('0' + seconde).slice(-2);
        this.ctx.font = 'Bold 28px Sans-Serif';
        //this.ctx.textAlign = "center";
        //this.ctx.fillText(valeur, 0, -100);

        // dessiner séparation
        this.ctx.lineWidth = 2;
        for (let i = 0; i < 60; i++){
            this.ctx.beginPath();
            if (i % 5 === 0){
                this.ctx.strokeStyle = '#24445C';
                this.ctx.moveTo(160, 0);
                this.ctx.lineTo(180, 0);
            }
            else {
                this.ctx.strokeStyle = 'FireBrick';
                this.ctx.moveTo(165, 0);
                this.ctx.lineTo(180, 0);
            }
            this.ctx.stroke();
            this.ctx.rotate(Math.PI / 30);
        }
		
        // dessiner chiffre
        for (let i = 1; i <= 12; i++) {
            let angle = Math.PI / 6 * (i - 3);
            let x = Math.cos(angle) * 145;
            let y = Math.sin(angle) * 145;
            this.ctx.textBaseline = "middle";
            this.ctx.textAlign = "center";
            this.ctx.fillStyle = "black";
            this.ctx.fillText(i.toString(), x, y);
        }

            // une rotation de - PI/2 pour faire correspondre le 0° à 0 h o mn 0 s
        this.ctx.rotate(-Math.PI / 2);
        // dessiner Trotteuse
        let angle = seconde / 30 * Math.PI;
        let x = Math.cos(angle) * 170;
        let y = Math.sin(angle) * 170;
        this.ctx.strokeStyle = "#D40000";
        this.ctx.lineWidth = 4;
        Horloge.dessinerFleche(this.ctx, 0, 0, x, y);

        // dessiner Grande Aiguille
        angle = minute / 30 * Math.PI;
        x = Math.cos(angle) * 150;
        y = Math.sin(angle) * 150;
        this.ctx.strokeStyle = "#007bff";
        this.ctx.lineWidth = 6;
        Horloge.dessinerFleche(this.ctx, 0, 0, x, y, 1, 4, 10);

        // dessiner Petite Aiguille();
        angle = heure / 6 * Math.PI + minute / 360 * Math.PI + seconde / 21600 * Math.PI;
        x = Math.cos(angle) * 130;
        y = Math.sin(angle) * 130;
        this.ctx.strokeStyle = "black";
        this.ctx.lineWidth = 8;
        Horloge.dessinerFleche(this.ctx, 0, 0, x, y, 1, 4, 15);
		
		
        this.ctx.restore();
    }
}

window.addEventListener("load", initHorloge, false);


function initHorloge() {
    let size = horloge.dataset.size;
    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');
    let taux = size / 400;
    canvas.height = size;
    canvas.width = size;
    ctx.scale(taux, taux);
    horloge.appendChild(canvas);
    let uneHorloge = new Horloge(ctx);
    setInterval(function (){uneHorloge.dessiner();}, 1000);
}


