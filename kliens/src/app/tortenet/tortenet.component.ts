//Történet oldal viselkedéséért felelős ts
import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../footer/footer.component';
import { AuthService } from '../services/auth.service';

@Component({
    selector: 'app-tortenet',
    imports: [FooterComponent, CommonModule],
    templateUrl: './tortenet.component.html',
    styleUrl: './tortenet.component.css',
    encapsulation: ViewEncapsulation.None
})
export class TortenetComponent {
  egyszeru: boolean = true;
  reszletes: boolean = false;
  temaSzin: string = '';
  temaSzin2: string = '';
  temaSzinN: string = '';
  temaSzinBetu: string = '';
  temaSzinHover: string = '';
  temaSzinGordulo: string = '';
  sotet: boolean = true;
  vilagos: boolean = false;
  voros: boolean = false;

  constructor(private authservice: AuthService) {}

  ngOnInit(): void {
    this.authservice.szamSzin$.subscribe( szam => {
      if(szam === 1){
        this.temaSzin = 'feketeK';
        this.temaSzin2 = 'feketeK2';
        this.temaSzinN = 'feketeN';
        this.temaSzinBetu = 'feketeBetu';
        this.temaSzinHover = 'feketeH';
        this.temaSzinGordulo = 'feketeG';
        this.sotet = true;
        this.vilagos = false;
        this.voros = false;
      }
      else if(szam === 2){
        this.temaSzin = 'feherK';
        this.temaSzin2 = 'feherK2';
        this.temaSzinN = 'feherN';
        this.temaSzinBetu = 'feherBetu';
        this.temaSzinHover = 'feherH'
        this.temaSzinGordulo = 'feherG';
        this.sotet = false;
        this.vilagos = true;
        this.voros = false;
      }
      else if(szam === 3){
        this.temaSzin = 'vorosK';
        this.temaSzin2 = 'vorosK2';
        this.temaSzinN = 'vorosN';
        this.temaSzinBetu = 'vorosBetu';
        this.temaSzinHover = 'vorosH';
        this.temaSzinGordulo = 'vorosG';
        this.sotet = false;
        this.vilagos = false;
        this.voros = true;
      }else{
        this.temaSzin = 'feketeK';
        this.temaSzin2 = 'feketeK2';
        this.temaSzinN = 'feketeN';
        this.temaSzinBetu = 'feketeBetu';
        this.temaSzinHover = 'feketeH';
        this.temaSzinGordulo = 'feketeG';
        this.sotet = true;
        this.vilagos = false;
        this.voros = false;
      };
    });
  }

  //Egyszerű oldalra váltás
  egyszeruClick(){
    this.egyszeru = true;
    this.reszletes = false;
  }
  //Részletes oldalra váltás
  reszletesClick(){
    this.egyszeru = false;
    this.reszletes = true;
  }

  //Részletes oldal tartalma:
  elozmenyek = [
    { ev: 1894, esemenyek: 'Első verseny Franciaországban' },
    { ev: 1906, esemenyek: 'Első nagydíj Franciaországban; nyertese Szisz Ferenc, a Renault magyar származású versenyzője.' },
    { ev: 1921, esemenyek: 'Első olasz nagydíj' },
    { ev: 1922, esemenyek: 'A 2 literes határ bevezetése az első nemzetközileg érvényes szabály' },
    { ev: 1925, esemenyek: 'Első belga nagydíj' },
    { ev: 1926, esemenyek: 'Lökettérfogat csökkentése 1,5 literre. Első Brit és német nagydíj' },
    { ev: 1928, esemenyek: 'Nincs felső lökettérfogat-határ' },
    { ev: 1929, esemenyek: 'Első monacói nagydíj' },
    { ev: 1934, esemenyek: 'Kocsik megengedett legnagyobb súlya 750 kg' },
    { ev: 1934, esemenyek: 'A Mercedes-Benz és az Auto Union dominál' },
    { ev: 1938, esemenyek: 'Dick Seaman megnyeri a német nagydíjat' },
    { ev: 1945, esemenyek: 'Háború utáni első verseny' },
    { ev: 1946, esemenyek: 'Nemzetközi irányító testületek FIA (Fédération Internationale de l\'Automobile) néven egyesülnek' },
    { ev: 1947, esemenyek: 'Újraélesztések évében az Alfa Romeo dominál' },
    { ev: 1948, esemenyek: 'Bevezetik az új Formula 1-et: sűrítővel (kompresszorral) 1,5 liter, anélkül 4,5 liter a felső határ. Megjelenik a Maserati és az új Ferrari márka. Achille Varzi meghal a svájci nagydíjon. Sikerei ellenére az Alfa gazdasági okokból kiszáll.' },
    { ev: 1949, esemenyek: 'Juan Manuel Fangio európai debütálása. Bemutatják a balsorsra ítélt BRM V16-os kocsit.' }
  ];

