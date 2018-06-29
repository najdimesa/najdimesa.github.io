var zobrazenaTabulka, macaciaTabulka, kocicakForma, kocicak, titulnaFotka;
var catbase = {}, filteredCatBase = {};


function nastavTabulku(databaza) {
    "use strict";
    var i;
    zobrazenaTabulka = databaza;
    macaciaTabulka = document.getElementById("cat-table");
    macaciaTabulka.innerHTML = "";
    for (i = 0; i < zobrazenaTabulka.kocicaci.length; i = i + 1) {
        kocicakForma = document.getElementById("kocicak-forma");
        kocicak = document.createElement("div");
        kocicak.id = "cat" + (i + 1);
        kocicak.className = "kocicak";
        macaciaTabulka.appendChild(kocicak);
        kocicak.innerHTML = kocicakForma.innerHTML;

        kocicak.getElementsByClassName("meno")[0].innerHTML = zobrazenaTabulka.kocicaci[i].meno;

        titulnaFotka = "url('data/" + zobrazenaTabulka.kocicaci[i].id + "/" + zobrazenaTabulka.kocicaci[i].titulnaFotka + "')";
        kocicak.getElementsByClassName("titulna-fotka")[0].style.backgroundImage = titulnaFotka;

        kocicak.getElementsByClassName("vek")[0].innerHTML = "Vek: " + zobrazenaTabulka.kocicaci[i].vek;

        kocicak.getElementsByClassName("plemeno")[0].innerHTML = "Plemeno: " + zobrazenaTabulka.kocicaci[i].plemeno;

        kocicak.getElementsByClassName("utulok")[0].innerHTML = "Miesto: " + zobrazenaTabulka.kocicaci[i].utulok;

        kocicak.getElementsByClassName("pribeh")[0].innerHTML = zobrazenaTabulka.kocicaci[i].pribeh;
        let kocicakIndex = i;
        let kocicakDiv = kocicak;
        kocicak.getElementsByClassName("titulna-fotka")[0].onclick = function() {
             var galeriaFotka = "url('data/" + zobrazenaTabulka.kocicaci[kocicakIndex].id + "/" + zobrazenaTabulka.kocicaci[kocicakIndex].fotky[Math.round(Math.random())] + "')";
            kocicakDiv.getElementsByClassName("titulna-fotka")[0].style.backgroundImage = galeriaFotka;
        };
    }    
}

function catbaseFilter() {
    var catbaseFilterName = document.getElementById("catbaseFilter").value;
    filteredCatBase.kocicaci = catbase.kocicaci.filter(function (kocicak) { return kocicak.meno === catbaseFilterName || catbaseFilterName == "";});
    nastavTabulku(filteredCatBase);
}

function filter() {
    catbaseFilter();
    
}

$(document).ready(function () {
    "use strict";
    $.getJSON('../data/catbase.json', function (data) {
        catbase = data;
        nastavTabulku(catbase);
    });
});