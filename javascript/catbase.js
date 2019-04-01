var zobrazenaTabulka, macaciaTabulka, kocicakForma, kocicak, titulnaFotka;
var catbase = {}, filteredCatBase = {}, vekCombobox = {}, pohlavieCombobox = {}, plemenoCombobox = {}, farbaCombobox = {}, sterilizaciaCombobox = {}, ockovanieCombobox = {}, hendikepCombobox = {}, okresCombobox = {}, utulokCombobox = {}, plemenoCheckbox = {};
var zbalenyFilter = true;

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

function nastavCheckbox(id, hodnoty, text) {
    var filterComboboxElement = document.getElementById(id);

    var hodnotaFiltraPrazdnaText = document.createElement("div");
    hodnotaFiltraPrazdnaText.classList.add("checkbox-text");
    hodnotaFiltraPrazdnaText.innerHTML = text;
    
    var hodnotaFiltraPrazdna = document.createElement("INPUT");
    hodnotaFiltraPrazdna.classList.add("checkbox-tlacidlo");
    hodnotaFiltraPrazdna.setAttribute("type", "checkbox");
    hodnotaFiltraPrazdna.value = "";
    hodnotaFiltraPrazdna.checked = true;
    
    filterComboboxElement.appendChild(hodnotaFiltraPrazdnaText);
    filterComboboxElement.appendChild(hodnotaFiltraPrazdna);

    hodnoty.forEach(function(hodnota) {
        var medzera = document.createElement("br");
        
        var hodnotaFiltraText = document.createElement("div");
        hodnotaFiltraText.classList.add("checkbox-text");
        hodnotaFiltraText.innerHTML = hodnota;
        
        var hodnotaFiltra = document.createElement("INPUT");
        hodnotaFiltra.setAttribute("type", "checkbox");
        hodnotaFiltra.value = "hodnota";
        hodnotaFiltra.checked = false;
        
        filterComboboxElement.appendChild(medzera);
        filterComboboxElement.appendChild(hodnotaFiltraText);
        filterComboboxElement.appendChild(hodnotaFiltra);
    });  
}

function zbalARozbalFilter(id) {
    zbalenyFilter = !zbalenyFilter;
    if (zbalenyFilter) {
        $("#" + id).removeClass("rozbaleny");
        $("#" + id).addClass("zabaleny");        
    }
    else {
        $("#" + id).removeClass("zabaleny");
        $("#" + id).addClass("rozbaleny");        
    }
}

$(document).ready(function () {
    "use strict";
    $.getJSON('data/catbase.json', function (data) {
        catbase = data;
        nastavTabulku(catbase);
        vekCombobox = jQuery.unique(catbase.kocicaci.map(function(kocicak) { return kocicak.vek;}));
        nastavCombobox("catbaseFilter-Vek", vekCombobox, "Nerozhoduje");
        pohlavieCombobox = jQuery.unique(catbase.kocicaci.map(function(kocicak) { return kocicak.pohlavie;}));
        nastavCombobox("catbaseFilter-Pohlavie", pohlavieCombobox, "Nerozhoduje");

        plemenoCombobox = jQuery.unique(catbase.kocicaci.map(function(kocicak) { return kocicak.plemeno;}));
        nastavCombobox("catbaseFilter-Plemeno", plemenoCombobox, "Plemeno");
        
        plemenoCheckbox = plemenoCombobox;
        nastavCheckbox("catbaseFilter-PlemenoCheckbox", plemenoCheckbox, "Nerozhoduje");

        farbaCombobox = jQuery.unique(catbase.kocicaci.map(function(kocicak) { return kocicak.farba;}));
        nastavCombobox("catbaseFilter-Farba", farbaCombobox, "Farba");
        
        sterilizaciaCombobox = jQuery.unique(catbase.kocicaci.map(function(kocicak) { return kocicak.sterilizacia;}));
        nastavCombobox("catbaseFilter-Sterilizacia", sterilizaciaCombobox, "Nerozhoduje");
        
        ockovanieCombobox = jQuery.unique(catbase.kocicaci.map(function(kocicak) { return kocicak.ockovanie;}));
        nastavCombobox("catbaseFilter-Ockovanie", ockovanieCombobox, "Nerozhoduje");

        hendikepCombobox = jQuery.unique(catbase.kocicaci.map(function(kocicak) { return kocicak.hendikep;}));
        nastavCombobox("catbaseFilter-Hendikep", hendikepCombobox, "Nerozhoduje");

        okresCombobox = jQuery.unique(catbase.kocicaci.map(function(kocicak) { return kocicak.okres;}));
        nastavCombobox("catbaseFilter-Okres", okresCombobox, "Okres");

        utulokCombobox = jQuery.unique(catbase.kocicaci.map(function(kocicak) { return kocicak.utulok;}));
        nastavCombobox("catbaseFilter-Utulok", utulokCombobox, "Útulok");
    });
});