  ev50 = [
    { ev: 1950, esemenyek: 'Első FIA egyéni világbajnokság - hat európai Grand Prix plusz Indy500. Az Alfa Fangióval, Giuseppe Farinával és Luigi Fagiolival visszatér és uralja a bajnokságot. Fangio előtt Farina szerzi meg a trófeát.' },
    { ev: 1951, esemenyek: 'Az Alfa dominál, de a Ferrari és José Froilán González áttörést hajt végre a brit nagydíjon. Az utolsó futamon Fangio (Alfa) megszerzi a címet Alberto Ascari (Ferrari) elől. A BRM és a Girling bemutatja a tárcsafékeket.' },
    { ev: 1952, esemenyek: 'Az Alfa visszavonulása után a világbajnokságot a 2 literes, sűrítő nélküli kocsiknak rendezik. A Ferrari dominál, Ascari könnyen győz.' },
    { ev: 1953, esemenyek: 'Ismét Ascari és a Ferrari a bajnok. Mike Hawthorn (Ferrari) és Fangio (Maserati) legendás párbaja Reimsben 1923 óta az első brit győzelmet eredményezi.' },
    { ev: 1954, esemenyek: 'Bevezetik a 2,5 literes, sűrítő nélküli Formula 1-et, ami visszacsábítja a Mercedest. Fangio másodszor is világbajnok. Az évet a Maseratival kezdte, és a Mercedesszel fejezte be.' },
    { ev: 1955, esemenyek: 'Stirling Moss is beáll a Mercedeshez, Fangio harmadszor is világbajnok. Ascari Monzában sportkocsibaleset áldozata lesz. Tony Brooks és a Connaught megszerzi az 1924-es syracuse-i futam óta első tiszta brit Grand Prix győzelmet. A Le Mans-i tragédia miatt három futam elmarad (Német, Francia, svájci nagydíj - utóbbi országban be is tiltják a gyorsasági autóversenyeket), a Mercedes pedig év végén kiszáll.' },
    { ev: 1956, esemenyek: 'Fangio a Lancia-Ferrarival negyedszer is világbajnok. Erősödik a brit konkurencia: Stirling Moss és Peter Collins is futamelsőséghez jut.' },
    { ev: 1957, esemenyek: 'Fangio a Maseratihoz szerződik, és megszerzi ötödik világbajnoki címét. Négy futamgyőzelme során nagyot csatázott többek között a Nürburgringen is Collinsszal és Hawthornnal. Moss átáll a Vanwallhoz, és megnyeri a Brit (Brooksszal), a Pescarai és az olasz nagydíjat is.' },
    { ev: 1958, esemenyek: 'Megszűnik a futam közbeni versenyzőváltás. Hawthorn (Ferrari) egyetlen franciaországi Grand Prix-győzelemmel az első brit világbajnok. Életét veszti Collins, Stuart Lewis-Evans és Luigi Musso, valamint közúti balesetben a gyászoló Hawthorn is. Fangio visszavonul, Moss a Cooperrel megszerzi a farmotoros kocsik első Grand Prix-győzelmét. A Vanwall az első világbajnok konstruktőr.' },
    { ev: 1959, esemenyek: 'A farmotoros kocsik átveszik az uralmat. Jack Brabham, a Cooper gyári pilótája világbajnok, Moss egyénileg nevezett Cooperje lerobban. A Vanwall kiszállása és a Ferrari küzdelmei miatt a Cooper nyeri a konstruktőr-világkupát. Debütál a Lotus. Bruce McLaren az USA nagydíjat 22 évesen nyeri meg, ezzel egészen 2003-ig a legfiatalabb GP-győztesnek számít.' }
  ];

