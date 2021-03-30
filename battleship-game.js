//globalno sacuvane matrice prvog i drugog igraca
var matrica_prvi_igrac=[];
var matrica_drugi_igrac=[];

//igrac po redu
var igrac;  

//broj brodova
var broj_brodova_1=20;
var broj_brodova_2=20;   

//matrica koja sluzi da se pamti koja su polja vec pogodjena
var matrica_1_hit=[];
var matrica_2_hit=[];


function oboj1(){
  for(var i=0;i<10;i++){
    for(var j=0;j<10;j++){
      if(matrica_prvi_igrac[i][j]==1 && matrica_1_hit[i][j]!=1){
        document.getElementById("1"+i+""+j).style.backgroundColor='blue';
      }
    }
  }
}

function skloni_boju1(){
  for(var i=0;i<10;i++){
    for(var j=0;j<10;j++){
      if(matrica_prvi_igrac[i][j]==1 && matrica_1_hit[i][j]!=1){
        document.getElementById("1"+i+""+j).style.backgroundColor='white';
      }
    }
  }
}

function oboj2(){
  for(var i=0;i<10;i++){
    for(var j=0;j<10;j++){
      if(matrica_drugi_igrac[i][j]==1 && matrica_2_hit[i][j]!=1){
        document.getElementById("2"+i+""+j).style.backgroundColor='blue';
      }
    }
  }
}

function skloni_boju2(){
  for(var i=0;i<10;i++){
    for(var j=0;j<10;j++){
      if(matrica_drugi_igrac[i][j]==1 && matrica_2_hit[i][j]!=1){
        document.getElementById("2"+i+""+j).style.backgroundColor='white';
      }
    }
  }
}

var brodovi_prvi_igrac=10;
var brodovi_drugi_igrac=10;

//fja koja se zove prilikom ucitavanja stranice, i ona ucitava matrice igraca
function ucitajMatrice(){
  matrica_prvi_igrac=localStorage.getItem("matrica_prvi_igrac");
  matrica_prvi_igrac=JSON.parse(matrica_prvi_igrac);
  matrica_drugi_igrac=localStorage.getItem("matrica_drugi_igrac");
  matrica_drugi_igrac=JSON.parse(matrica_drugi_igrac);
  igrac1=localStorage.getItem("igracjedan");
  igrac2=localStorage.getItem("igracdva");
  document.getElementById('igrac1').innerHTML=igrac1;
  document.getElementById('igrac2').innerHTML=igrac2;
  document.getElementById('igrac').innerHTML=igrac1;

  //da bih onemogucila da prvi igrac gadja suparnicku tablu
  var tablica=document.getElementById("tabela1");
  tablica.style.pointerEvents='none';

  //postavljanje svih polja matrice na nulu
  for(var i=0;i<10;i++){
    matrica_1_hit[i]=[];
    matrica_2_hit[i]=[];
    for(var j=0;j<10;j++){
      matrica_1_hit[i][j]=0;
      matrica_2_hit[i][j]=0;
    }
  }

  //popunjavanje pocetne matrice za prvog igraca
  for(var i=0;i<10;i++){
    for(var j=0;j<10;j++){
      if(matrica_prvi_igrac[i][j]==1 && matrica_1_hit[i][j]!=1){
        document.getElementById("1"+i+""+j).style.backgroundColor='blue';
      }
    }
  }
  igrac=1;//da je prvi igrac na potezu
  alert("Dobrodosli u igru! Crvenom bojom ce biti obelezeni pogodjeni brodovi. X-om ce biti obelezeni promasaji! Plavom bojom ce biti obelezeni postavljeni brodovi igraca na potezu! U svakom trenutku je crvenim slovima napisano koji je igrac na potezu. Pre nego sto krenete sa igrom, procitajte pravila na stranici!");
}

//fja koja je sluzila za proveru da li se lepo izvlaci matrica i parsira iz JSON 
function dohvatiMapu(){
  document.write("Prva matrica <br>");
  for(var i=0;i<10;i++){
      for(var j=0;j<10;j++){
          document.write(matrica_prvi_igrac[i][j]+" ");
      }
      document.write("<br>");
  }
  document.write("<br>");
  document.write("Druga matrica <br>");
  for(var i=0;i<10;i++){
      for(var j=0;j<10;j++){
          document.write(matrica_drugi_igrac[i][j]+" ");
      }
      document.write("<br>");
  }
}

