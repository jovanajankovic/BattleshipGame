 //promenljive za pozicije brodova
 var pocetna_pozicija;
 var krajnja_pozicija;
 var pocetnap;
 var krajnjap;
 var pocetna0;
 var pocetna1;
 var krajnja0;
 var krajnja1;

 //matrica u kojoj se prati gde je igrac postavio svoje brodova
 var matrica_igrac1=[];
 matrica_igrac1[0]=[0,0,0,0,0,0,0,0,0,0];
 matrica_igrac1[1]=[0,0,0,0,0,0,0,0,0,0];
 matrica_igrac1[2]=[0,0,0,0,0,0,0,0,0,0];
 matrica_igrac1[3]=[0,0,0,0,0,0,0,0,0,0];
 matrica_igrac1[4]=[0,0,0,0,0,0,0,0,0,0];
 matrica_igrac1[5]=[0,0,0,0,0,0,0,0,0,0];
 matrica_igrac1[6]=[0,0,0,0,0,0,0,0,0,0];
 matrica_igrac1[7]=[0,0,0,0,0,0,0,0,0,0];
 matrica_igrac1[8]=[0,0,0,0,0,0,0,0,0,0];
 matrica_igrac1[9]=[0,0,0,0,0,0,0,0,0,0];

 //brodovi koji su na pocetku raspolaganju
 var brod_duzina1=4;
 var brod_duzina2=3;
 var brod_duzina3=2;
 var brod_duzina4=1;
 var ukupno_brodova=10;

//igrac
var igrac;

//funkcija koja se poziva prilikom ucitavanja stranice radi izbora igraca
 function ucitavanje(){
    var trenutni_igrac=localStorage.getItem("igrac");
    if(trenutni_igrac!=null){ //znaci da je na redu drugi igrac
        igrac=2;
       var igracdva= localStorage.getItem("igracdva");
       alert("Brodove postavlja: "+ igracdva);
    }
    else{
        igrac=1; //znaci da je prvi igrac na redu
        var igracjedan=localStorage.getItem("igracjedan");
        alert("Brodove postavlja: "+igracjedan);
        }
}