  ev60 = [
    { ev: 1960, esemenyek: 'Új pontrendszer: eltörlik a leggyorsabb körét járó bónuszpontot, viszont jár 1 pont a hatodik helyezésért. Ismét Brabham és a Cooper a bajnok, a Lotus megszerzi első Grand Prix-elsőségét. A Ferrari nyeri az olasz nagydíjat, melyet a britek a zötyögős döntött szakasz miatt bojkottálnak. Az Indy500 utoljára szerepel a világbajnokságban.' },
    { ev: 1961, esemenyek: 'A Formula-1 előírja az 1,5 literes sűrítő nélküli kocsik használatát. Ferrari és a V6-os Dino dominál. Phil Hill az USA első világbajnoka, de csapattársa Wolfgang von Trips Monzában meghal. A Lotus begyűjti a morzsákat: Moss Németországban, Innes Ireland az USA-ban győz.' },
    { ev: 1962, esemenyek: 'Ismét a britek uralják a mezőnyt a Climaxszal és a BRM V8-asával. Az új sztárok a világbajnok Graham Hill (BRM) és Jim Clark (Lotus). Moss balesete Goodwoodban kettétöri a pályafutását. A héjszerkezetű Lotus 25 forradalmasítja a sportágat. Monacóban Bruce McLaren a róla elnevezett kocsiban győz.' },
    { ev: 1963, esemenyek: 'Hét Grand Prix-ből hetet Clark és a Lotus nyer meg. A britek tarolnak: Graham Hill és a BRM kétszer, a volt motorkerékpár világbajnok John Surtees és a Ferrari egyszer győz.' },
    { ev: 1964, esemenyek: 'Folytatódik a britek dominanciája. A mexikói döntőben hármas csata dúl Surtees (Ferrari), Hill (BRM) és Clark (Lotus) között. John Surtees lesz a világbajnok.' },
    { ev: 1965, esemenyek: 'A Lotus és Clark másodszor is világbajnok. Clark tíz futamból hatszor győz, Jackie Stewart megszerzi első olaszországi győzelmét a későbbi huszonhétből, míg a Honda és a Goodyear Mexikóban Richie Ginther révén először lesz futamelső.' },
    { ev: 1966, esemenyek: 'A 3 literes formula döcögős bemutatkozása. Jack Brabham és a Brabham-Repco lesz a világbajnok.' },
    { ev: 1967, esemenyek: 'Denny Hulme megszerzi a Brabham egymás utáni második világbajnoki címét. Monacóban életét veszti Lorenzo Bandini (Ferrari). Clark Lotusában Zandvoortban győzelemmel debütál minden idők legsikeresebb Formula-1-es motorja, a Ford DFV.' },
    { ev: 1968, esemenyek: 'A veszteséglista: Jim Clark, Ludovico Scarfiotti, Mike Spence és Jo Schlesser. Clark megmagyarázhatatlan balesetet szenved egy hockenheimi Formula-2-es futamon. Graham Hill az első DFV-motoros győzelemmel helyreállítja a Lotus harci kedvét. A szárnyak és az aerodinamika egyre nagyobb jelentőségre tett szert. A Gold Leaf Lotusszal beköszönt a szponzorok kora.' },
    { ev: 1969, esemenyek: 'Jackie Stewart, a Tyrrell által benevezett Matrák és a DFV-k dominálnak: megnyernek hat Grand Prix-t, valamint az egyéni- és a konstruktőrök világbajnokságát is.' }
  ];

  ev70 = [
    { ev: 1970, esemenyek: 'Jochen Rindt lesz az első posztumusz világbajnok, miután az olasz nagydíj előtt az edzésen életét vesztette. Bruce McLaren meghal CanAm-kocsija tesztelése közben. A tragikus szezon harmadik áldozata Piers Courage. Jack Brabham visszavonul, és bemutatkoznak a Tyrrell saját építésű kocsijai.' },
    { ev: 1971, esemenyek: 'Jackie Stewart második világbajnokságával megszerzi a Tyrrell első konstruktőr-világbajnoki címét. Pedro Rodríguez és Jo Siffert életét veszti.' },
    { ev: 1972, esemenyek: 'Emerson Fittipaldi és a Lotus öt futamgyőzelemmel világbajnok lesz. Betegsége után Stewart csak második. Jo Bonnier Le Mansban halálos balesetet szenved.' },
    { ev: 1973, esemenyek: 'Stewart eldönti, hogy visszavonul, de előbb még harmadszor is megszerzi a világbajnoki címet. Futamelsőségei száma öttel nő, így 27 Grand Prix-győzelmével megjavítja Fangio 24-es rekordját. Csapattársa, François Cevert életét veszti az amerikai nagydíj edzésén.' },
    { ev: 1974, esemenyek: 'Emerson Fittipaldi átigazol a McLarenhez, majd világbajnok lesz. Peter Revson a dél-afrikai nagydíjon karambolozik az edzésen, és belehal sérüléseibe.' },
    { ev: 1975, esemenyek: 'Niki Lauda először világbajnok az egyre erősödő Ferrarival. Mark Donouhue nem éli túl az ausztriai balesetét. James Hunt és a Hesketh megnyeri a holland nagydíjat. Graham Hill és védence, Tony Brise meghal egy kisrepülőgépes balesetben.' },
    { ev: 1976, esemenyek: 'James Hunt az eső áztatta japán fináléban világbajnok lesz a McLarennel. Csaknem halálos nürburgringi balesete ellenére Lauda mindvégig versenyben van a címért.' },
    { ev: 1977, esemenyek: 'Niki Lauda és a Ferrari az első, de az osztrák pilóta 1978-ban a Brabhamhez szerződik. A Renault az RS01-gyel bemutatja az 1,5 literes turbófeltöltős motorokat, a Lotus 78-cal pedig megjelennek a légpárnás kocsik. Tom Pryce életét veszti a dél-afrikai nagydíj borzalmas balesetében.' },
    { ev: 1978, esemenyek: 'Miután a Lotus végig uralta a mezőnyt, Mario Andretti világbajnok lesz. Csapattársa, Ronnie Peterson belehal az olasz nagydíj rajtjánál történt balesete szövődményeibe. A Brabham-féle „propellerkocsi” megnyeri a svéd nagydíjat, majd eltiltják a további futamoktól.' },
    { ev: 1979, esemenyek: 'A légpárna elterjedt, a Ferrari visszatért. Jody Scheckter csapattársa, Gilles Villeneuve előtt szerzi meg a világbajnoki címet. Clay Regazzoni Silverstone-ban meghozza a Williams első futamgyőzelmét, melyhez Alan Jones még négyet tesz hozzá. Jean-Pierre Jabouille és a Renault megszerzi a turbófeltöltős kocsik első futamelsőségét. Lauda időlegesen, Hunt végleg visszavonul.' }
  ];
  
