$(document).ready(function(){
    var catbase = {};
    $.getJSON('../data/catbase.json', function(data) {
        catbase = data;
        //document.getElementById("cat-table").innerHTML = catbase.kocicaci[1].meno + " & " + catbase.kocicaci[2].meno;
        var macaciaTabulka = document.getElementById("cat-table");
        for(i=0; i<catbase.kocicaci.length; i++) {
            var kocicakForma = document.getElementById("kocicak-forma");
            var kocicak = document.createElement("div");
            kocicak.id = "cat" + (i + 1);
            kocicak.className= "kocicak";
            macaciaTabulka.appendChild(kocicak);
            kocicak.innerHTML= kocicakForma.innerHTML;
            
            kocicak.getElementsByClassName("meno")[0].innerHTML = catbase.kocicaci[i].meno;
            
            var titulnaFotka = "url('data/" + catbase.kocicaci[i].id + "/" + catbase.kocicaci[i].titulnaFotka + "')";
            kocicak.getElementsByClassName("titulna-fotka")[0].style.backgroundImage = titulnaFotka;

            kocicak.getElementsByClassName("vek")[0].innerHTML = "Vek: " + catbase.kocicaci[i].vek;

            kocicak.getElementsByClassName("plemeno")[0].innerHTML = "Plemeno: " + catbase.kocicaci[i].plemeno;

            kocicak.getElementsByClassName("utulok")[0].innerHTML = "Miesto: " + catbase.kocicaci[i].utulok;

            kocicak.getElementsByClassName("pribeh")[0].innerHTML = catbase.kocicaci[i].pribeh;
            let kocicakIndex = i;
            let kocicakDiv = kocicak;
            kocicak.getElementsByClassName("titulna-fotka")[0].onclick = function() {
                 var galeriaFotka = "url('data/" + catbase.kocicaci[kocicakIndex].id + "/" + catbase.kocicaci[kocicakIndex].fotky[Math.round(Math.random())] + "')";
                kocicakDiv.getElementsByClassName("titulna-fotka")[0].style.backgroundImage = galeriaFotka;
            };
        }
    });
});