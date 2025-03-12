import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { BeallitasokComponent } from './beallitasok.component';
import { AuthService } from '../services/auth.service';
import { of } from 'rxjs';

describe('BeallitasokComponent', () => {
  let component: BeallitasokComponent;
  let fixture: ComponentFixture<BeallitasokComponent>;
  let authService: AuthService;

  beforeEach(async () => {
    spyOn(localStorage, 'getItem').and.callFake((key: string) => {
      const items: { [key: string]: string } = {
        token: 'valid_token',
        pfp: 'valid_pfp',
        username: 'valid_username',
        tema: '2',
        szerep: '1',
      };
      return items[key] || null;
    });

    spyOn(localStorage, 'setItem').and.callFake(() => {});
    spyOn(localStorage, 'removeItem').and.callFake(() => {});

    await TestBed.configureTestingModule({
      imports: [HttpClientModule, BeallitasokComponent],
      providers: [
        AuthService,
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: of({ id: '123' }) } },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BeallitasokComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);

    localStorage.setItem('token', 'valid_token');
    localStorage.setItem('pfp', 'valid_pfp');
    localStorage.setItem('username', 'valid_username');
    localStorage.setItem('tema', '2');
    localStorage.setItem('szerep', '1');

    spyOn(authService, 'profilLekeres').and.returnValue(of({
      felhasználó: {
        felhasznalonev: 'valid_username',
        email: 'valid_email@example.com',
        tema_id: 2,
        kep: 1,
        magamrol: 'Bemutatkozás szövege',
      },
    }));

    spyOn(authService, 'profilModositas').and.returnValue(of({}));
    fixture.detectChanges();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should create with valid token', fakeAsync(() => {
    expect(component).toBeTruthy();
    tick();
  }));

  it('should fetch user profile with updated token', fakeAsync(() => {

    localStorage.setItem('token', 'new_valid_token');
    tick();

    expect(component.lekertFelhasznalonev).toBe('valid_username');
    expect(component.lekertEmail).toBe('valid_email@example.com');
    expect(component.lekertTema_id).toBe(2);
    expect(component.lekertKep).toBe(1);
    expect(component.lekertBemutatkozas).toBe('Bemutatkozás szövege');
  }));

  it('should handle token absence gracefully', fakeAsync(() => {
    localStorage.removeItem('token');
    
    tick();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  }));
});