function proveriPogodakBrodaPrviIgrac(matrica_vrsta,matrica_kolona){
//alert("Usao u fju");
var brojac=1; //sigurno sam pogodila jedan brod
var levo=matrica_kolona-1;
var desno=matrica_kolona+1;
var iznad=matrica_vrsta-1;
var ispod=matrica_vrsta+1;

if(levo<0 || desno>9 || iznad<0 || ispod>9){ 
 // alert("specijalni slucajevi");
//gotovo
  if(levo<0 && iznad<0){
    if(matrica_drugi_igrac[matrica_vrsta][desno]==0){
        var gore=matrica_vrsta;
        gore=gore-1;
      //  alert(gore);
        var dole=matrica_vrsta;
        dole=dole+1;
     //   alert(dole);
        var brojac_gore=0;
        var brojac_dole=0;
       
        if(brojac_gore!=-1){ //stigao je gore do kraja, sve ih je pogodio, moze na dole da proveri
          while(matrica_drugi_igrac[dole][matrica_kolona]==1){
              if(matrica_2_hit[dole][matrica_kolona]==1){
                brojac_dole++;
                dole++;
              }
              else{
                brojac_dole=-1; //znaci da sam pukla i da nisam pogodila sve brodove
                break;
              }
          }
        }
    
        if(brojac_gore!=-1 && brojac_dole!=-1){
          var brod=brojac_gore+brojac_dole+brojac;
          brodovi_drugi_igrac--;
          alert("Potopljen je brod");
          return true;
        }
        else{
          return false;
        }
    
    }

    if(matrica_drugi_igrac[ispod][matrica_kolona]==0){
      var ulevo=matrica_kolona;
      ulevo=ulevo-1;
   //   alert(ulevo);
      var udesno=matrica_kolona;
      udesno=udesno+1;
     // alert(udesno);
      var brojac_levo=0;
      var brojac_desno=0;
      
      if(brojac_levo!=-1){ //stigao je gore do kraja, sve ih je pogodio, moze na dole da proveri
        while(matrica_drugi_igrac[matrica_vrsta][udesno]==1){
            if(matrica_2_hit[matrica_vrsta][udesno]==1){
              brojac_desno++;
              udesno++;
            }
            else{
              brojac_desno=-1; //znaci da sam pukla i da nisam pogodila sve brodove
              break;
            }
        }
      }
    
      if(brojac_levo!=-1 && brojac_desno!=-1){
        var brod=brojac_desno+brojac_levo+brojac;
        brodovi_drugi_igrac--;
        alert("Potopljen je brod");
        return true;
      }
      else{
        return false;
      }
    }

  }
//gotovo
  if(levo<0 && ispod>9){
    if(matrica_drugi_igrac[matrica_vrsta][desno]==0){
        var gore=matrica_vrsta;
        gore=gore-1;
       // alert(gore);
        var dole=matrica_vrsta;
        dole=dole+1;
      //  alert(dole);
        var brojac_gore=0;
        var brojac_dole=0;
    
        while(matrica_drugi_igrac[gore][matrica_kolona]==1){
          //  alert("usao u while");
            if(matrica_2_hit[gore][matrica_kolona]==1){
               brojac_gore++;
               gore--;
            }
            else{
              brojac_gore=-1; //cim restartujem brojac, znaci da sam pukla zbog drugog uslova, tj da nisam jos pogodila brod
              break;
            }
        }
    
        if(brojac_gore!=-1 && brojac_dole!=-1){
          var brod=brojac_gore+brojac_dole+brojac;
          brodovi_drugi_igrac--;
          alert("Potopljen je brod");
          return true;
        }
        else{
          return false;
        }
    
    }

    if(matrica_drugi_igrac[iznad][matrica_kolona]==0){
      // mozda postoje horizontalni brodovi
    //  alert("Mozda postoji horizontalni brod");
      //znaci da je postoji mozda vertikalan brod
      var ulevo=matrica_kolona;
      ulevo=ulevo-1;
     // alert(ulevo);
      var udesno=matrica_kolona;
      udesno=udesno+1;
     // alert(udesno);
      var brojac_levo=0;
      var brojac_desno=0;
    
     /* while(matrica_drugi_igrac[matrica_vrsta][ulevo]==1){
          alert("usao u while");
          if(matrica_2_hit[matrica_vrsta][ulevo]==1){
             brojac_levo++;
             ulevo--;
          }
          else{
            brojac_levo=-1; //cim restartujem brojac, znaci da sam pukla zbog drugog uslova, tj da nisam jos pogodila brod
            break;
          }
      }*/
    
      if(brojac_levo!=-1){ //stigao je gore do kraja, sve ih je pogodio, moze na dole da proveri
       // alert("Jeste razlicit");
        while(matrica_drugi_igrac[matrica_vrsta][udesno]==1){
            if(matrica_2_hit[matrica_vrsta][udesno]==1){
              brojac_desno++;
              udesno++;
            }
            else{
              brojac_desno=-1; //znaci da sam pukla i da nisam pogodila sve brodove
              break;
            }
        }
      }
    
      if(brojac_levo!=-1 && brojac_desno!=-1){
        var brod=brojac_desno+brojac_levo+brojac;
        brodovi_drugi_igrac--;
        alert("Potopljen je brod");
        return true;
      }
      else{
        //alert("Niste popunili brod");
        return false;
      }
    }

  }

  if(desno>9 && iznad<0){

    if(matrica_drugi_igrac[matrica_vrsta][levo]==0){
        var gore=matrica_vrsta;
        gore=gore-1;
        var dole=matrica_vrsta;
        dole=dole+1;
        var brojac_gore=0;
        var brojac_dole=0;  
        if(brojac_gore!=-1){ //stigao je gore do kraja, sve ih je pogodio, moze na dole da proveri
          while(matrica_drugi_igrac[dole][matrica_kolona]==1){
              if(matrica_2_hit[dole][matrica_kolona]==1){
                brojac_dole++;
                dole++;
              }
              else{
                brojac_dole=-1; //znaci da sam pukla i da nisam pogodila sve brodove
                break;
              }
          }
        }
    
        if(brojac_gore!=-1 && brojac_dole!=-1){
          var brod=brojac_gore+brojac_dole+brojac;
          brodovi_drugi_igrac--;
          alert("Potopljen je brod");
          return true;
        }
        else{
          return false;
        }
    
    }

    if(matrica_drugi_igrac[ispod][matrica_kolona]==0){
      var ulevo=matrica_kolona;
      ulevo=ulevo-1;
     // alert(ulevo);
      var udesno=matrica_kolona;
      udesno=udesno+1;
      //alert(udesno);
      var brojac_levo=0;
      var brojac_desno=0;
    
      while(matrica_drugi_igrac[matrica_vrsta][ulevo]==1){
          if(matrica_2_hit[matrica_vrsta][ulevo]==1){
             brojac_levo++;
             ulevo--;
          }
          else{
            brojac_levo=-1; //cim restartujem brojac, znaci da sam pukla zbog drugog uslova, tj da nisam jos pogodila brod
            break;
          }
      }
      
      if(brojac_levo!=-1 && brojac_desno!=-1){
        var brod=brojac_desno+brojac_levo+brojac;
        brodovi_drugi_igrac--;
        alert("Potopljen je brod");
        return true;
      }
      else{
        return false;
      }
    }

  }

  if(desno>9 && ispod>9){
    if(matrica_drugi_igrac[matrica_vrsta][levo]==0){
        var gore=matrica_vrsta;
        gore=gore-1;
        //alert(gore);
        var dole=matrica_vrsta;
        dole=dole+1;
        //alert(dole);
        var brojac_gore=0;
        var brojac_dole=0;
    
        while(matrica_drugi_igrac[gore][matrica_kolona]==1){
            if(matrica_2_hit[gore][matrica_kolona]==1){
               brojac_gore++;
               gore--;
            }
            else{
              brojac_gore=-1; //cim restartujem brojac, znaci da sam pukla zbog drugog uslova, tj da nisam jos pogodila brod
              break;
            }
        }
    
        if(brojac_gore!=-1 && brojac_dole!=-1){
          var brod=brojac_gore+brojac_dole+brojac;
          brodovi_drugi_igrac--;
          alert("Potopljen je brod");
          return true;
        }
        else{
          return false;
        }
    
    }

    if(matrica_drugi_igrac[iznad][matrica_kolona]==0){
      var ulevo=matrica_kolona;
      ulevo=ulevo-1;
      //alert(ulevo);
      var udesno=matrica_kolona;
      udesno=udesno+1;
      //alert(udesno);
      var brojac_levo=0;
      var brojac_desno=0;
    
      while(matrica_drugi_igrac[matrica_vrsta][ulevo]==1){
          if(matrica_2_hit[matrica_vrsta][ulevo]==1){
             brojac_levo++;
             ulevo--;
          }
          else{
            brojac_levo=-1; //cim restartujem brojac, znaci da sam pukla zbog drugog uslova, tj da nisam jos pogodila brod
            break;
          }
      }
   
      if(brojac_levo!=-1 && brojac_desno!=-1){
        var brod=brojac_desno+brojac_levo+brojac;
        brodovi_drugi_igrac--;
        alert("Potopljen je brod");
        return true;
      }
      else{
        return false;
      }
    }

  }

    if(levo<0) { 
      
          if(matrica_drugi_igrac[matrica_vrsta][desno]==0){
          var gore=matrica_vrsta;
          gore=gore-1;
          //alert(gore);
          var dole=matrica_vrsta;
          dole=dole+1;
          //alert(dole);
          var brojac_gore=0;
          var brojac_dole=0;

    while(matrica_drugi_igrac[gore][matrica_kolona]==1){
       // alert("usao u while");
        if(matrica_2_hit[gore][matrica_kolona]==1){
           brojac_gore++;
           if(gore>0){
           gore--;}
           else{
             break;
           }
        }
        else{
          brojac_gore=-1; //cim restartujem brojac, znaci da sam pukla zbog drugog uslova, tj da nisam jos pogodila brod
          break;
        }
    }

    if(brojac_gore!=-1){ //stigao je gore do kraja, sve ih je pogodio, moze na dole da proveri
    //  alert("Jeste razlicit");
      while(matrica_drugi_igrac[dole][matrica_kolona]==1){
          if(matrica_2_hit[dole][matrica_kolona]==1){
            brojac_dole++;
            if(dole<9){
            dole++;}
            else{
              break;
            }
          }
          else{
            brojac_dole=-1; //znaci da sam pukla i da nisam pogodila sve brodove
            break;
          }
      }
    }

    if(brojac_gore!=-1 && brojac_dole!=-1){
      var brod=brojac_gore+brojac_dole+brojac;
      brodovi_drugi_igrac--;
      alert("Potopljen je brod");
      return true;
    }
    else{
      //alert("Niste popunili brod");
      return false;
    }

          }
          if(matrica_drugi_igrac[iznad][matrica_kolona]==0 && matrica_drugi_igrac[ispod][matrica_kolona]==0){
            var ulevo=matrica_kolona;
            ulevo=ulevo-1;
           // alert(ulevo);
            var udesno=matrica_kolona;
            udesno=udesno+1;
           // alert(udesno);
            var brojac_levo=0;
            var brojac_desno=0;
          
        /*    while(matrica_drugi_igrac[matrica_vrsta][ulevo]==1){
           //     alert("usao u while");
                if(matrica_2_hit[matrica_vrsta][ulevo]==1){
                   brojac_levo++;
                   ulevo--;
                }
                else{
                  brojac_levo=-1; //cim restartujem brojac, znaci da sam pukla zbog drugog uslova, tj da nisam jos pogodila brod
                  break;
                }
            } */
          
            if(brojac_levo!=-1){ //stigao je gore do kraja, sve ih je pogodio, moze na dole da proveri
           //   alert("Jeste razlicit");
              while(matrica_drugi_igrac[matrica_vrsta][udesno]==1){
                  if(matrica_2_hit[matrica_vrsta][udesno]==1){
                    brojac_desno++;
                    udesno++;
                  }
                  else{
                    brojac_desno=-1; //znaci da sam pukla i da nisam pogodila sve brodove
                    break;
                  }
              }
            }
          
            if(brojac_levo!=-1 && brojac_desno!=-1){
              var brod=brojac_desno+brojac_levo+brojac;
              brodovi_drugi_igrac--;
              alert("Potopljen je brod");
              return true;
            }
            else{
              return false;
            }
          }
      }

    if(desno>9){
     // alert("Na desnoj ivici sam");
      if(matrica_drugi_igrac[matrica_vrsta][levo]==0){
      //  alert("Mozda postoji vertikalni brod");
          //znaci da je postoji mozda vertikalan brod
          var gore=matrica_vrsta;
          gore=gore-1;
         // alert(gore);
          var dole=matrica_vrsta;
          dole=dole+1;
      //    alert(dole);
          var brojac_gore=0;
          var brojac_dole=0;
      
          while(matrica_drugi_igrac[gore][matrica_kolona]==1){
             // alert("usao u while");
              if(matrica_2_hit[gore][matrica_kolona]==1){
                 brojac_gore++;
                 if(gore>0){
                 gore--;}
                 else break;
              }
              else{
                brojac_gore=-1; //cim restartujem brojac, znaci da sam pukla zbog drugog uslova, tj da nisam jos pogodila brod
                break;
              }
          }
      
          if(brojac_gore!=-1){ //stigao je gore do kraja, sve ih je pogodio, moze na dole da proveri
     //       alert("Jeste razlicit");
            while(matrica_drugi_igrac[dole][matrica_kolona]==1){
                if(matrica_2_hit[dole][matrica_kolona]==1){
                  brojac_dole++;
                  if(dole<9){
                  dole++;}
                  else break;
                }
                else{
                  brojac_dole=-1; //znaci da sam pukla i da nisam pogodila sve brodove
                  break;
                }
            }
          }
      
          if(brojac_gore!=-1 && brojac_dole!=-1){
            var brod=brojac_gore+brojac_dole+brojac;
            brodovi_drugi_igrac--;
            alert("Potopljen je brod");
            return true;
          }
          else{
           // alert("Niste popunili brod");
            return false;
          }
      
      }
      if(matrica_drugi_igrac[iznad][matrica_kolona]==0 && matrica_drugi_igrac[ispod][matrica_kolona]==0){
      
        var ulevo=matrica_kolona;
        ulevo=ulevo-1;
      //  alert(ulevo);
        var udesno=matrica_kolona;
        udesno=udesno+1;
      //  alert(udesno);
        var brojac_levo=0;
        var brojac_desno=0;
      
        while(matrica_drugi_igrac[matrica_vrsta][ulevo]==1){
      //      alert("usao u while");
            if(matrica_2_hit[matrica_vrsta][ulevo]==1){
               brojac_levo++;
               ulevo--;
            }
            else{
              brojac_levo=-1; //cim restartujem brojac, znaci da sam pukla zbog drugog uslova, tj da nisam jos pogodila brod
              break;
            }
        }
        
        if(brojac_levo!=-1 && brojac_desno!=-1){
          var brod=brojac_desno+brojac_levo+brojac;
          brodovi_drugi_igrac--;
          alert("Potopljen je brod");
          return true;
        }
        else{
      //    alert("Niste popunili brod");
          return false;
        }
      }
    }

    if(iznad<0) {
     // alert("Na gornjoj ivici sam");
      if(matrica_drugi_igrac[matrica_vrsta][levo]==0 && matrica_drugi_igrac[matrica_vrsta][desno]==0){
   //     alert("Mozda postoji vertikalni brod");
          //znaci da je postoji mozda vertikalan brod
          var gore=matrica_vrsta;
          gore=gore-1;
      //    alert(gore);
          var dole=matrica_vrsta;
          dole=dole+1;
      //    alert(dole);
          var brojac_gore=0;
          var brojac_dole=0;
      
          if(brojac_gore!=-1){ //stigao je gore do kraja, sve ih je pogodio, moze na dole da proveri
         //   alert("Jeste razlicit");
            while(matrica_drugi_igrac[dole][matrica_kolona]==1){
                if(matrica_2_hit[dole][matrica_kolona]==1){
                  brojac_dole++;
                  dole++;
                }
                else{
                  brojac_dole=-1; //znaci da sam pukla i da nisam pogodila sve brodove
                  break;
                }
            }
          }
      
          if(brojac_gore!=-1 && brojac_dole!=-1){
            var brod=brojac_gore+brojac_dole+brojac;
            brodovi_drugi_igrac--;
            alert("Potopljen je brod");
            return true;
          }
          else{
           // alert("Niste popunili brod");
            return false;
          }
      
      }
      if(matrica_drugi_igrac[ispod][matrica_kolona]==0){
        var ulevo=matrica_kolona;
        ulevo=ulevo-1;
   //     alert(ulevo);
        var udesno=matrica_kolona;
        udesno=udesno+1;
    //    alert(udesno);
        var brojac_levo=0;
        var brojac_desno=0;
      
        while(matrica_drugi_igrac[matrica_vrsta][ulevo]==1){
         //   alert("usao u while");
            if(matrica_2_hit[matrica_vrsta][ulevo]==1){
               brojac_levo++;
               if(ulevo>0){
               ulevo--;}
               else {break;}
            }
            else{
              brojac_levo=-1; //cim restartujem brojac, znaci da sam pukla zbog drugog uslova, tj da nisam jos pogodila brod
              break;
            }
        }
      
        if(brojac_levo!=-1){ //stigao je gore do kraja, sve ih je pogodio, moze na dole da proveri
         // alert("Jeste razlicit");
          while(matrica_drugi_igrac[matrica_vrsta][udesno]==1){
              if(matrica_2_hit[matrica_vrsta][udesno]==1){
                brojac_desno++;
                if(udesno<9){
                udesno++;}
                else break;
              }
              else{
                brojac_desno=-1; //znaci da sam pukla i da nisam pogodila sve brodove
                break;
              }
          }
        }
      
        if(brojac_levo!=-1 && brojac_desno!=-1){
          var brod=brojac_desno+brojac_levo+brojac;
          brodovi_drugi_igrac--;
          alert("Potopljen je brod");
          return true;
        }
        else{
         // alert("Niste popunili brod");
          return false;
        }
      }
    }

    if(ispod>9){
      
      if(matrica_drugi_igrac[matrica_vrsta][levo]==0 && matrica_drugi_igrac[matrica_vrsta][desno]==0){
          var gore=matrica_vrsta;
          gore=gore-1;
       //   alert(gore);
          var dole=matrica_vrsta;
          dole=dole+1;
        //  alert(dole);
          var brojac_gore=0;
          var brojac_dole=0;
      
          while(matrica_drugi_igrac[gore][matrica_kolona]==1){
            //  alert("usao u while");
              if(matrica_2_hit[gore][matrica_kolona]==1){
                 brojac_gore++;
                 gore--;
              }
              else{
                brojac_gore=-1; //cim restartujem brojac, znaci da sam pukla zbog drugog uslova, tj da nisam jos pogodila brod
                break;
              }
          }
      
          if(brojac_gore!=-1 && brojac_dole!=-1){
            var brod=brojac_gore+brojac_dole+brojac;
            brodovi_drugi_igrac--;
            alert("Potopljen je brod");
            return true;
          }
          else{
          // alert("Niste popunili brod");
            return false;
          }
      
      }
      if(matrica_drugi_igrac[iznad][matrica_kolona]==0){
        var ulevo=matrica_kolona;
        ulevo=ulevo-1;
      //  alert(ulevo);
        var udesno=matrica_kolona;
        udesno=udesno+1;
     //   alert(udesno);
        var brojac_levo=0;
        var brojac_desno=0;
      
        while(matrica_drugi_igrac[matrica_vrsta][ulevo]==1){
           // alert("usao u while");
            if(matrica_2_hit[matrica_vrsta][ulevo]==1){
               brojac_levo++;
               if(ulevo>0){
               ulevo--;}
               else break;
            }
            else{
              brojac_levo=-1; //cim restartujem brojac, znaci da sam pukla zbog drugog uslova, tj da nisam jos pogodila brod
              break;
            }
        }
      
        if(brojac_levo!=-1){ //stigao je gore do kraja, sve ih je pogodio, moze na dole da proveri
       //   alert("Jeste razlicit");
          while(matrica_drugi_igrac[matrica_vrsta][udesno]==1){
              if(matrica_2_hit[matrica_vrsta][udesno]==1){
                brojac_desno++;
                if(brojac_desno<9){
                udesno++;}
                else break;
              }
              else{
                brojac_desno=-1; //znaci da sam pukla i da nisam pogodila sve brodove
                break;
              }
          }
        }
      
        if(brojac_levo!=-1 && brojac_desno!=-1){
          var brod=brojac_desno+brojac_levo+brojac;
          brodovi_drugi_igrac--;
          alert("Potopljen je brod");
          return true;
        }
        else{
         // alert("Niste popunili brod");
          return false;
        }
      }
    }

  return false;
}

//imam granicne slucajeve za ivice, ako mi je skroz levo, tj ako je levo manje od nule

if(matrica_drugi_igrac[matrica_vrsta][levo]==0 && matrica_drugi_igrac[matrica_vrsta][desno]==0){
 // alert("vertikalno");
    var gore=matrica_vrsta;
    gore=gore-1;
//    alert(gore);
    var dole=matrica_vrsta;
    dole=dole+1;
  //  alert(dole);
    var brojac_gore=0;
    var brojac_dole=0;

    while(matrica_drugi_igrac[gore][matrica_kolona]==1){
      //  alert("usao u while");
        if(matrica_2_hit[gore][matrica_kolona]==1){
           brojac_gore++;
           if(gore>0){
           gore--;}
           else break;
        }
        else{
          brojac_gore=-1; //cim restartujem brojac, znaci da sam pukla zbog drugog uslova, tj da nisam jos pogodila brod
          break;
        }
    }

    if(brojac_gore!=-1){ //stigao je gore do kraja, sve ih je pogodio, moze na dole da proveri
    //  alert("Jeste razlicit");
      while(matrica_drugi_igrac[dole][matrica_kolona]==1){
          if(matrica_2_hit[dole][matrica_kolona]==1){
            brojac_dole++;
            if(dole<9){
            dole++;}
            else break;
          }
          else{
            brojac_dole=-1; //znaci da sam pukla i da nisam pogodila sve brodove
            break;
          }
      }
    }

    if(brojac_gore!=-1 && brojac_dole!=-1){
      var brod=brojac_gore+brojac_dole+brojac;
      brodovi_drugi_igrac--;
      alert("Potopljen je brod");
      return true;
    }
    else{
    //  alert("Niste popunili brod");
      return false;
    }

}

if(matrica_drugi_igrac[iznad][matrica_kolona]==0 && matrica_drugi_igrac[ispod][matrica_kolona]==0){
  var ulevo=matrica_kolona;
  ulevo=ulevo-1;
 // alert(ulevo);
  var udesno=matrica_kolona;
  udesno=udesno+1;
 // alert(udesno);
  var brojac_levo=0;
  var brojac_desno=0;

  while(matrica_drugi_igrac[matrica_vrsta][ulevo]==1){
    //  alert("usao u while");
      if(matrica_2_hit[matrica_vrsta][ulevo]==1){
         brojac_levo++;
         ulevo--;
      }
      else{
        brojac_levo=-1; //cim restartujem brojac, znaci da sam pukla zbog drugog uslova, tj da nisam jos pogodila brod
        break;
      }
  }

  if(brojac_levo!=-1){ //stigao je gore do kraja, sve ih je pogodio, moze na dole da proveri
  //  alert("Jeste razlicit");
    while(matrica_drugi_igrac[matrica_vrsta][udesno]==1){
        if(matrica_2_hit[matrica_vrsta][udesno]==1){
          brojac_desno++;
          udesno++;
        }
        else{
          brojac_desno=-1; //znaci da sam pukla i da nisam pogodila sve brodove
          break;
        }
    }
  }

  if(brojac_levo!=-1 && brojac_desno!=-1){
    var brod=brojac_desno+brojac_levo+brojac;
    brodovi_drugi_igrac--;
    alert("Potopljen je brod");
    return true;
  }
  else{
   // alert("Niste popunili brod");
    return false;
  }
}


//alert("Niste pogodili brod");
 return false;

}

