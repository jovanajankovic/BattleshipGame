function zapocniIgru(){
    if(document.forma_prijava.igrac1.value!="" && document.forma_prijava.igrac2.value!=""){   
        var regex=/^\w{3,15}$/;
        if(regex.test(document.forma_prijava.igrac1.value)){
            document.getElementById("i1").innerHTML="";
        }   
        if(regex.test(document.forma_prijava.igrac2.value)){
            document.getElementById("i2").innerHTML="";
        }  
        if(regex.test(document.forma_prijava.igrac1.value) && regex.test(document.forma_prijava.igrac2.value)){
            //alert("Cestitamo!");
            localStorage.setItem("igracjedan",document.forma_prijava.igrac1.value);
            localStorage.setItem("igracdva",document.forma_prijava.igrac2.value);
            window.open("battleship-setup.html","_self");
        }
        else{
            if(!regex.test(document.forma_prijava.igrac1.value)){
                document.getElementById("i1").innerHTML="Igrac 1 nije uneo ispravno ime";
            }   
            if(!regex.test(document.forma_prijava.igrac2.value)){
                document.getElementById("i2").innerHTML="Igrac 2 nije uneo ispravno ime";
            }  
        }
    }
    else{
        alert("Niste uneli imena oba igraca");
    }
}