//funkcija za dohvatanje pocetne pozicije koja je napravljena kada se misem pritisne cell u tabeli
 function pocetna(input){
     pocetna_pozicija=$(input).attr("id");
     pocetnap=input;
 }

 //funkcija za racunanje krajnje koordinate,broj brodova, postavljanje brodova u matricu ...
 function krajnja(input){
     krajnja_pozicija=$(input).attr("id");
     krajnjap=input;
     if(pocetna_pozicija!=null && krajnja_pozicija!=null){
        var rastojanje= odredi_rastojanje();      
      }

    if(rastojanje!=null){ //znaci da je ispravan brod zauzet npr ****
        var duzina_broda=rastojanje;
        duzina_broda++;

    //deo koda za proveru da li se brod nalazi tu vec, da se ne bi preklapali
     var check_preklapanje_vertikalno=null;
     var check_preklapanje_horizontalno=null;
    
     if(pocetna1==krajnja1){ //proverava za vertikalne brodove
        check_preklapanje_vertikalno=proveriPreklapanjeBrodaVertikalno(rastojanje);
     }

     if(check_preklapanje_vertikalno== false && check_preklapanje_vertikalno!=null){
         alert("Brodovi ne smeju da se preklapaju");
         return;
     }

     if(pocetna0==krajnja0){
         check_preklapanje_horizontalno=proveriPreklapanjeBrodaHorizontalno(rastojanje);
     }

     if(check_preklapanje_horizontalno==false && check_preklapanje_horizontalno!=null){
         alert("Brodovi ne smeju da se preklapaju");
         return;
     }

     var check_vertikalno=null;
     var check_horizontalno=null;
     /////DEO KODA ZA PROVERU DA LI UOPSTE BROD SME DA BUDE TU

     if(pocetna1==krajnja1){ //za vertikalno proverava
        check_vertikalno=proveriMogucnostPostavljanjaBrodaVertikalno(rastojanje);
     }
     if(check_vertikalno==false && check_vertikalno!=null){
            alert("Brodovi ne smeju biti susedni!");
            return;
     }

     if(pocetna0==krajnja0){//proveravam za horizontalni brod da li mogu da postavim
        check_horizontalno=proveriMogucnostPostavljanjaBrodaHorizontalno(rastojanje);
     }

     if(check_horizontalno==false && check_horizontalno!=null){
         alert("Brodovi ne smeju biti susedni!");
         return;
     }

        if(duzina_broda==1){
            if(brod_duzina1>0){
                brod_duzina1--;
                ukupno_brodova--;
                document.getElementById("brod1").innerHTML=brod_duzina1+" broda duzine 1 polja";
            }
            else{
                alert("Nije vam preostalo vise brodova ovog tipa");
                return;
            }
        }
        if(duzina_broda==2){
            if(brod_duzina2>0){
                brod_duzina2--;
                ukupno_brodova--;
                document.getElementById("brod2").innerHTML=brod_duzina2+" broda duzine 2 polja"; 
            }
            else{
                alert("Nije vam preostalo vise brodova ovog tipa");
                return;
            }
        }
        if(duzina_broda==3){
            if(brod_duzina3>0){
                brod_duzina3--;
                ukupno_brodova--;
                document.getElementById("brod3").innerHTML=brod_duzina3+" broda duzine 3 polja"; 
            }
            else{
                alert("Nije vam preostalo vise brodova ovog tipa");
                return;
            }
        }
        if(duzina_broda==4){
            if(brod_duzina4>0){
                brod_duzina4--;
                ukupno_brodova--;
                document.getElementById("brod4").innerHTML=brod_duzina4+" broda duzine 4 polja"; 
            }
            else{
                alert("Nije vam preostalo vise brodova ovog tipa");
                return;
            }
        }

     if(pocetna0==krajnja0){ //znaci da je horizontalan izbor broda
         matrica_igrac1[pocetna0][pocetna1]=1;
         matrica_igrac1[krajnja0][krajnja1]=1;

     var sledeca_pozicija_horizontalno=parseInt(pocetna_pozicija);
     sledeca_pozicija_horizontalno++;
    
     if(sledeca_pozicija_horizontalno>=0 && sledeca_pozicija_horizontalno<=9){ //znaci da se radi o nultoj vrsti
         for(var i=0;i<rastojanje-1;i++){
             document.getElementById("0"+sledeca_pozicija_horizontalno.toString()).style.background='blue';
             matrica_igrac1[0][sledeca_pozicija_horizontalno]=1;
             sledeca_pozicija_horizontalno++;
         }
     }
     else{ //radi se o preostalim vrstama
         var pom=sledeca_pozicija_horizontalno; //predstavlja celokupan id
         pom=pom%10; //uzima se poslednja cifra kako bi to bila kolona matrice
         for(var i=0;i<rastojanje-1;i++){
             document.getElementById(sledeca_pozicija_horizontalno.toString()).style.background='blue';
             matrica_igrac1[pocetna0][pom]=1;
             sledeca_pozicija_horizontalno++;
             pom=sledeca_pozicija_horizontalno;
             pom=pom%10;
         }
     }
 }
   else if(pocetna1==krajnja1){ //znaci da je vertiakalan izbor broda
         var sledeca_pozicija_vertikalno=parseInt(pocetna_pozicija);
          
         //postavljanje jedinice u matricu za pocetnu i krajnju poziciju
             matrica_igrac1[pocetna0][pocetna1]=1;
             matrica_igrac1[krajnja0][krajnja1]=1;

         sledeca_pozicija_vertikalno+=10;
         var pom=pocetna0;
         pom++;
         for(var i=0;i<rastojanje-1;i++){
            document.getElementById(sledeca_pozicija_vertikalno.toString()).style.background='blue';
            matrica_igrac1[pom][pocetna1]=1;
            sledeca_pozicija_vertikalno+=10;
             pom++;
         }
     }
     pocetnap.style.background='blue';
     krajnjap.style.background='blue';
     
     if(ukupno_brodova==0 && igrac==1){ //znaci da je prvi igrac u pitanju
        alert("Rasporedili ste sve brodove! Pritisnite dugme 'Zavrsi'");
        localStorage.setItem("matrica_prvi_igrac",JSON.stringify(matrica_igrac1));
        localStorage.setItem("igrac",2);
    }
    else if(ukupno_brodova==0 && igrac==2){ //u pitanju je drugi igrac
        localStorage.setItem("matrica_drugi_igrac",JSON.stringify(matrica_igrac1));
        localStorage.removeItem("igrac");
        setTimeout('otvoriIgru()',1000);
    }
}
 }

 function proveriPreklapanjeBrodaVertikalno(distanca){
    var pocetna_pozicija_integer=parseInt(pocetna_pozicija);
    var krajnja_pozicija_integer=parseInt(krajnja_pozicija);
    var num=distanca++;
    num=num-2;
    var jeste=true;

    //promenljive koriscene za lociranje elementa u matrici
    var pocetni_potez_nulta=pocetna0;
    pocetni_potez_nulta++;

    //da li se na pocetnoj poziciji nalazi brod
    if(matrica_igrac1[pocetna0][pocetna1]==1){
        jeste=false;
        return jeste;
    }

    //da li se na krajnjoj poziciji nalazi brod
    if(matrica_igrac1[krajnja0][krajnja1]==1){
        jeste=false;
        return jeste;
    }

    //da li se na poziciji izmedju nalazi brod
    for(var i=0;i<num;i++){
        if(matrica_igrac1[pocetni_potez_nulta][pocetna1]==1){
            jeste=false;
            return jeste;
        }
        pocetni_potez_nulta++;
    }
    return jeste;
 }

 function proveriPreklapanjeBrodaHorizontalno(distanca){
    var pocetna_pozicija_integer=parseInt(pocetna_pozicija);
    var krajnja_pozicija_integer=parseInt(krajnja_pozicija);
    var num=distanca++;
    num=num-2;
    var jeste=true;

    //promenljive koriscene za lociranje elementa u matrici
    var pocetni_potez_prvi=pocetna1;
    pocetni_potez_prvi++;
    
   //da li se na pocetnoj poziciji nalazi brod
    if(matrica_igrac1[pocetna0][pocetna1]==1){
        jeste=false;
        return jeste;
    }

    //da li se na krajnjoj poziciji nalazi brod
    if(matrica_igrac1[krajnja0][krajnja1]==1){
        jeste=false;
        return jeste;
    }

    //da li se na poziciji izmedju nalazi brod
    for(var i=0;i<num;i++){
        if(matrica_igrac1[pocetna0][pocetni_potez_prvi]==1){
            jeste=false;
            return jeste;
        }
        pocetni_potez_prvi++;
    }
    return jeste;
 }

 function proveriMogucnostPostavljanjaBrodaVertikalno(distanca){
    var pocetna_pozicija_integer=parseInt(pocetna_pozicija);
    var krajnja_pozicija_integer=parseInt(krajnja_pozicija);

    //RADI SE O ISPITIVANJU VERTIKALNOG POSTAVLJANJA BRODA
    //proveravam da li postoji neki brod levo od mene
    if(pocetna_pozicija_integer>9 && pocetna_pozicija_integer<90 && krajnja_pozicija_integer>9 && krajnja_pozicija_integer<90){
    var levo;
    var levo_desetica;
    var levo_jedinica;
    var jeste=true;
    levo=pocetna_pozicija_integer-10-1; 
    levo_desetica=pocetna0-1;
    levo_jedinica=pocetna1-1;
    for(var i=0;i<distanca+3;i++){
        if(matrica_igrac1[levo_desetica][levo_jedinica]==1){//znaci neko mi se nalazi sa leve strane
            jeste=false;
            return jeste;
        }
        levo_desetica++;
    }
    //proveravam da li postoji neki brod desno od mene 
    var desno;
    var desno_desetica;
    var desno_jedinica;
    desno=pocetna_pozicija_integer-10+1;
    desno_desetica=pocetna0-1;
    desno_jedinica=pocetna1+1;
    for(var i=0;i<distanca+3;i++){
        if(matrica_igrac1[desno_desetica][desno_jedinica]==1){
            jeste=false;
            return false;
        }
        desno_desetica++;
    }

    //proveravamo da li postoji neki brod iznad mene
    var iznad;
    var iznad_desetica;
    var iznad_jedinica;
    iznad=pocetna_pozicija_integer-10;
    iznad_desetica=pocetna0-1;
    iznad_jedinica=pocetna1;
    if(matrica_igrac1[iznad_desetica][iznad_jedinica]==1){
        jeste=false;
        return jeste;
    }

    //proveravamo da li postoji brod ispod mene
    var ispod;
    var ispod_desetica;
    var ispod_jedinica;
    ispod=krajnja_pozicija_integer+10;
    ispod_desetica=krajnja0+1;
    ispod_jedinica=pocetna1;
    if(matrica_igrac1[ispod_desetica][ispod_jedinica]==1){
        jeste=false;
        return jeste;
    }

//ako je dosao do ovde, znaci da moze da postavi brod
   return jeste;
}
else{ //ZNACI DA SE ZAUZIMA NULTA ILI DEVETA VRSTA, TU IMAM GRANICNE SLUCAJEVE

    if(pocetna_pozicija_integer<10){
//znaci ako je pocetna pozicija <10 ,znaci da se nalazim u nultoj vrsti sto znaci da treba da proverim
//samo levo od mene i desno o mene i dole od mene
    var levo;
    var levo_desetica;
    var levo_jedinica;
    var jeste=true;
    levo=pocetna_pozicija_integer-1; 
    levo_desetica=0;
    levo_jedinica=pocetna1-1;
    for(var i=0;i<distanca+2;i++){
        if(matrica_igrac1[levo_desetica][levo_jedinica]==1){//znaci neko mi se nalazi sa leve strane
            jeste=false;
            return jeste;
        }
        levo_desetica++;
    }
    /////proveravam za desno
    var desno;
    var desno_desetica;
    var desno_jedinica;
    desno=pocetna_pozicija_integer+1;
    desno_desetica=0;
    desno_jedinica=pocetna1+1;
    for(var i=0;i<distanca+2;i++){
        if(matrica_igrac1[desno_desetica][desno_jedinica]==1){
            jeste=false;
            return false;
        }
        desno_desetica++;
    }

    //proveravam za dole
    var ispod;
    var ispod_desetica;
    var ispod_jedinica;
    ispod=krajnja_pozicija_integer+10;
    ispod_desetica=krajnja0+1;
    ispod_jedinica=pocetna1;
    if(matrica_igrac1[ispod_desetica][ispod_jedinica]==1){
        jeste=false;
        return jeste;
    }

    return jeste;
}
    else if(krajnja_pozicija_integer>89){
        //radi se o devetoj vrsti   
    //levo dal moze 
        var levo;
        var levo_desetica;
        var levo_jedinica;
        var jeste=true;
        levo=pocetna_pozicija_integer-10-1; 
        levo_desetica=pocetna0-1;
        levo_jedinica=pocetna1-1;
        for(var i=0;i<distanca+2;i++){
            if(matrica_igrac1[levo_desetica][levo_jedinica]==1){//znaci neko mi se nalazi sa leve strane
                jeste=false;
                return jeste;
            }
            levo_desetica++;
        }

    //desno da li moze da se postavi
        var desno;
        var desno_desetica;
        var desno_jedinica;
        desno=pocetna_pozicija_integer-10+1;
        desno_desetica=pocetna0-1;
        desno_jedinica=pocetna1+1;
        for(var i=0;i<distanca+2;i++){
            if(matrica_igrac1[desno_desetica][desno_jedinica]==1){
                jeste=false;
                return false;
            }
            desno_desetica++;
        }

        //da li ima nekog iznad nas
        var iznad;
        var iznad_desetica;
        var iznad_jedinica;
        iznad=pocetna_pozicija_integer-10;
        iznad_desetica=pocetna0-1;
        iznad_jedinica=pocetna1;
        if(matrica_igrac1[iznad_desetica][iznad_jedinica]==1){
            jeste=false;
            return jeste;
        }

        return jeste;
    }
  }
}

