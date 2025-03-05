import { Routes } from '@angular/router';
import { KezdolapComponent } from './kezdolap/kezdolap.component';
import { RegisztracioComponent } from './regisztracio/regisztracio.component';
import { BejelentkezesComponent } from './bejelentkezes/bejelentkezes.component';
import { BeallitasokComponent } from './beallitasok/beallitasok.component';
import { VisszajelzesComponent } from './visszajelzes/visszajelzes.component';
import { RolunkComponent } from './rolunk/rolunk.component';
import { GyikComponent } from './gyik/gyik.component';
import { AdatvedelemComponent } from './adatvedelem/adatvedelem.component';
import { EloComponent } from './elo/elo.component';
import { HirekComponent } from './hirek/hirek.component';
import { VersenyzokComponent } from './versenyzok/versenyzok.component';
import { VersenyzoComponent } from './versenyzo/versenyzo.component';
import { CsapatokComponent } from './csapatok/csapatok.component';
import { CsapatComponent } from './csapat/csapat.component';
import { TortenetComponent } from './tortenet/tortenet.component';
import { ForumComponent } from './forum/forum.component';
import { ForumPosztComponent } from './forum-poszt/forum-poszt.component';
import { ForumPosztReszletComponent } from './forum-poszt-reszlet/forum-poszt-reszlet.component';
import { ProfilComponent } from './profil/profil.component';
import { HibaComponent } from './hiba/hiba.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
    {path: '', component: KezdolapComponent},
    {path: 'regisztracio', component: RegisztracioComponent, canActivate: [authGuard]}, 
    {path: 'bejelentkezes', component: BejelentkezesComponent, canActivate: [authGuard]},
    {path:'beallitasok', component: BeallitasokComponent, canActivate: [authGuard]},
    {path: 'visszajelzes', component: VisszajelzesComponent},
    {path: 'rolunk', component: RolunkComponent},
    {path:'gyik', component: GyikComponent},
    {path:'adatvedelem', component: AdatvedelemComponent},
    {path:'elo', component: EloComponent},
    {path: 'hirek', component: HirekComponent},
    {path:'versenyzok', component: VersenyzokComponent},
    {path:'versenyzo', component: VersenyzoComponent},
    {path:'csapatok', component: CsapatokComponent},
    {path:'csapat', component: CsapatComponent},
    {path:'tortenet', component: TortenetComponent},
    {path:'forum', component: ForumComponent, canActivate: [authGuard]},
    {path:'forum-poszt-letrehozas', component: ForumPosztComponent, canActivate: [authGuard]},
    {path:'forum/:id,', component: ForumPosztReszletComponent, canActivate: [authGuard]},
    {path:'forum/profil/:felhasznalonev', component: ProfilComponent, canActivate: [authGuard]},
    {path: '**', component: HibaComponent}

];