function proveriPogodakBrodaDrugiIgrac(matrica_vrsta,matrica_kolona){

  var brojac=1; //sigurno sam pogodila jedan brod
  var levo=matrica_kolona-1;
  var desno=matrica_kolona+1;
  var iznad=matrica_vrsta-1;
  var ispod=matrica_vrsta+1;
  
  if(levo<0 || desno>9 || iznad<0 || ispod>9){ 
  //gotovo
    if(levo<0 && iznad<0){
      if(matrica_prvi_igrac[matrica_vrsta][desno]==0){
          var gore=matrica_vrsta;
          gore=gore-1;
          var dole=matrica_vrsta;
          dole=dole+1;
          var brojac_gore=0;
          var brojac_dole=0;
         
          if(brojac_gore!=-1){ //stigao je gore do kraja, sve ih je pogodio, moze na dole da proveri
            while(matrica_prvi_igrac[dole][matrica_kolona]==1){
                if(matrica_1_hit[dole][matrica_kolona]==1){
                  brojac_dole++;
                  dole++;
                }
                else{
                  brojac_dole=-1; //znaci da sam pukla i da nisam pogodila sve brodove
                  break;
                }
            }
          }
      
          if(brojac_gore!=-1 && brojac_dole!=-1){
            var brod=brojac_gore+brojac_dole+brojac;
            brodovi_prvi_igrac--;
            alert("Potopljen je brod");
            return true;
          }
          else{
            return false;
          }
      
      }
  
      if(matrica_prvi_igrac[ispod][matrica_kolona]==0){
        var ulevo=matrica_kolona;
        ulevo=ulevo-1;
        var udesno=matrica_kolona;
        udesno=udesno+1;
        var brojac_levo=0;
        var brojac_desno=0;
        
        if(brojac_levo!=-1){ //stigao je gore do kraja, sve ih je pogodio, moze na dole da proveri
          while(matrica_prvi_igrac[matrica_vrsta][udesno]==1){
              if(matrica_1_hit[matrica_vrsta][udesno]==1){
                brojac_desno++;
                udesno++;
              }
              else{
                brojac_desno=-1; //znaci da sam pukla i da nisam pogodila sve brodove
                break;
              }
          }
        }
      
        if(brojac_levo!=-1 && brojac_desno!=-1){
          var brod=brojac_desno+brojac_levo+brojac;
          brodovi_prvi_igrac--;
          alert("Potopljen je brod");
          return true;
        }
        else{
          return false;
        }
      }
  
    }
  //gotovo
    if(levo<0 && ispod>9){
      if(matrica_prvi_igrac[matrica_vrsta][desno]==0){
          var gore=matrica_vrsta;
          gore=gore-1;
          var dole=matrica_vrsta;
          dole=dole+1;
          var brojac_gore=0;
          var brojac_dole=0;
      
          while(matrica_prvi_igrac[gore][matrica_kolona]==1){
              if(matrica_1_hit[gore][matrica_kolona]==1){
                 brojac_gore++;
                 gore--;
              }
              else{
                brojac_gore=-1; //cim restartujem brojac, znaci da sam pukla zbog drugog uslova, tj da nisam jos pogodila brod
                break;
              }
          }
      
          if(brojac_gore!=-1 && brojac_dole!=-1){
            var brod=brojac_gore+brojac_dole+brojac;
            brodovi_prvi_igrac--;
            alert("Potopljen je brod");
            return true;
          }
          else{
            return false;
          }
      
      }
  
      if(matrica_prvi_igrac[iznad][matrica_kolona]==0){
        var ulevo=matrica_kolona;
        ulevo=ulevo-1;
        var udesno=matrica_kolona;
        udesno=udesno+1;
        var brojac_levo=0;
        var brojac_desno=0;
      
        if(brojac_levo!=-1){ //stigao je gore do kraja, sve ih je pogodio, moze na dole da proveri
          while(matrica_prvi_igrac[matrica_vrsta][udesno]==1){
              if(matrica_1_hit[matrica_vrsta][udesno]==1){
                brojac_desno++;
                udesno++;
              }
              else{
                brojac_desno=-1; //znaci da sam pukla i da nisam pogodila sve brodove
                break;
              }
          }
        }
      
        if(brojac_levo!=-1 && brojac_desno!=-1){
          var brod=brojac_desno+brojac_levo+brojac;
          brodovi_prvi_igrac--;
          alert("Potopljen je brod");
          return true;
        }
        else{
          return false;
        }
      }
  
    }
  
    if(desno>9 && iznad<0){
  
      if(matrica_prvi_igrac[matrica_vrsta][levo]==0){
          var gore=matrica_vrsta;
          gore=gore-1;
          var dole=matrica_vrsta;
          dole=dole+1;
          var brojac_gore=0;
          var brojac_dole=0;  
          if(brojac_gore!=-1){ //stigao je gore do kraja, sve ih je pogodio, moze na dole da proveri
            while(matrica_prvi_igrac[dole][matrica_kolona]==1){
                if(matrica_1_hit[dole][matrica_kolona]==1){
                  brojac_dole++;
                  dole++;
                }
                else{
                  brojac_dole=-1; //znaci da sam pukla i da nisam pogodila sve brodove
                  break;
                }
            }
          }
      
          if(brojac_gore!=-1 && brojac_dole!=-1){
            var brod=brojac_gore+brojac_dole+brojac;
            brodovi_prvi_igrac--;
            alert("Potopljen je brod");
            return true;
          }
          else{
            return false;
          }
      
      }
  
      if(matrica_prvi_igrac[ispod][matrica_kolona]==0){
        var ulevo=matrica_kolona;
        ulevo=ulevo-1;
        var udesno=matrica_kolona;
        udesno=udesno+1;
        var brojac_levo=0;
        var brojac_desno=0;
      
        while(matrica_prvi_igrac[matrica_vrsta][ulevo]==1){
            if(matrica_1_hit[matrica_vrsta][ulevo]==1){
               brojac_levo++;
               ulevo--;
            }
            else{
              brojac_levo=-1; //cim restartujem brojac, znaci da sam pukla zbog drugog uslova, tj da nisam jos pogodila brod
              break;
            }
        }
        
        if(brojac_levo!=-1 && brojac_desno!=-1){
          var brod=brojac_desno+brojac_levo+brojac;
          brodovi_prvi_igrac--;
          alert("Potopljen je brod");
          return true;
        }
        else{
          return false;
        }
      }
  
    }
  
    if(desno>9 && ispod>9){
      if(matrica_prvi_igrac[matrica_vrsta][levo]==0){
          var gore=matrica_vrsta;
          gore=gore-1;
          var dole=matrica_vrsta;
          dole=dole+1;
          var brojac_gore=0;
          var brojac_dole=0;
      
          while(matrica_prvi_igrac[gore][matrica_kolona]==1){
              if(matrica_1_hit[gore][matrica_kolona]==1){
                 brojac_gore++;
                 gore--;
              }
              else{
                brojac_gore=-1; //cim restartujem brojac, znaci da sam pukla zbog drugog uslova, tj da nisam jos pogodila brod
                break;
              }
          }
      
          if(brojac_gore!=-1 && brojac_dole!=-1){
            var brod=brojac_gore+brojac_dole+brojac;
            brodovi_prvi_igrac--;
            alert("Potopljen je brod");
            return true;
          }
          else{
            return false;
          }
      
      }
  
      if(matrica_prvi_igrac[iznad][matrica_kolona]==0){
        var ulevo=matrica_kolona;
        ulevo=ulevo-1;
        var udesno=matrica_kolona;
        udesno=udesno+1;
        var brojac_levo=0;
        var brojac_desno=0;
      
        while(matrica_prvi_igrac[matrica_vrsta][ulevo]==1){
            if(matrica_1_hit[matrica_vrsta][ulevo]==1){
               brojac_levo++;
               ulevo--;
            }
            else{
              brojac_levo=-1; //cim restartujem brojac, znaci da sam pukla zbog drugog uslova, tj da nisam jos pogodila brod
              break;
            }
        }
     
        if(brojac_levo!=-1 && brojac_desno!=-1){
          var brod=brojac_desno+brojac_levo+brojac;
          brodovi_prvi_igrac--;
          alert("Potopljen je brod");
          return true;
        }
        else{
          return false;
        }
      }
  
    }
  
      if(levo<0) { 
        
            if(matrica_prvi_igrac[matrica_vrsta][desno]==0){
            var gore=matrica_vrsta;
            gore=gore-1;
            var dole=matrica_vrsta;
            dole=dole+1;
            var brojac_gore=0;
            var brojac_dole=0;
  
      while(matrica_prvi_igrac[gore][matrica_kolona]==1){
          if(matrica_1_hit[gore][matrica_kolona]==1){
             brojac_gore++;
             if(gore>0){
             gore--;}
             else{
               break;
             }
          }
          else{
            brojac_gore=-1; //cim restartujem brojac, znaci da sam pukla zbog drugog uslova, tj da nisam jos pogodila brod
            break;
          }
      }
  
      if(brojac_gore!=-1){ //stigao je gore do kraja, sve ih je pogodio, moze na dole da proveri
        while(matrica_prvi_igrac[dole][matrica_kolona]==1){
            if(matrica_1_hit[dole][matrica_kolona]==1){
              brojac_dole++;
              if(dole<9){
              dole++;}
              else{
                break;
              }
            }
            else{
              brojac_dole=-1; //znaci da sam pukla i da nisam pogodila sve brodove
              break;
            }
        }
      }
  
      if(brojac_gore!=-1 && brojac_dole!=-1){
        var brod=brojac_gore+brojac_dole+brojac;
        brodovi_prvi_igrac--;
        alert("Potopljen je brod");
        return true;
      }
      else{
        return false;
      }
  
            }
            if(matrica_prvi_igrac[iznad][matrica_kolona]==0 && matrica_prvi_igrac[ispod][matrica_kolona]==0){
              var ulevo=matrica_kolona;
              ulevo=ulevo-1;
              var udesno=matrica_kolona;
              udesno=udesno+1;
              var brojac_levo=0;
              var brojac_desno=0;
            
              if(brojac_levo!=-1){ //stigao je gore do kraja, sve ih je pogodio, moze na dole da proveri
                while(matrica_prvi_igrac[matrica_vrsta][udesno]==1){
                    if(matrica_1_hit[matrica_vrsta][udesno]==1){
                      brojac_desno++;
                      udesno++;
                    }
                    else{
                      brojac_desno=-1; //znaci da sam pukla i da nisam pogodila sve brodove
                      break;
                    }
                }
              }
            
              if(brojac_levo!=-1 && brojac_desno!=-1){
                var brod=brojac_desno+brojac_levo+brojac;
                brodovi_prvi_igrac--;
                alert("Potopljen je brod");
                return true;
              }
              else{
                return false;
              }
            }
        }
  
      if(desno>9){
        if(matrica_prvi_igrac[matrica_vrsta][levo]==0){
            var gore=matrica_vrsta;
            gore=gore-1;
            var dole=matrica_vrsta;
            dole=dole+1;
            var brojac_gore=0;
            var brojac_dole=0;
        
            while(matrica_prvi_igrac[gore][matrica_kolona]==1){
                if(matrica_1_hit[gore][matrica_kolona]==1){
                   brojac_gore++;
                   if(gore>0){
                   gore--;}
                   else break;
                }
                else{
                  brojac_gore=-1; //cim restartujem brojac, znaci da sam pukla zbog drugog uslova, tj da nisam jos pogodila brod
                  break;
                }
            }
        
            if(brojac_gore!=-1){ //stigao je gore do kraja, sve ih je pogodio, moze na dole da proveri
              while(matrica_prvi_igrac[dole][matrica_kolona]==1){
                  if(matrica_1_hit[dole][matrica_kolona]==1){
                    brojac_dole++;
                    if(dole<9){
                    dole++;}
                    else break;
                  }
                  else{
                    brojac_dole=-1; //znaci da sam pukla i da nisam pogodila sve brodove
                    break;
                  }
              }
            }
        
            if(brojac_gore!=-1 && brojac_dole!=-1){
              var brod=brojac_gore+brojac_dole+brojac;
              brodovi_prvi_igrac--;
              alert("Potopljen je brod");
              return true;
            }
            else{
              return false;
            }
        
        }
        if(matrica_prvi_igrac[iznad][matrica_kolona]==0 && matrica_prvi_igrac[ispod][matrica_kolona]==0){
        
          var ulevo=matrica_kolona;
          ulevo=ulevo-1;
          var udesno=matrica_kolona;
          udesno=udesno+1;
          var brojac_levo=0;
          var brojac_desno=0;
        
          while(matrica_prvi_igrac[matrica_vrsta][ulevo]==1){
      
              if(matrica_1_hit[matrica_vrsta][ulevo]==1){
                 brojac_levo++;
                 ulevo--;
              }
              else{
                brojac_levo=-1; //cim restartujem brojac, znaci da sam pukla zbog drugog uslova, tj da nisam jos pogodila brod
                break;
              }
          }
          
          if(brojac_levo!=-1 && brojac_desno!=-1){
            var brod=brojac_desno+brojac_levo+brojac;
            brodovi_prvi_igrac--;
            alert("Potopljen je brod");
            return true;
          }
          else{
            return false;
          }
        }
      }
  
      if(iznad<0) {
       // alert("Na gornjoj ivici sam");
        if(matrica_prvi_igrac[matrica_vrsta][levo]==0 && matrica_prvi_igrac[matrica_vrsta][desno]==0){
     //     alert("Mozda postoji vertikalni brod");
            //znaci da je postoji mozda vertikalan brod
            var gore=matrica_vrsta;
            gore=gore-1;
        //    alert(gore);
            var dole=matrica_vrsta;
            dole=dole+1;
        //    alert(dole);
            var brojac_gore=0;
            var brojac_dole=0;
        
            if(brojac_gore!=-1){ //stigao je gore do kraja, sve ih je pogodio, moze na dole da proveri
           //   alert("Jeste razlicit");
              while(matrica_prvi_igrac[dole][matrica_kolona]==1){
                  if(matrica_1_hit[dole][matrica_kolona]==1){
                    brojac_dole++;
                    dole++;
                  }
                  else{
                    brojac_dole=-1; //znaci da sam pukla i da nisam pogodila sve brodove
                    break;
                  }
              }
            }
        
            if(brojac_gore!=-1 && brojac_dole!=-1){
              var brod=brojac_gore+brojac_dole+brojac;
              brodovi_prvi_igrac--;
              alert("Potopljen je brod");
              return true;
            }
            else{
             // alert("Niste popunili brod");
              return false;
            }
        
        }
        if(matrica_prvi_igrac[ispod][matrica_kolona]==0){
          var ulevo=matrica_kolona;
          ulevo=ulevo-1;
     //     alert(ulevo);
          var udesno=matrica_kolona;
          udesno=udesno+1;
      //    alert(udesno);
          var brojac_levo=0;
          var brojac_desno=0;
        
          while(matrica_prvi_igrac[matrica_vrsta][ulevo]==1){
           //   alert("usao u while");
              if(matrica_1_hit[matrica_vrsta][ulevo]==1){
                 brojac_levo++;
                 if(ulevo>0){
                 ulevo--;}
                 else {break;}
              }
              else{
                brojac_levo=-1; //cim restartujem brojac, znaci da sam pukla zbog drugog uslova, tj da nisam jos pogodila brod
                break;
              }
          }
        
          if(brojac_levo!=-1){ //stigao je gore do kraja, sve ih je pogodio, moze na dole da proveri
           // alert("Jeste razlicit");
            while(matrica_prvi_igrac[matrica_vrsta][udesno]==1){
                if(matrica_1_hit[matrica_vrsta][udesno]==1){
                  brojac_desno++;
                  if(udesno<9){
                  udesno++;}
                  else break;
                }
                else{
                  brojac_desno=-1; //znaci da sam pukla i da nisam pogodila sve brodove
                  break;
                }
            }
          }
        
          if(brojac_levo!=-1 && brojac_desno!=-1){
            var brod=brojac_desno+brojac_levo+brojac;
            brodovi_prvi_igrac--;
            alert("Potopljen je brod");
            return true;
          }
          else{
           // alert("Niste popunili brod");
            return false;
          }
        }
      }
  
      if(ispod>9){
        
        if(matrica_prvi_igrac[matrica_vrsta][levo]==0 && matrica_prvi_igrac[matrica_vrsta][desno]==0){
            var gore=matrica_vrsta;
            gore=gore-1;
         //   alert(gore);
            var dole=matrica_vrsta;
            dole=dole+1;
          //  alert(dole);
            var brojac_gore=0;
            var brojac_dole=0;
        
            while(matrica_prvi_igrac[gore][matrica_kolona]==1){
              //  alert("usao u while");
                if(matrica_1_hit[gore][matrica_kolona]==1){
                   brojac_gore++;
                   gore--;
                }
                else{
                  brojac_gore=-1; //cim restartujem brojac, znaci da sam pukla zbog drugog uslova, tj da nisam jos pogodila brod
                  break;
                }
            }
        
            if(brojac_gore!=-1 && brojac_dole!=-1){
              var brod=brojac_gore+brojac_dole+brojac;
              brodovi_prvi_igrac--;
              alert("Potopljen je brod");
              return true;
            }
            else{
            // alert("Niste popunili brod");
              return false;
            }
        
        }
        if(matrica_prvi_igrac[iznad][matrica_kolona]==0){
          var ulevo=matrica_kolona;
          ulevo=ulevo-1;
        //  alert(ulevo);
          var udesno=matrica_kolona;
          udesno=udesno+1;
       //   alert(udesno);
          var brojac_levo=0;
          var brojac_desno=0;
        
          while(matrica_prvi_igrac[matrica_vrsta][ulevo]==1){
             // alert("usao u while");
              if(matrica_1_hit[matrica_vrsta][ulevo]==1){
                 brojac_levo++;
                 if(ulevo>0){
                 ulevo--;}
                 else break;
              }
              else{
                brojac_levo=-1; //cim restartujem brojac, znaci da sam pukla zbog drugog uslova, tj da nisam jos pogodila brod
                break;
              }
          }
        
          if(brojac_levo!=-1){ //stigao je gore do kraja, sve ih je pogodio, moze na dole da proveri
         //   alert("Jeste razlicit");
            while(matrica_prvi_igrac[matrica_vrsta][udesno]==1){
                if(matrica_1_hit[matrica_vrsta][udesno]==1){
                  brojac_desno++;
                  if(brojac_desno<9){
                  udesno++;}
                  else break;
                }
                else{
                  brojac_desno=-1; //znaci da sam pukla i da nisam pogodila sve brodove
                  break;
                }
            }
          }
        
          if(brojac_levo!=-1 && brojac_desno!=-1){
            var brod=brojac_desno+brojac_levo+brojac;
            brodovi_prvi_igrac--;
            alert("Potopljen je brod");
            return true;
          }
          else{
           // alert("Niste popunili brod");
            return false;
          }
        }
      }
  
    return false;
  }
  
  //imam granicne slucajeve za ivice, ako mi je skroz levo, tj ako je levo manje od nule
  
  if(matrica_prvi_igrac[matrica_vrsta][levo]==0 && matrica_prvi_igrac[matrica_vrsta][desno]==0){
  
      var gore=matrica_vrsta;
      gore=gore-1;
  //    alert(gore);
      var dole=matrica_vrsta;
      dole=dole+1;
    //  alert(dole);
      var brojac_gore=0;
      var brojac_dole=0;
  
      while(matrica_prvi_igrac[gore][matrica_kolona]==1){
        //  alert("usao u while");
          if(matrica_1_hit[gore][matrica_kolona]==1){
             brojac_gore++;
             if(gore>0){
             gore--;}
             else break;
          }
          else{
            brojac_gore=-1; //cim restartujem brojac, znaci da sam pukla zbog drugog uslova, tj da nisam jos pogodila brod
            break;
          }
      }
  
      if(brojac_gore!=-1){ //stigao je gore do kraja, sve ih je pogodio, moze na dole da proveri
      //  alert("Jeste razlicit");
        while(matrica_prvi_igrac[dole][matrica_kolona]==1){
            if(matrica_1_hit[dole][matrica_kolona]==1){
              brojac_dole++;
              if(dole<9){
              dole++;}
              else break;
            }
            else{
              brojac_dole=-1; //znaci da sam pukla i da nisam pogodila sve brodove
              break;
            }
        }
      }
  
      if(brojac_gore!=-1 && brojac_dole!=-1){
        var brod=brojac_gore+brojac_dole+brojac;
        brodovi_prvi_igrac--;
        alert("Potopljen je brod");
        return true;
      }
      else{
      //  alert("Niste popunili brod");
        return false;
      }
  
  }
  
  if(matrica_prvi_igrac[iznad][matrica_kolona]==0 && matrica_prvi_igrac[ispod][matrica_kolona]==0){
    var ulevo=matrica_kolona;
    ulevo=ulevo-1;
   // alert(ulevo);
    var udesno=matrica_kolona;
    udesno=udesno+1;
   // alert(udesno);
    var brojac_levo=0;
    var brojac_desno=0;
  
    while(matrica_prvi_igrac[matrica_vrsta][ulevo]==1){
      //  alert("usao u while");
        if(matrica_1_hit[matrica_vrsta][ulevo]==1){
           brojac_levo++;
           ulevo--;
        }
        else{
          brojac_levo=-1; //cim restartujem brojac, znaci da sam pukla zbog drugog uslova, tj da nisam jos pogodila brod
          break;
        }
    }
  
    if(brojac_levo!=-1){ //stigao je gore do kraja, sve ih je pogodio, moze na dole da proveri
    //  alert("Jeste razlicit");
      while(matrica_prvi_igrac[matrica_vrsta][udesno]==1){
          if(matrica_1_hit[matrica_vrsta][udesno]==1){
            brojac_desno++;
            udesno++;
          }
          else{
            brojac_desno=-1; //znaci da sam pukla i da nisam pogodila sve brodove
            break;
          }
      }
    }
  
    if(brojac_levo!=-1 && brojac_desno!=-1){
      var brod=brojac_desno+brojac_levo+brojac;
      brodovi_prvi_igrac--;
      alert("Potopljen je brod");
      return true;
    }
    else{
     // alert("Niste popunili brod");
      return false;
    }
  }
  
  
  //alert("Niste pogodili brod");
   return false;
}

