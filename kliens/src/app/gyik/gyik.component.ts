import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gyik',
  standalone: true,
  imports: [ FooterComponent, CommonModule ],
  templateUrl: './gyik.component.html',
  styleUrl: './gyik.component.css'
})
export class GyikComponent {
  elemek = [
    { 
      kerdes: 'Miért szikráznak az F1-es autók?',
      valasz: 'A szikrázás nem kötelező eleme a versenyeknek, melyre nem is utaznak rá a gyártók sem. Valójában ezeket a szikrákat a védőbetétek súrlódása hozza létre, és különösen az éjszakai futamokon nyújtanak látványos hatást. Vannak olyan pilóták, mint pl. Carlos Sainz, aki 2018-ban panaszkodott rá, a közönségnek azonban nagyon is bejön, és ez mindennél fontosabb, hiszen ahogy mondani szokták: cirkusz kell a népnek - ez esetben éppenséggel a száguldó cirkusz.'
    },
    { 
      kerdes: 'Az F1 tényleg egy sportág?',
      valasz: 'Igen, az. Igaz, az F1-es versenyzők nem végeznek verseny közben kőkemény testmozgást, de ez ne tévesszen meg senkit, hiszen így is alaposan megdolgoztatja a testüket, elméjüket. A néha 5G-t is meghaladó erőhatásoknak kitett versenyzőknek a testsúlyuk ötszörösével kell megbirkózzanak. Mindezt egy olyan utastérben, ahol akár 70°C-os is lehet a hőmérséklet. Ezek a sportolók - mivel sportolók - minden egyes verseny során több liter folyadékot izzadnak ki, és óránként közel 1000 kalóriát égetnek el. Ez az erőfeszítés már-már egy maratoni távhoz hasonlítható. A fizikai felkészültség és a teherbírás tehát elengedhetetlen feltétele annak, hogy egy pilóta sikeres F1-es versenyzővé váljon.'
    },
    {
      kerdes: 'Hogyan zajlik az F1-es kvalifikáció?',
      valasz: 'Ahhoz, hogy a lehető legjobb helyet biztosítsák maguknak a rajtrácson, a versenyzők egy három részre osztott kvalifikáción dolgoznak meg érte. A Q1 során mindenki rajthoz áll, de csak az első 15 (a legjobb idő 107%-ánál kevesebbet elért) versenyző folytathatja a versenyt. A Q2-ben öt új versenyző kiesik, és csupán a 10 leggyorsabb vesz részt a Q3-ban, akik versenybe szállnak a pole pozícióért és a minél jobb rajtkockáért a versenyen.'
    },
    {
      kerdes: 'Mennyi üzemanyagot fogyaszt egy F1-es autó?',
      valasz: 'Röviden? Sokat. Ha egy hagyományos autó 100 kilométerenként körülbelül hat litert fogyaszt, akkor egy F1-es autó ugyanezen a távon 45 litert zabál meg. És ez már nem rossz. A 2000-es évek elején az együléses autók 10 hengeres motorjai 100 kilométerenként akár 80 liter üzemanyagot is igényeltek. Ha ezt felszorozzuk egy versenypálya nagyjából 300 km-es hosszával, az nem kevés benzint jelent. Aztán ott vannak a szabályok. A csapatok például óránként nem használhatnak el 100 kg-nál több üzemanyagot.'
    },
    {
      kerdes: 'Honnan származik a pole pozíció kifejezés?',
      valasz: 'A kifejezés a lovaglásból ered. Történelmileg a verseny elején a piquet ("pole" angolul: pólus) mellé állított lovakat részesítették előnyben a megtett távolság csökkentése miatt. Mivel a kifejezés a versenypályán született, a 20. században az autósportban is gyorsan átvették.'
    },
    {
      kerdes: 'A versenyzők mindig ugyanannyi kört tesznek meg?',
      valasz: 'Egyáltalán nem. A körök száma a pályák függvényében változik, tekintettel arra, hogy egy nagydíj nem haladhatja meg a két órát, és a távnak 300-310 km között kell lennie. Egyedül a Monacói Nagydíj képez kivételt a szabályok alól, amely mindössze 260.52 km hosszú.'
    },
    {
      kerdes: 'Min múlik, hogy egyes csapatok erősebbek, mint mások?',
      valasz: 'Mint sok minden más, ez is pénz kérdése. A futómű építése, a motor fejlesztése és egy kivételes pilóta megfizetése miatt csak néhány csapat képes rendszeresen bajnokságot nyerni. Ettől persze előfordul, hogy egy hosszú idény alatt egy-két versenyen felborul a papírforma, de hosszú távon szinte kizárólag csak a legjobb háttérrel bíró csapatok érhetnek oda a dobogó csúcsára.'
    },
    {
      kerdes: 'Ki dönti el, hogy milyen beállításokat kell elvégezni egy-egy futam során?',
      valasz: 'Nevezzük ezt csapatmunkának. A tesztek során a pilóta visszajelzést ad a szerelőknek, akiknek aztán az a feladatuk, hogy megtalálják a technikai megoldást az esetleges problémákra. Ahogy Pierre Gasly nemrégiben mondta: "a legapróbb részletekbe belemenve tudjuk a különbséget a magunk oldalára billenteni. A verseny nagy részéért mi felelünk, az utolsó tizedet viszont mindig a mérnökök nyerik".'
    },
    {
      kerdes: 'Miért nincsenek női versenyzők az F1-ben?',
      valasz: 'Női versenyzők már 1958 óta vannak az F1-ben, amikor az olasz Maria Teresa de Filippis debütált. Úttörőnek számított 1992-ben a szintén olasz Giovanna Amati, azonban egyetlen nő sem versenyzett még nagy csapatnál. Ennek számos lehetséges oka lehet, a szexizmustól kezdve a tudományos hipotézisekig, de nincs olyan szabály, hogy nők nem versenyezhetnének F1-ben. Amennyiben a jelenleg F2-ben versenyző Tatiana Calderon olyan teljesítményt képes hozni, ami miatt felkerülhet az F1-be, hosszú idő után ismét lehet női versenyző a "királykategóriában".'
    },
    {
      kerdes: 'A versenyzők választják meg a rajtszámukat?',
      valasz: 'Igen. De ezek a számok, amelyeket szabadon választhatnak, 2014 óta állandóak. Minden versenyzőt felkérnek, hogy továbbítson három lehetséges választást (a regnáló bajnok nem köteles viselni az 1-es számot), az FIA pedig gondoskodik a végső kiosztásról.'
    },
    {
      kerdes: 'Az F1-esek valóban a leggyorsabb autók a világon?',
      valasz: 'Valójában egyáltalán nem. A világtörténelem leggyorsabb F1-es autójának 2016-ban sikerült elérnie a 378 km/h-t a bakui pályán, és ehhez képest egy Koenigsegg Agera RS 2017-ben 447.2 km/h-val száguldott egy nevadai (lezárt) úton. És nem ez az egyetlen, amely képes túlszárnyalni egy F1-es autót. Mivel azonban a körpályán és az egyenesben való autózás nem ugyanaz, az F1 marad az abszolút referencia.'
    },
    {
      kerdes: 'Miért használnak kockás zászlót?',
      valasz: 'A legtöbb ember tudja, mit jelent a kockás zászló az F1-ben. Amikor a zászlót erőteljesen lengetik, az azt jelenti, hogy megvan a verseny győztese. Az eredete azonban kissé rejtélyesebb, mely mögött több elmélet is létezik. Egyesek szerint a pole pozícióhoz hasonlóan ez is a lóversenyzésből származik. Az Egyesült Államokban a 19. században a lóversenyek nagy bankettekkel értek véget, ahol kockás terítők jelezték a zsokéknak az étkezés kezdetét. Mások azt állítják, hogy a Damier-zászlót a franciaországi kerékpárversenyek egyes öltözéke ihlette.'
    },
    {
      kerdes: 'Miért van konstruktőri bajnokság, ha nem mindegyik csapat gyártja saját maga a motorját?',
      valasz: 'Az biztos, hogy a Mercedes, a Renault és a Ferrari az a három márka, amely saját motorjait rakja bele F1-es autóiba, míg a többiek mások által épített és használatra kész motorokat kapnak. A lényeg azonban, hogy minden gyártónak ki kell dolgoznia a futóművét, és gondoskodnia kell az autó aerodinamikai fejlesztéséről, ami ugyanolyan nagy feladat, mint egy motor megtervezése.'
    },
    {
      kerdes: 'Hogyan dolgoznak ilyen gyorsan a szerelők a boxkiállások során?',
      valasz: 'A történelem leggyorsabb boxkiállását 1.82 másodpercre mérték (ezt a rekordot az Aston Martin Red Bull Racing állította fel 2019-ben Interlagosban). A versenyeken minden tizedmásodperc számít, így a csapatok semmit sem bíznak a véletlenre. A szerelők a garázsban elfoglalt helyüktől kezdve a szerszámok kiválasztásán át mindent tanulmányoznak, elemeznek és mindenekelőtt gyakorolnak. Ez egy olyan munka, amely kifogástalan pontosságot igényel, amikor 200 ezredmásodperc alatt meglazítják az egyik kerék anyáit és meghúzzák a másikét.'
    },
    {
      kerdes: 'Hogyan pisilnek a versenyzők a futam alatt?',
      valasz: 'Ha nagyon kell, akkor a versenyruhájukba. Azonban tekintettel arra, hogy egy-egy nagydíj során hány liter vizet veszítenek, a pilóták hólyagjai ritkán vannak tele.'
    },
    {
      kerdes: 'Hogyan leszel F1-es pilóta?',
      valasz: 'Nos, először is ki kell találnod, hogy mit szeretnél csinálni. A szerelőtől a rendezvénymenedzseren át a kamionsofőrig egy F1-es csapat akár 1200 embert is foglalkoztathat! A legtöbb pozíció közvetlenül vagy közvetve a mérnöki munkához kapcsolódik. Ne habozz, jelentkezz az iparághoz kapcsolódó gyakornoki állásokra, és használd az olyan speciális platformokat, mint a Motorsport Jobs, hogy megtaláld álmaid állását az autósportok kíméletlen univerzumában (de jobb ha felkészülsz rá, hogy biztosan nem az F1-ben fogod kezdeni).'
    },
    {
      kerdes: 'Hogyan működik a pontozás a Forma-1-ben?',
      valasz: 'A versenyek során az első tíz helyezett kap pontokat: 1. hely 25 pontot, 2. hely 18 pontot, 3. hely 15 pontot, és így tovább. A világbajnokságot a legtöbb pontot szerző pilóta és csapat nyeri.'
    },
    {
      kerdes: 'Mi az a sprint kvalifikáció?',
      valasz: 'A 2021-ben bizonyos futamokra bevezetett vadonatúj módszer a nagydíj végső rajtrácsának meghatározására. A péntek délutáni klasszikus kvalifikáció után a versenyzők szombaton egy rövidített 100 kilométeres (egy GP 300 kilométeres) minifutamon versenyeznek, amely lehetővé teszi számukra, hogy a vasárnapi futamot jó pozícióból várhassák. Emellett a célba érkező első 8 versenyző a helyezésének megfelelő pontot kap (8 pontot a győztes, 1 pontot a 8. helyezett).'
    },
    {
      kerdes: 'Mi az a DRS (Drag Reduction System)?',
      valasz: 'A DRS egy olyan rendszer, amely lehetővé teszi a pilóták számára, hogy nagyobb sebességet érjenek el egyenesekben, ha közel vannak az előző autóhoz, és megnyitják a hátsó szárnyat, csökkentve a légellenállást.'
    },
    {
      kerdes: 'Mi az a "pit stop"?',
      valasz: 'A pit stop az a pillanat, amikor a versenyautó megáll a boxutcában, hogy gumikat cseréljenek, üzemanyagot töltsenek, vagy technikai problémákat javítsanak.'
    }

  ];
  valasztottIndexek: number[] = [];

  valaszMegjelenites(index: number): void {
    if (this.valasztottIndexek.includes(index)) {
      const indexElem = this.valasztottIndexek.indexOf(index);
      this.valasztottIndexek.splice(indexElem, 1);
    } else {
      this.valasztottIndexek.push(index);
    }
  }
}