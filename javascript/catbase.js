var zobrazenaTabulka, macaciaTabulka, kocicakForma, kocicak, titulnaFotka;
var catbase = {}, filteredCatBase = {}, vekCombobox = {}, pohlavieCombobox = {}, plemenoCombobox = {}, farbaCombobox = {}, sterilizaciaCombobox = {}, ockovanieCombobox = {}, hendikepCombobox = {}, okresCombobox = {}, utulokCombobox = {};


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
    var catbaseFilterName = document.getElementById("catbaseFilter-Meno").value;
    filteredCatBase.kocicaci = catbase.kocicaci.filter(function (kocicak) { return kocicak.meno === catbaseFilterName || catbaseFilterName == "";});
    
    var catbaseFilterVek = document.getElementById("catbaseFilter-Vek").value;
    filteredCatBase.kocicaci = filteredCatBase.kocicaci.filter(function (kocicak) { return kocicak.vek === catbaseFilterVek || catbaseFilterVek == "";});
    
    var catbaseFilterPohlavie = document.getElementById("catbaseFilter-Pohlavie").value;
    filteredCatBase.kocicaci = filteredCatBase.kocicaci.filter(function (kocicak) { return kocicak.pohlavie === catbaseFilterPohlavie || catbaseFilterPohlavie == "";});
    
        var catbaseFilterPlemeno = document.getElementById("catbaseFilter-Plemeno").value;
    filteredCatBase.kocicaci = filteredCatBase.kocicaci.filter(function (kocicak) { return kocicak.plemeno === catbaseFilterPlemeno || catbaseFilterPlemeno == "";});
    
        var catbaseFilterFarba = document.getElementById("catbaseFilter-Farba").value;
    filteredCatBase.kocicaci = filteredCatBase.kocicaci.filter(function (kocicak) { return kocicak.farba === catbaseFilterFarba || catbaseFilterFarba == "";});
    
        var catbaseFilterSterilizacia = document.getElementById("catbaseFilter-Sterilizacia").value;
    filteredCatBase.kocicaci = filteredCatBase.kocicaci.filter(function (kocicak) { return kocicak.sterilizacia === catbaseFilterSterilizacia || catbaseFilterSterilizacia == "";});
    
        var catbaseFilterOckovanie = document.getElementById("catbaseFilter-Ockovanie").value;
    filteredCatBase.kocicaci = filteredCatBase.kocicaci.filter(function (kocicak) { return kocicak.ockovanie === catbaseFilterOckovanie || catbaseFilterOckovanie == "";});
    
        var catbaseFilterHendikep = document.getElementById("catbaseFilter-Hendikep").value;
    filteredCatBase.kocicaci = filteredCatBase.kocicaci.filter(function (kocicak) { return kocicak.hendikep === catbaseFilterHendikep || catbaseFilterHendikep == "";});
    
        var catbaseFilterOkres = document.getElementById("catbaseFilter-Okres").value;
    filteredCatBase.kocicaci = filteredCatBase.kocicaci.filter(function (kocicak) { return kocicak.okres === catbaseFilterOkres || catbaseFilterOkres == "";});

            var catbaseFilterUtulok = document.getElementById("catbaseFilter-Utulok").value;
    filteredCatBase.kocicaci = filteredCatBase.kocicaci.filter(function (kocicak) { return kocicak.utulok === catbaseFilterUtulok || catbaseFilterUtulok == "";});
}

function filter() {
    catbaseFilter();
    nastavTabulku(filteredCatBase);   
}

function nastavCombobox(id, hodnoty, text) {
        var filterComboboxElement = document.getElementById(id);
    var hodnotaFiltraPrazdna = document.createElement("option");
            hodnotaFiltraPrazdna.value = "";
            hodnotaFiltraPrazdna.innerHTML = text;
            filterComboboxElement.appendChild(hodnotaFiltraPrazdna)
        hodnoty.forEach(function(hodnota) {
            var hodnotaFiltra = document.createElement("option");
            hodnotaFiltra.value = hodnota;
            hodnotaFiltra.innerHTML = hodnota;
            filterComboboxElement.appendChild(hodnotaFiltra);
        });    
}

$(document).ready(function () {
    "use strict";
    $.getJSON('../data/catbase.json', function (data) {
        catbase = data;
        nastavTabulku(catbase);
        vekCombobox = jQuery.unique(catbase.kocicaci.map(kocicak => kocicak.vek));
        nastavCombobox("catbaseFilter-Vek", vekCombobox, "Vek");
        pohlavieCombobox = jQuery.unique(catbase.kocicaci.map(kocicak => kocicak.pohlavie));
        nastavCombobox("catbaseFilter-Pohlavie", pohlavieCombobox, "Pohlavie");

        plemenoCombobox = jQuery.unique(catbase.kocicaci.map(kocicak => kocicak.plemeno));
        nastavCombobox("catbaseFilter-Plemeno", plemenoCombobox, "Plemeno");

        farbaCombobox = jQuery.unique(catbase.kocicaci.map(kocicak => kocicak.farba));
        nastavCombobox("catbaseFilter-Farba", farbaCombobox, "Farba");
        
        sterilizaciaCombobox = jQuery.unique(catbase.kocicaci.map(kocicak => kocicak.sterilizacia));
        nastavCombobox("catbaseFilter-Sterilizacia", sterilizaciaCombobox, "Sterilizacia");
        
        ockovanieCombobox = jQuery.unique(catbase.kocicaci.map(kocicak => kocicak.ockovanie));
        nastavCombobox("catbaseFilter-Ockovanie", ockovanieCombobox, "Očkovanie");

        hendikepCombobox = jQuery.unique(catbase.kocicaci.map(kocicak => kocicak.hendikep));
        nastavCombobox("catbaseFilter-Hendikep", hendikepCombobox, "Hendikep");

        okresCombobox = jQuery.unique(catbase.kocicaci.map(kocicak => kocicak.okres));
        nastavCombobox("catbaseFilter-Okres", okresCombobox, "Okres");

        utulokCombobox = jQuery.unique(catbase.kocicaci.map(kocicak => kocicak.utulok));
        nastavCombobox("catbaseFilter-Utulok", utulokCombobox, "Útulok");
    });
});