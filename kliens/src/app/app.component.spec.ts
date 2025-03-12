import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let authService: AuthService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, CommonModule, AppComponent, HttpClientModule],
      providers: [
        {
          provide: AuthService,
          useValue: {
            felhBejelentkezettE$: of(false),  // Helyesen mockolt Observable
            randomKep$: of('path/to/random/image.jpg'),
            profilLekeres: jasmine.createSpy().and.returnValue(of({ felhasználó: {} })),
            felhasznaloNev$: of('Test User'),
            kijelentkezes: jasmine.createSpy('kijelentkezes'),
            szamSzin$: of(1), // Mockoljunk egy másik Observable-t is a téma színének teszteléséhez
          }
        },
        {
          provide: Router,
          useValue: {
            url: '/bejelentkezes',
            navigate: jasmine.createSpy('navigate')  // A router navigálásának mockolása
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);

    fixture.detectChanges();  // Az initializálás
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('nem kell megjeleníteni a navigációt, ha bejelentkezési vagy regisztrációs oldalon vagyunk', () => {
    fixture.detectChanges();  // Frissíti az alkalmazást, hogy megnézze a nav visibility-t
    expect(component.navMegjelenites).toBeFalse();  // Ellenőrizzük, hogy a navigációt nem jeleníti meg
  });

  it('profil menünek látszania kell bejelentkezett állapotban', () => {
    spyOn(authService.felhBejelentkezettE$, 'subscribe').and.callFake((fn: any) => fn(true));  // Mockoljuk a bejelentkezett állapotot
    component.ngOnInit();  // Inicializáljuk a komponenst
    expect(component.profilMegjelenites).toBeTrue();  // Ellenőrizzük, hogy a profil menü látszik
    expect(component.bejelentkezesMegjelenites).toBeFalse();  // És a bejelentkezés nem jelenik meg
  });

  it('tudja váltani a profil menüt', () => {
    component.profilMenu();  // Profil menü megjelenítése
    expect(component.profilMenuMegjelenites).toBeTrue();  // Ellenőrizzük, hogy megjelenik
    component.profilMenu();  // Ismét profil menü eltüntetése
    expect(component.profilMenuMegjelenites).toBeFalse();  // Ellenőrizzük, hogy el van tüntetve
  });

  it('tudja váltani a fő menüt', () => {
    component.menu();  // Fő menü megjelenítése
    expect(component.menuMegjelenites).toBeTrue();  // Ellenőrizzük, hogy megjelenik
    component.menu();  // Ismét fő menü eltüntetése
    expect(component.menuMegjelenites).toBeFalse();  // Ellenőrizzük, hogy el van tüntetve
  });

  it('frissítenie kell a témát, amikor a szín száma változik', () => {
    spyOn(authService.szamSzin$, 'subscribe').and.callFake((fn: any) => fn(1));  // Mockoljuk a szín változást
    component.ngOnInit();  // Inicializáljuk a komponenst
    expect(component.sotet).toBeTrue();  // Ellenőrizzük, hogy sötét módba vált
    expect(component.temaSzin).toBe('feketeK');  // Ellenőrizzük, hogy a téma színe fekete
  });

  it('kijelentkezéskor a főoldalra kell navigálni', () => {
    spyOn(router, 'navigate');  // Mockoljuk a router navigate metódusát
    component.kijelentkezes();  // Kijelentkezés indítása
    expect(authService.kijelentkezes).toHaveBeenCalled();  // Ellenőrizzük, hogy a kijelentkezés megtörtént
    expect(router.navigate).toHaveBeenCalledWith(['/']);  // Ellenőrizzük, hogy a főoldalra navigálunk
  });

  it('be kell tölteni a felhasználó profilját az alkalmazás indításakor', () => {
    component.ngOnInit();  // Komponens inicializálása
    expect(authService.profilLekeres).toHaveBeenCalled();  // Ellenőrizzük, hogy a profil lekérése megtörtént
  });
});

