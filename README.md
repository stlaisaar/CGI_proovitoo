# CGI proovitöö
Proovitööks on veebirakendus, mis on sisuliselt päeva pikkuse leidja. Selle abil saab leida koordinaatidele ja kuupäevale vastava päeva pikkust, kuvatakse ka sama päeva päikesetõusu ja -loojangu kellaaeg UTC ajavormingus. Lisaks on võimalik ette anda kuupäevavahemik ning kuvada sellele vastavate päevapikkuste (minutites) graafikut.  
Koordinaatide valimine käib kas maailmakaardile vajutades või sisestades neid vastavatesse väljadesse. Koordinaatide vaikeväärtused vastavad Tartu Riia-Vabaduse-Turu ristmikule.

## Kuidas jooksutada
1.	Tõmba [Node.js](https://nodejs.org/en/docs/).
    - Näiteks lingilt: https://nodejs.org/en/ (soovitatavalt versioon 12.16.2 LTS)
2.	Klooni [minu GitHub-i repositoorium](https://github.com/stlaisaar/CGI_proovitoo).
    - Näiteks Windows-i arvutites ava Command Prompt, navigeeri soovitud kausta ning jooksuta käsku:  
`git clone https://github.com/stlaisaar/CGI_proovitoo.git`.
3.	Navigeeri näiteks eelnevalt avatud Command Prompt-iga repositooriumi kausta sisse. 
    - Näiteks käsuga: `cd cgi_proovitoo`.
4.	Jooksuta kausta sees käsku: `npm install`, millega installitakse projektis kasutatud dependency’d.
5.	Jooksuta käsku `npm start`. Seejärel peaks avanema brauseriaken, milles saab interakteeruda minu veebirakendusega. Kui aken ise ei avanenud, navigeeru brauseris aadressile http://localhost:3000/.

Edasi võib rakendust katsetada nii nagu soovite. Soovitan enne uurida ülalolevat proovitöö kirjeldust, mis seletab lahti veebirakenduse võimalusi. Pea silmas, et funktsionaalsusel on ka teatud piiranguid, mis tulenevad bug-idest ja muudest probleemidest – täpsemalt lahti seletatud allpool.

## Teadaolevad bug-id ja probleemid
1. Päeva pikkuse ning päikesetõusu ja -loojangu andmete kogumise API on viimastel päevadel (20.04.20 - 22.04.20) olnud tihti maas, mistõttu on samal ajal "maas" ka enamus veebirakenduse funktsionaalsusest.
2. Graafiku jaoks API-st andmete küsimisel jõuavad andmed mõnikord tagasi vales järjekorras. Seetõttu on ka graafikul väärtused vahel vales järjekorras.
3. Kui laius- ja/või pikkuskraadi väärtuseks sisestada täpselt 0, ei ole API-le päringut esitades võimalik 0-väärtusega koordinaatidele vastavaid andmeid saada. Seetõttu olen asendanud väärtused 0 väärtusega 0.0001, mis annab üsnagi ligilähedase tulemuse. kuid mitte siiski täpselt selle, mida nõuti.
4. Mõnikord tuleb andmete fetch-imisel järgmine error console-i: '... has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.'. Seega vastavaid andmeid pole võimalik veebirakenduses kahjuks kuvada.
   - Ei suutnud hetkel leida või tööle saada ühtegi sobivat fix-i.

## Raskused ja ajakulu
Terve projekt oli võrdlemisi raske, kuid seetõttu ka eriti arendav ja huvitav. Raskus tulenes peamiselt sellest, et mul on varasemalt pigem vähem kogemusi veebirakenduste arendamisega. Olin küll näiteks ReactJS-ga varasemalt tuttav, kuid nii laia (minu jaoks) funktsionaalusust pole varem implementeerima pidanud. Samuti olen varasemalt kogenenumatelt arendajatelt vajadusel abi saanud. Pidevalt mõnevõrra keerukaks osutus sobivate dependency-te otsimine ja ka nende tööle saamine. Tundsin kohati, et React-i kasutamine piiras mu võimalusi, sest funktsionaalsuse poolest sobivad library-d pidid React-iga ka ühilduma.

Kõige keerukamaks osaks oli maailmakaardi tööle saamine React-i kasutades. Üritasin  kasutada OpenLayers-i, Leaflet-i kui ka Google Maps-i võimalusi, kuid ei saanud esialgu ühtegi neist korralikult tööle. Lõpuks siiski Leaflet-i, React-Leaflet-i ja internetist leidud fix-ide abil see õnnestus.

Kuigi graafiku joonistamine ja kasutamine polnud otseselt raske, oli see siiski võrdlemisi tüütu. Siin kulus aeg peamiselt sellele, et leida sobiv dependency, mis lubaks ennast piisavalt minu vajadustele vastavalt kohandada. Lõpuks osutus selleks React-Vis, millega jäin üsna rahule.

Muu funktsionaalsus polnud otseselt raske, kuid nõudis siiski selle kallal töötamist ja selle kohta uurimist. Kuna ma pole kõigi veebirakenduste loomise (lugematu arvu) heade tavadega veel kursis ning proovitöö piiratud aja jooksul polnud selleks ka piisavalt aega, ei oska ma eriti täpselt oma lahenduste kvaliteeti hinnata. Samas funktsionaalsus on suuresti olemas nii nagu vaja (minu arusaama kohaselt).

Pidevaks takistuseks, just viimastel päevadel, osutus valitud päeva andmete API, mis oli tihti maas. See takistas oluliselt sellega seotud funktsionaalsuse (mis on enamus veebirakendusest) juurde kirjutamist ja testimist. Lisaks tekitas API-st andmete saamisel probleeme Cross-Origin Resource Sharing (CORS).

Ajakuluks hindaksin umbes 15-20 tundi. Täpsemalt ei oska kahjuks hetkel öelda, kuna tegelesin proovitööga mõnikord mitu tundi järjest, kuid mõnikord ka muude kohustuste vahelt tekkinud vabadel hetkedel. Pigem kaldub ajakulu 20 tunni poole, kui arvestada sinna sisse dokumentatsioonide lugemisi, videote vaatamisi jms.

## Autor
Siim Tanel Laisaar