//funkcija za potapanje brodova
function pritisni(input){
  if(igrac==1) { //znaci da je prvi igrac na potezu
    var index=$(input).attr("id");
    var matrica_vrsta=parseInt(index[1]);
    var matrica_kolona=parseInt(index[2]);

    if(matrica_drugi_igrac[matrica_vrsta][matrica_kolona]==1){ //pogodak
      if(matrica_2_hit[matrica_vrsta][matrica_kolona]==1){
        alert("Vec ste pogodili ovo polje!");
        return;
      }
        matrica_2_hit[matrica_vrsta][matrica_kolona]=1;
      var pogodak=proveriPogodakBrodaPrviIgrac(matrica_vrsta,matrica_kolona);
      oboj1();
      input.style.backgroundColor='red';
      igrac=1;
      broj_brodova_1--;
      if(broj_brodova_1==0){
        var igrac1=localStorage.getItem("igracjedan");
        var prvi=10-brodovi_prvi_igrac;
        var drugi=10-brodovi_drugi_igrac;
        alert("POBEDNIK: "+igrac1+"! Cestitamo! Rezultat po broju potopljenih brodova: "+drugi+" : "+prvi);
        setTimeout("ponovo()",1500);
      }
    }
    else{ //promasaj za prvog igraca
      skloni_boju1();
      oboj2();
     var igrac2=localStorage.getItem('igracdva');
     document.getElementById('igrac').innerHTML=igrac2;
     $(input).html("<img src='battleship-assets/x.png' width='25' height='22'>");
      igrac=2;
     var tabela2=document.getElementById("tabela2");
      tabela2.style.pointerEvents='none';
     var tabela1=document.getElementById("tabela1");
     tabela1.style.pointerEvents='auto'; 
      return;
    }
  }
  else if(igrac==2){
   // alert("Igrac2 je na potazu");
    var index=$(input).attr("id");
    var matrica_vrsta=parseInt(index[1]);
    var matrica_kolona=parseInt(index[2]);
    if(matrica_prvi_igrac[matrica_vrsta][matrica_kolona]==1){ //pogodak za drugog igraca
      if(matrica_1_hit[matrica_vrsta][matrica_kolona]==1){
        alert("Vec ste pogodili ovo polje!");
        return;
      }
      matrica_1_hit[matrica_vrsta][matrica_kolona]=1;
      var pogodak=proveriPogodakBrodaDrugiIgrac(matrica_vrsta,matrica_kolona);
     oboj2();
      input.style.backgroundColor='red';
      broj_brodova_2--;
      igrac=2;
      if(broj_brodova_2==0){
        var igrac2=localStorage.getItem('igracdva');
        var prvi=10-brodovi_prvi_igrac;
        var drugi=10-brodovi_drugi_igrac;
        alert("POBEDNIK: "+igrac2+"! Cestitamo! Rezultat po broju potopljenih brodova: "+prvi+" : "+drugi);
        setTimeout("ponovo()",1500);
      }
    }
    else{ //promasaj za drugog igraca, nastavlja prvi igrac
      var igrac1=localStorage.getItem('igracjedan');
      document.getElementById('igrac').innerHTML=igrac1;
     $(input).html("<img src='battleship-assets/x.png' width='25' height='22'>");
      igrac=1;
     skloni_boju2();
     oboj1();
      var tabela1=document.getElementById("tabela1");
      tabela1.style.pointerEvents='none';
      var tabela2=document.getElementById("tabela2");
      tabela2.style.pointerEvents='auto';
    } 
  }
}

//kada se zavrsi igra, da mogu ponovo da igraju na osvezenim tablama
function ponovo(){ 
  location.reload();
}

function podesavanja(){
    window.open("battleship-setup.html","_self");
}


function povratak(){
    window.open("battleship-welcome.html","_self");
}

function igrac1_matrica(){
    window.open("player1-battleship.html");
}

function igrac2_matrica(){
    window.open("player2-battleship.html");
}