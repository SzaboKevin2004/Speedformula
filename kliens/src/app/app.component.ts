import { Component, OnInit } from '@angular/core';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  navMegjelenites: boolean = true;
  bejelentkezesMegjelenites: boolean = true;
  profilMegjelenites: boolean = false;
  profilMenuMegjelenites: boolean = false;

  randomKep: string = "";

  constructor(private router: Router, private authservice: AuthService) {}

  ngOnInit() {
    
    this.router.events.pipe(
      filter(vizsgal => vizsgal instanceof NavigationEnd)
    ).subscribe(() => {
      const jelenlegiUrl = this.router.url;
      this.navMegjelenites = !(jelenlegiUrl.includes('bejelentkezes') || jelenlegiUrl.includes('regisztracio') || jelenlegiUrl.includes('hiba') || jelenlegiUrl.includes('visszajelzes'));
    });

    this.authservice.felhBejelentkezettE$.subscribe(bejelentkezettE => {
      this.bejelentkezesMegjelenites = !bejelentkezettE;
      this.profilMegjelenites = bejelentkezettE;
    });

    this.authservice.randomKep$.subscribe(kep => {
      this.randomKep = kep;
    });

  }

  profilMenu(){
    this.profilMenuMegjelenites = !this.profilMenuMegjelenites;
  }

  profilMenuHA(){
    if(this.profilMenuMegjelenites == true){
      this.profilMenuMegjelenites = false;
    }
  }

  kijelentkezes(){
    this.authservice.kijelentkezes();
    this.router.navigate(['/']);
  }
}


  
