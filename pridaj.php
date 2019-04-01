<?php
    header("Content-Type: text/html; charset=utf-8");

    function prepareJSON($input) {
        //This will convert ASCII/ISO-8859-1 to UTF-8.
        //Be careful with the third parameter (encoding detect list), because
        //if set wrong, some input encodings will get garbled (including UTF-8!)
        $imput = mb_convert_encoding($input, 'UTF-8', 'ASCII,UTF-8,ISO-8859-1');
        //Remove UTF-8 BOM if present, json_decode() does not like it.
        if(substr($input, 0, 3) == pack("CCC", 0xEF, 0xBB, 0xBF)) $input = substr($input, 3);
        return $input;
    }

    if(!empty($_POST['meno'])) {        
        $databaza = file_get_contents('data/catbase.json');
        $databazaJSON = json_decode(prepareJSON($databaza), true);
         $kocicak['id'] = $_POST['idKocicaka'];
         $kocicak['meno'] = $_POST['meno'];
         $kocicak['vek'] = $_POST['vek'];
         $kocicak['pohlavie'] = $_POST['pohlavie'];
         $kocicak['plemeno'] = $_POST['plemeno'];
         $kocicak['farba'] = $_POST['farba'];
         $kocicak['sterilizacia'] = $_POST['sterilizacia'];
         $kocicak['ockovanie'] = $_POST['ockovanie'];
         $kocicak['hendikep'] = $_POST['hendikep'];
         $kocicak['pribeh'] = $_POST['pribeh'];
         $kocicak['okres'] = $_POST['okres'];
         $kocicak['utulok'] = $_POST['utulok'];
         $kocicak['datum'] = $_POST['datum'];
         if (!empty($_FILES['profilovaFotka'])) {
//             echo $_FILES['profilovaFotka']['name'];
             $kocicak['titulnaFotka'] = $_FILES['profilovaFotka']['name'];
             $fotky = array();
             $fotky[] = $_FILES['profilovaFotka']['name'];
             $dalsieFotky = 2;
             $dalsiaFotka = 'fotka' . $dalsieFotky;
  //           echo $dalsiaFotka;
    //         echo $_FILES[$dalsiaFotka]['name'];
             while(!empty($_FILES[$dalsiaFotka] && !!$_FILES[$dalsiaFotka]['name'])) {
      //         echo $_FILES[$dalsiaFotka]['name'];
               $fotky[] = $_FILES[$dalsiaFotka]['name'];
               $dalsieFotky = $dalsieFotky + 1;
               $dalsiaFotka = 'fotka' . $dalsieFotky;
             }
        //     echo $fotky;
             $kocicak['fotky'] = $fotky;
         }
       //  echo json_encode($kocicak);
        
         array_push( $databazaJSON['kocicaci'], $kocicak);
         $databaza = json_encode($databazaJSON);

      //  echo $databaza;
    //    echo $databazaJSON['kocicaci'];

         if (json_decode($databaza) != null && $databazaJSON['kocicaci'] != null)
           {
             file_put_contents('data/catbase.json', "\xEF\xBB\xBF".$databaza);

             if (!empty($_FILES['profilovaFotka'])) {
                 $priecinok = "data/" . $_POST['idKocicaka'] . "/";
                 
                 if (!file_exists($priecinok)) {
                    mkdir("data/" . $_POST['idKocicaka'], 0777);
                 }
                 
                 $subor = $priecinok . basename($_FILES['profilovaFotka']['name']);
                 if (move_uploaded_file($_FILES['profilovaFotka']['tmp_name'], $subor)) {
                    echo "<br> Fotka ".  basename( $_FILES['profilovaFotka']['name']). 
                      " bola uložená";
                    } else{
                        echo "<br> !!! Fotka".  basename( $_FILES['profilovaFotka']['name']). 
                      " nebola uložená !!!";;
                    }
               
                 $dalsieFotky = 2;
                 $dalsiaFotka = 'fotka' . $dalsieFotky;
                 while(!empty($_FILES[$dalsiaFotka] && !!$_FILES[$dalsiaFotka]['name'])) {
                   $fotky[] = $_FILES[$dalsiaFotka]['name'];
                     
                   $subor = $priecinok . basename($_FILES[$dalsiaFotka]['name']);
                   if (move_uploaded_file($_FILES[$dalsiaFotka]['tmp_name'], $subor)) {
                       echo "<br> Fotka ".  basename( $_FILES[$dalsiaFotka]['name']). 
                           " bola uložená";
                   } else{
                        echo "<br> !!! Fotka".  basename( $_FILES[$dalsiaFotka]['name']). 
                          " nebola uložená !!!";;
                        }
                   $dalsieFotky = $dalsieFotky + 1;
                   $dalsiaFotka = 'fotka' . $dalsieFotky;
                 }
            }
             echo "<br>Kočičák vytvorený :)";
           }
           else
           {
             echo "<br>Nepodaril sa zápis";
           }
       }
    else {
         echo "<br>Nebolo zadané meno";
    }

    echo '<br><br><a href="http://najdimesa.ihostfull.com/pridaj.html">Vytvoriť ďalšieho kočičáka :)</a>';
?>	