  ev80 = [
    { ev: 1980, esemenyek: 'A Ferrari nem tudta megismételni egy évvel korábbi sikereit, csak 8 pontot szerzett az 1979-es 113-hoz képest. Az idényt a Williams uralta, az egyéni világbajnoki címet Alan Jones nyerte az utolsó előtti, kanadai futamon vele ütköző és a versenyt feladó Nelson Piquet előtt. Az év közben lezajlott a sportág történetének első nagy sportpolitikai csatája: A FOCA és a FISA vitája miatt a Ferrari, az Alfa Romeo és a Renault versenyzői nem vettek részt a jaramai futamon. Az amerikai nagydíjon elszenvedett balesete után Clay Regazzoni tolószékbe kényszerült, pályafutása véget ért. A német nagydíj bemelegítésén Patrick Depailler életét vesztette.' },
    { ev: 1981, esemenyek: 'Nelson Piquet visszavágott Alan Jonesnak az egy évvel korábbi vereségért, és világbajnok lett. A pontverseny második helyén az argentin Carlos Reutemann végzett Jones előtt. A konstruktőrök között ismét a Williams lett a legjobb. Magára talált a Ferrari, a Renaultot követve elkezdett turbómotorokat építeni. Feltűnik a sportágban Ron Dennis, aki felvásárolja a McLaren csapatot. John Barnard elkészíti az első szénszálas karosszéria terveit. A belga nagydíjon az Osella csapat egyik szerelője halálos baleset áldozata lesz.' },
    { ev: 1982, esemenyek: 'Visszatért a sportágba Niki Lauda, egy McLaren volánja mögött. A San Marinó-i nagydíj ismét botránytól volt hangos: A Tyrrell kivételével az összes nem gyári csapat bojkottálta a versenyt, amin a Ferrari két versenyzője, Didier Pironi és Gilles Villeneuve végzett az élen. Utóbbi a verseny után azzal vádolta Pironit, hogy nem tartotta be a csapatutasítást. Viszonyuk elmérgesedett, és a következő, zolderi belga nagydíj edzésén a bizonyítási vágytól égő Villeneuve karambolozott Jochen Masszal, és a helyszínen életét vesztette. Pironit is utolérte végzete, amikor a német nagydíjon hátulról belerohat Alain Prost autójába. Mindkét lába eltörött, ami a pályafutása végét jelentette. Az egyéni világbajnoki címet végül a mindössze egy futamot nyerő finn Keke Rosberg hódította el. A csapatok között idény közben mindkét versenyzőjét elveszítő Ferrari győzött.' },
    { ev: 1983, esemenyek: 'Az idény műszaki viták és halálos balesetek nélkül zajlott, elterjedtek a turbómotorok. Nelson Piquet másodszor is világbajnok lett, alig megelőzve az utolsó futamon kieső Alain Prostot. A Ferrari ismét csapatvilágbajnok lett, ám ezt a teljesítményét 1998-ig nem tudta megismételni.' },
    { ev: 1984, esemenyek: 'Alain Prost a McLarenhez átigazolva verhetetlen párost alkotott Niki Laudával. Feltűnt a mezőnyben az ifjú Ayrton Senna, egy Toleman autóban, amellyel hatalmas meglepetésre már a második helyen haladt az esős monacói nagydíjon, amikor a futamot idő előtt leintették. A versenyzők csak a helyezésükért járó pontok felét kapták meg. Így fordulhatott elő, hogy Niki Lauda mindössze 0.5 ponttal előzte meg Alain Prostot az idény végén. A McLaren óriási előnnyel nyerte a konstruktőr vb-t a Ferrari előtt.' },
    { ev: 1985, esemenyek: 'Nigel Mansell a Williams, Ayrton Senna a Lotus csapathoz szerződött, utóbbi megszerezte első pole pozícióját és győzelmét az esős portugál nagydíjon. A francia nagydíjon Nelson Piquet nyert, 1957 óta ez volt az első győzelme a Pirelli abroncsoknak. Bemutatkozott a teljesen átépített Nürburgring és az ausztrál nagydíj az adelaidei utcai pályával. Elbúcsúzott a versenynaptártól a holland nagydíj, amelyen az idény végén visszavonuló Niki Lauda élete utolsó futamgyőzelmét szerezte. Az egyéni vb-t pályafutása során először Alain Prost nyerte egy McLaren autóval a ferraris Michele Alboreto előtt. A csapatok között a McLaren megvédte világbajnoki címét.' },
    { ev: 1986, esemenyek: 'Az évet a Williams két versenyzője, Nigel Mansell és Nelson Piquet uralta, ám végül egyikük sem lett világbajnok: Az évadzáró ausztrál nagydíjon mindketten defektet kaptak, és a nevető harmadik Alain Prost megvédte címét. Hosszú szünet után visszatért a versenynaptárba a spanyol nagydíj a jerezi pályával. Először rendezték meg a magyar nagydíjat az újonnan épített Hungaroringen. A versenyt Piquet nyerte Senna előtt, aki végül negyedik lett a pontversenyben, akárcsak az előző évben. A Williams nagy előnnyel nyerte a konstruktőr vb-t a McLaren előtt.' },
    { ev: 1987, esemenyek: 'A turbómotorok által leadott teljesítmény kezdett ellenőrizhetetlenné válni, egyes erőforrások már 1500 lóerőre is képesek voltak, de ez a megbízhatóság kárára ment. A versenyeken az edzéseken használthoz képest kisebb teljesítményű motorral álltak rajthoz a csapatok. Döntés született, hogy 1989-től betiltják a turbómotorokat, és 3.5 literes lökettérfogat-korlátozást vezetnek be. (1966 óta, amikor bevezették a 3 literes szabványt, ez volt a legjelentősebb formula-módosítás.) Akkora volt a különbség a hagyományos, atmoszferikus nyomáson működő motorokat használó csapatok hátránya, hogy a két átmeneti évre létrehozták számukra az "Atmo" kategóriát, a Jim-Clark-kupáért. Az évet a Williams két versenyzője, Nelson Piquet és Nigel Mansell uralta. Utóbbi állt jobban az idény nagy részében, de sorozatos kiesések nehezítették a dolgát, és csapattársa átvette a vezetést az összetettben. Még behozható volt a hátránya, amikor a japán nagydíjon balesetet szenvedett, és nem tudott rajthoz állni az utolsó két versenyen. Piquetnek így az is belefért, hogy mindkét hátralevő viadalon kiessen, így is világbajnok lett. A vb harmadik helyét az utolsó Lotusos évében addigi legjobb eredményét elérő Ayrton Senna szerezte meg. A legjobb csapat a Williams lett, megelőzve a McLarent. A szívómotoros autók Jim Clark-kupáját a Tyrrell nyerte meg, a legjobb, nem turbós versenyző Jonathan Palmer lett. (Jellemző, hogy a Tyrrell 11 pontja csak a 6. helyre volt elég, míg Palmer az első tízbe sem fért be.)' },
    { ev: 1988, esemenyek: 'A turbókorszak utolsó éve óriási McLaren-fölényt hozott, az Alain Prost, Ayrton Senna versenyzőpáros 16 futamból 15-öt megnyert. Egyedül az olasz nagydíjon fordult elő, hogy nem McLaren autó győzött: Gerhard Berger lett az első, aki Michele Alboretóval hazai pályán kettős győzelmet szerzett a Ferrarinak. Prost ugyan több pontot szerzett, mint Senna, de a pontszámítás sajátosságai miatt (16 verseny eredményéből csak a legjobb 11 számított a végelszámoláskor) mégis Senna lett a világbajnok, mert ő 8-szor győzött. A harmadik hely a fiatal Gerhard Bergeré lett. A konstruktőrök vb-címét sosem látott, 134 pontos előnnyel nyerte a McLaren a Ferrari előtt.' },
    { ev: 1989, esemenyek: 'Alain Prost és Ayrton Senna ismét összecsapott a világbajnoki címért a turbómotorok nélkül is gyors McLaren autóiban. A San Marinó-i nagydíj után viszonyuk kezdett vészesen elmérgesedni. Az 1982-es Villeneuve - Pironi vitához hasonló szituációban Senna az előzetes megbeszélés ellenére megelőzte Prostot a Gerhard Berger balesete miatt újraindított futamon. (Berger ugyanott, a Tamburello-kanyarban csúszott ki a pályáról, ahol 5 évvel később Senna is életét vesztette, ám őt élve sikerült kimenteni az égő ferrarijából.) Az utolsó előtti, japán nagydíj előtt Prost vezetett az összetettben. A versenyen ütközött Sennával, és mindketten kicsúsztak. Sennát visszatolták a pályára és megnyerte a futamot, de törölték az eredményét, mert külső segítséget vett igénybe. Senna megvádolta a FISA elnökét, Jean-Marie Balestrét, hogy szándékosan akarja elvenni tőle a világbajnoki címet. Ám az utolsó futamon kiesett, így Alain Prost lett az ötödik olyan versenyző, aki legalább 3 vb-t nyert. A harmadik helyen Riccardo Patrese zárt, a McLaren megvédte konstruktőri elsőségét, ezúttal a Williams előtt.' }
  ];
  