function proveriMogucnostPostavljanjaBrodaHorizontalno(distanca){
    var pocetna_pozicija_integer=parseInt(pocetna_pozicija);
    var krajnja_pozicija_integer=parseInt(krajnja_pozicija);
    if(pocetna_pozicija_integer>9 && pocetna_pozicija_integer<90 && krajnja_pozicija_integer>9 && krajnja_pozicija_integer<90){   
    //proveravamo da li IZNAD mene postoji brod
    var iznad=parseInt(pocetna_pozicija);
    iznad-=10;
    var iznad_desetica=pocetna0-1;
    var iznad_jedinica=pocetna1;
    var jeste=true;
    for(var i=0;i<distanca+1;i++){
        if(matrica_igrac1[iznad_desetica][iznad_jedinica]==1){
            jeste=false;
            return jeste;
        }
        iznad_jedinica++;
    }

    //provera da li postoje brodovi ISPOD mene
    var ispod_desetica=pocetna0+1;
    var ispod_jedinica=pocetna1;
    var jeste=true;
    for(var i=0;i<distanca+1;i++){
        if(matrica_igrac1[ispod_desetica][ispod_jedinica]==1){
            jeste=false;
            return jeste;
        }
        ispod_jedinica++;
    }

    //provera da li postoje brodovi LEVO od mene
    var levo_desetica=pocetna0-1;
    var levo_jedinica=pocetna1-1;
    for(var i=0;i<3;i++){
        if(matrica_igrac1[levo_desetica][levo_jedinica]==1){
            jeste=false;
            return jeste;
        }
        levo_desetica++;
    }

    //provera da li postoje brodovi DESNO od mene
    var desno_desetica=krajnja0-1; 
    var desno_jedinica=krajnja1+1;
    for(var i=0;i<3;i++){
        if(matrica_igrac1[desno_desetica][desno_jedinica]==1){
            jeste=false;
            return jeste;
        }
        desno_desetica++;
    }

    return jeste;
}
    else{
        if(pocetna_pozicija_integer<10){
            //proveravam da li ima brodova ISPOD
            var ispod_desetica=pocetna0+1;
            var ispod_jedinica=pocetna1;
            var jeste=true;
            for(var i=0;i<distanca+1;i++){
                if(matrica_igrac1[ispod_desetica][ispod_jedinica]==1){
                    jeste=false;
                    return jeste;
                }
                ispod_jedinica++;
            }

            //proveravam da li ima brodova LEVO
            var levo_desetica=pocetna0;
            var levo_jedinica=pocetna1-1;
            for(var i=0;i<2;i++){
                if(matrica_igrac1[levo_desetica][levo_jedinica]==1){
                    jeste=false;
                    return jeste;
                }
                levo_desetica++;
            }

            //proveravam da li imam brodove DESNO
            var desno_desetica=krajnja0; 
            var desno_jedinica=krajnja1+1;
            for(var i=0;i<2;i++){
                if(matrica_igrac1[desno_desetica][desno_jedinica]==1){
                    jeste=false;
                    return jeste;
                }
                desno_desetica++;
            }

            return jeste;
        }

        else if(pocetna_pozicija_integer>89){
            //Provera da li postoji brod IZNAD
            var iznad_desetica=pocetna0-1;
            var iznad_jedinica=pocetna1;
            var jeste=true;
        
            for(var i=0;i<distanca+1;i++){
                if(matrica_igrac1[iznad_desetica][iznad_jedinica]==1){
                    jeste=false;
                    return jeste;
                }
                iznad_jedinica++;
            }
       
            //Provera da li postoji brod levo
            var levo_desetica=pocetna0-1;
            var levo_jedinica=pocetna1-1;
            for(var i=0;i<2;i++){
                if(matrica_igrac1[levo_desetica][levo_jedinica]==1){
                    jeste=false;
                    return jeste;
                }
                levo_desetica++;
            }
            
            //Provera da li postoji brod desno 
            var desno_desetica=krajnja0-1; 
            var desno_jedinica=krajnja1+1;
            for(var i=0;i<2;i++){
                if(matrica_igrac1[desno_desetica][desno_jedinica]==1){
                    jeste=false;
                    return jeste;
                }
                desno_desetica++;
            }

            return jeste;
        }
    }
}

 function odredi_rastojanje(){
     pocetna0=parseInt(pocetna_pozicija[0]);
     krajnja0=parseInt(krajnja_pozicija[0]);

     pocetna1=parseInt(pocetna_pozicija[1]);
     krajnja1=parseInt(krajnja_pozicija[1]);
     if(pocetna0==krajnja0){
         var rastojanje=krajnja1-pocetna1;
        
         //u slucaju da se radi o tome da je igrac krenuo da povlaci s desna na levo
         if(rastojanje<0){
             rastojanje=0-rastojanje;
             var helper=krajnja1;
             krajnja1=pocetna1;
             pocetna1=helper;
             var help=pocetna_pozicija;
             pocetna_pozicija=krajnja_pozicija;
             krajnja_pozicija=help;
         }

         if(rastojanje>3){
             alert("Ne postoji brod te duzine");
             return null;
         }
         else{
             return rastojanje;
         }
     }
     else if(pocetna1==krajnja1){
         var rastojanje=krajnja0-pocetna0;
         //u slucaju da se radi o tome da je igrac krenuo da povlaci s desna na levo
         if(rastojanje<0){
            rastojanje=0-rastojanje;
            var helper=krajnja0;
            krajnja0=pocetna0;
            pocetna0=helper;

            var help=pocetna_pozicija;
            pocetna_pozicija=krajnja_pozicija;
            krajnja_pozicija=help;
         }

         if(rastojanje>3){
             alert("Ne postoji brod te duzine");
             return null;
         }
         else{
         return rastojanje;
         }
     }
     else{
         alert("Ovakvo zauzimanje brodova nije po pravilima");
         return null;
     }
 }

 function zavrsiPostavljanjeBrodova(){
    if(ukupno_brodova>0){
        alert("Jos uvek niste postavili sve brodove");
    }
    else{
        location.reload();
    }
 }

 function otvoriIgru(){
     window.open("battleship-game.html","_self");
 }