  ev90 = [
    { ev: 1990, esemenyek: 'Ayrton Senna és Alain Prost csatáját harmadszor is csak tisztes távolból tudta követni a többi versenyző. Kettejük rossz viszonya miatt Prost a holtidényben a Ferrarihoz igazolt, helyet cserélve Gerhard Bergerrel. Felmerült, hogy a FISA elnökét az elmúlt évben történtek miatt csalással vádoló Sennát kizárják az 1990-es küzdelmekből, csak az első futam előtt nem sokkal jelentették be, hogy elindulhat a vb-n. Felváltva nyerték a futamokat Prosttal, a döntés az utolsó, japán nagydíjra maradt. Akárcsak egy évvel korábban, most is összeütköztek, mindketten kiestek, és mivel a verseny előtt Senna állt jobban, ő lett a világbajnok. A harmadik helyen a Benettonnal versenyző Nelson Piquet zárt. A csapatok között ismét a McLaren bizonyult a legjobbnak, bár a második helyen végző Ferrari jóval közelebb került hozzá, mint bárki más az elmúlt években.' },
    { ev: 1991, esemenyek: 'Ayrton Senna legfőbb kihívója ebben az évben a visszavonulás helyett inkább a Williamshez igazoló Nigel Mansell volt. Senna az első négy versenyt pole pozícióból indulva nyerte meg, élete során először győzött a brazil nagydíjon, San Marinóban pedig csapattársát, Gerhard Bergert kivéve mindenkit lekörözve lett első. A kanadai nagydíjon Mansell óriási előnnyel vezetett, amikor az utolsó métereken leállt az autója, és a győzelem Nelson Piquet ölébe hullott. Mansell ezután zsinórban három futamot nyert, és a magyar nagydíj előtt már 8 pontra megközelítette Sennát. Ám ő a futamot megnyerve ismét növelni tudta előnyét, amit meg is tartott az idény végéig. Japánban Gerhard Berger győzött, miután a már világbajnok Senna nagyvonalúan maga elé engedte. Az évad során bemutatkozott két, később meghatározó szerepet játszó újonc is. Mika Häkkinen a Lotusnál kapott lehetőséget, a belga nagydíjon pedig Michael Schumacher a szintén újonc Jordan csapat egyik pilótája, Bertrand Gachot helyére ugrott be, akit nem sokkal a verseny előtt Londonban őrizetbe vettek egy taxisofőr bántalamazása miatt. Bár a versenyen kiesett, olyan meggyőző teljesítményt nyújtott, hogy a következő nagydíjra leszerződtette a Benetton csapat, és 5. helyével első pontjait is megszerezte. A konstruktőr-világbajnokságot zsinórban negyedszer is a McLaren nyerte a Ferrarit a harmadik helyre szorító Williams előtt.' },
    { ev: 1992, esemenyek: 'Nigel Mansell hosszú várakozás után (3-szor volt vb-második) végre világbajnok lett a Williams autók lehengerlő fölényének köszönhetően. Az első hét futamból hatot megnyert, csak a hetedik versenyen, Monacóban sikerült legyőznie a hercegségben mindig kiválóan szereplő Ayrton Sennának. Sikerszériája azonban folytatódott, nyert a brit nagydíjon is. (Itt mutatkozott be először egy Brabham autóban a későbbi világbajnok Damon Hill.) Mansell már az évad 11. versenyén, a magyar nagydíjon bebiztosította a világbajnoki címét, majd a következő, olasz nagydíjon ismét bejelentette, hogy visszavonul. Ugyanekkor a Honda is bejelentette, hogy kivonul a sportágból, ami a McLaren csapat visszaesését vetítette előre. Az esős belga nagydíjon Michael Schumacher megszerezte élete első futamgyőzelmét. A világbajnoki pontverseny második helyén Mansell csapattársa, Riccardo Patrese végzett, a dobogó harmadik fokáról az első teljes idényét teljesítő Michael Schumacher leszorította a címvédő Ayrton Sennát, aki összeütközött Mansellel az utolsó futamon. A Williams csapat 1986 után újra világbajnok lett a McLaren és a Benetton előtt.' },
    { ev: 1993, esemenyek: 'A Nigel Mansell visszavonulása után üresen maradt versenyzői székbe az egy évet kihagyó Alain Prost ült be. A Benettonhoz távozó Riccardo Patrese helyére Frank Williams csapatfőnök szerette volna leszerződtetni Ayrton Sennát, de ő maradt a McLarennél, így a másik ülés a tesztpilótából előléptetett Damon Hillé lett. A Williams átmentette előző évi jó formáját és Prost megnyerte az első versenyt. A Honda kivonulása miatt ebben az évben Ford motorral szerelt McLarent vezető Senna győzött az esős Brazil és európai nagydíjon. Utóbbit tartják Senna legnagyobb győzelmének. A Donington Parkban, zuhogó esőben megrendezett versenyen a 4. helyről indult, és 4 kerékcserétől hátráltatva lett első. Csak a második helyen célba érő Damon Hillt nem körözte le. Senna a monacói nagydíjon is nyert, hatodszor pályafutása során, átvéve a vezetést az összetettben. Prost azonban magára talált, megnyerte a következő négy futamot, és visszavette az első helyet. A magyar nagydíjon Damon Hill megszerezte első futamgyőzelmét, amit még kettő követett. Portugáliában Michael Schumacher győzött, Prost második lett, amivel bebiztosította negyedik világbajnoki címét, majd bejelentette végleges visszavonulását. A japán nagydíjon Senna ismét botrányba keveredett: A Jordan csapat boxában felpofozta az újonc Eddie Irvinet, aki egy lekörözés során "szemtelenül" visszaelőzte őt. A McLarennél Senna csapattársaként gyenge teljesítményt nyújtó Michael Andretti helyére Mika Häkkinen került, aki pályafutása végéig nem távozott a csapattól. A szezonzáró ausztrál nagydíjon aratott győzelmével Senna feljött a második helyre Prost mögé, maga mögé utasítva Damon Hillt és Michael Schumachert. A Williams magabiztosan végte meg konstruktőr-világbajnoki címét a McLaren és a Benetton előtt.' }
  ];
  
  ev2000 = [
    { ev: 2000, esemenyek: 'Michael Schumacher megnyeri a 3. világbajnoki címét a Ferrarival. A Ferrari számára ez volt a visszatérés az élre, miután 21 év szünet után ismét világbajnoki címet nyertek a konstruktőrök között. Schumacher dominanciáját a szezon végén 9 futamgyőzelemmel és egy összetett győzelemmel koronázta meg, megelőzve a McLarenes Mika Häkkinent és a Williamses Ralf Schumachert. A Ferrari és Schumacher új korszakot indítottak a Forma-1-ben.' },
    { ev: 2006, esemenyek: 'A szezonzáró brazil nagydíj után visszavonul a Formula-1 történetének legsikeresebb versenyzője, a hétszeres világbajnok Michael Schumacher. Az utolsó versenyét Brazíliában futotta, ahol hiába szerzett második helyet, nem tudta megverni Fernando Alonsót, így a spanyol versenyző zsinórban második világbajnoki címét nyerte. Schumacher visszavonulásával véget ért egy évtizedes uralom a sportágban, és az új generáció, köztük Alonso, kezdte átvenni a vezetést.' },
    { ev: 2008, esemenyek: 'A sportág történetében először rendeznek éjszakai versenyt, a szingapúri nagydíjon, amit 2008. szeptember 28-án futottak. A szezon utolsó versenyén Lewis Hamilton, és a hazai közönség előtt versenyző Felipe Massa még javában harcolt a VB címért, egészen az utolsó körig. A brazil a leintést követően hosszú másodpercekig azt hitte, hogy ő a világbajnok, ekkor viszont jött a hidegzuhany: a gumijain küszködő Timo Glockot megelőzte Hamilton, így az ötödik helyen ért be és ezzel 1 ponttal Massa előtt végzett a pontversenyben. Hamilton történelmi első világbajnoki címét szerezte meg.' },
    { ev: 2009, esemenyek: 'Ebben az évben 1997 után visszatért a slick (sima felületű) gumi a sportágba. A Honda gyári csapata 2008 decemberében bejelentette, hogy kivonul a sportágból, de a 2009-es autó fejlesztése még javában folyt. Kapva a lehetőségen Ross Brawn felvásárolta a csapatot, melyben segített neki a FOTA (Formula-1-es konstruktőrök szövetsége). A csapat nem változtatott a Honda előző évi pilótafelállásán, így Rubens Barrichello és Jenson Button lett a két pilótájuk. Utóbbi az első hét futamból hatot megnyert, egyedül Kínában (a harmadik nagydíjon) lett harmadik. Barrichello nem tudta a csapattársával felvenni a versenyt, sőt még a Red Bull-os Sebastian Vetteltől is kikapott, így a VB-t csak harmadikként zárta. Novemberben a Mercedes-Benz felvásárolta a csapat 75,1%-át, így Mercedes Grand Prix néven vesz részt a 2010-es évadban. Felipe Massa súlyos sérüléseket szenvedett a Hungaroringen, egy elszabadult alkatrész miatt, ami a sisakjának (szemből) jobb oldalát találta el, így két alkalommal Luca Badoer, majd a szezon többi versenyén Giancarlo Fisichella helyettesítette.' },
    { ev: 2010, esemenyek: '1993 után újra betiltották a futam közbeni tankolást, illetve ebben az évben a pontrendszer is megváltozott, aminek értelmében az első 8 helyett az első 10 versenyző kapott pontot. A Red Bull, Adrian Newey tervezőmérnök remekművével egymás után 4 világbajnoki címet is bezsebelt, ezalatt pedig a náluk versenyző Sebastian Vettel négyszeres bajnokká avanzsált. Ebben az évben tért vissza Michael Schumacher a Mercedes GP színeiben, de nem tudott dominálni, és a győzelmet sem tudta elérni, hiába küzdött keményen. Ez az év kezdete volt a Vettel-RBR dominanciának, amely hosszú évekre meghatározta a Forma-1-et.' },
    { ev: 2011, esemenyek: 'Az FIA betiltotta a dupla diffúzort, az ún. F-csatornát, és az állítható első szárnyat, a csapatok pedig újra használhatták a KERS-t. A Bridgestone kivonulásával a sportág egy új gumibeszállítót keresett, végül a befutó a Pirelli lett. A szezont Sebastian Vettel nyerte meg, ezzel kétszeres világbajnokká avanzsált. Érdekességképpen, ebben a szezonban két "Lotus" név alatt versenyző csapat volt jelen. 2012-re az egyikből Renault lett, míg a másikból Caterham. Vettel és a Red Bull uralták a szezon végéig a Forma-1-es versenyeket, és a csapatok között az első helyen végeztek.' },
    { ev: 2014, esemenyek: 'Az új V6-os turbómotoroknak hála a Mercedes dominált az elkövetkezendő 3 évben. A 2014-es évadot Mercedes pilótája, Lewis Hamilton nyerte meg, nagy versenyeket vívva a csapattársával, Nico Rosberggel, akik folyamatosan a legjobb eredményeket hozták a szezonban. A Mercedes mindössze egy versenyt veszített el, és hatalmas fölénnyel zárták a konstruktőrök versenyét. Az új motorok és a szoros csapattársak közötti rivalizálás új fejezetet nyitott a sportág történetében.' },
    { ev: 2017, esemenyek: 'A szezont a 2016-os címvédő, Nico Rosberg nélkül kezdte meg az eddig legyőzhetetlennek tűnő Mercedes, helyére Valtteri Bottast igazolták le. A Mercedes dominanciája eltűnt, és a Ferrari lett az új kihívó, a két csapat szoros versenyt vívott egymással. A szezon közepén a szingapúri nagydíjon hatalmas baleset történt, amiben a Ferrari versenyzői és Max Verstappen is kicsúsztak, a Mercedes pedig ezzel futamgyőzelemhez jutott. Vettel és Hamilton szoros versenyt futottak, de a német pilóta több hibát is elkövetett, így Hamilton végül megszerezte negyedik világbajnoki címét, míg a Mercedes a konstruktőrök között is megnyerte a címvédést. Felipe Massa 16 év után végleg visszavonult. A McLaren és a Honda együttműködése véget ért, a csapat 2018-tól Renault motorokat használt.' },
    { ev: 2018, esemenyek: 'A McLaren, új motorbeszállítóval, az év első felében jól szerepelt, de a szezon végére visszaesett teljesítménye. Fernando Alonso bejelentette visszavonulását, és Carlos Sainz-ot igazolták le helyére. A világbajnoki címért folytatott versenyt Lewis Hamilton és Sebastian Vettel, de a német pilóta sorozatos hibái miatt Hamilton végül megszerezte ötödik világbajnoki címét. A szezon utolsó versenye, a brazil nagydíj különleges pillanatokat hozott: Alonso elbúcsúzott a Forma-1-től, 17 év után, két világbajnoki címmel és 32 futamgyőzelemmel zárva karrierjét. Az F1-es pilóták és csapatok szívélyesen búcsúztak tőle, és elismerést adtak munkájának.' },
    { ev: 2019, esemenyek: 'A Red Bull a Renault motorokról Honda motorokra váltott, miután a Toro Rosso csapata is ezt a motorválasztást tette. A csapat pénzügyi előnyt szerzett a gyári támogatás révén, míg Daniel Ricciardo a Renault csapatához igazolt. A szezonban újoncok is debütáltak, köztük Lando Norris, George Russell és Alexander Albon. A világbajnoki címet végül Lewis Hamilton szerezte meg, a Mercedes csapatának segítségével. A szezon különlegessége volt, hogy elérte a Forma-1 történetének 1000. versenyét, és a 70. évfordulós nagydíjat is rendeztek Silverstone-ban. A szezonban megjelentek új tehetségek és sok csapat változtatott a felállásán.' },
    { ev: 2020, esemenyek: 'A COVID-19 világjárvány miatt a 2020-as Forma-1-es szezon elindulása kétségessé vált, és a versenynaptárat teljesen újra kellett tervezni. Az ausztrál nagydíjat törölték, és számos versenyt helyszínt is módosítottak. Az eredeti 22 futamos szezon helyett csupán 17 versenyt rendeztek, többek között új helyszíneken, mint a Mugello és Imola. Az év legnagyobb eseménye a már-már hihetetlen csodálatos teljesítménye volt Lewis Hamiltonnak, aki történelmi hetedik világbajnoki címét szerezte meg, ezzel beállítva Michael Schumacher rekordját. Az újoncok közül több fontos szereplő is kiemelkedett, például Pierre Gasly, aki szintén megnyerte első Forma-1-es futamát. A szezon egyik drámai eseménye Romain Grosjean brutális balesete volt a bahreini versenyen, amelyben csodával határos módon megúszta a versenyző sérülés nélkül. A McLaren csapata és a Williams is komoly változásokon ment keresztül, az újoncok között pedig George Russell szerepelt kiemelkedően.' },
    { ev: 2021, esemenyek: 'A 2021-es év az eredetileg tervezett szabályváltoztatások halasztásával kezdődött, melyek végül csak 2022-ben léptek életbe. A szezon egyik legnagyobb meglepetése volt, hogy Daniel Ricciardo átigazolt a McLaren csapathoz, míg a Renault, immár Alpine néven, szerződtette vissza Fernando Alonsót. A Red Bull és a Mercedes közötti verseny az év elején kiéleződött, és a világbajnoki címért folyó küzdelem Lewis Hamilton és Max Verstappen között zajlott. A szezon során történt néhány fontos csapatformálás, például Stroll és a Racing Point átnevezése Aston Martinra, valamint a Red Bull motorfejlesztésének folytatása a Honda támogatásával, de már gyári támogatás nélkül. Az év végén egyesek szerint a Verstappen-Hamilton párharc végleg eldöntötte, hogy a következő évtizedekben ki uralja majd a Forma-1-et.' }
  ];
}
