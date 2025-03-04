import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForumService {
  private url = 'http://localhost:3000/forum';
  private alapUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  // Posztok lekérése
  getPosts(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(this.url, { headers });
  }

  // Új poszt létrehozása
  createPost( adatok: {
    cim: string | null,
    szoveg: string | null,
    kep: string | null,
    video: string | null
  }
  ): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    return this.http.put<any>(`${this.url}/cikk`, adatok, { headers });
  }

  // Kép/videó poszt létrehozása
  createImagePost(adatok: any): Observable<any> {
    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    return this.http.put<any>(`${this.url}/kepes`, adatok, { headers });
  }

  // Komment hozzáadása egy poszthoz
  addCommentToPost(
    adatok: {
      posztid: number,
      szoveg: string 
    }
  ): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.put<any>(`${this.url}/komment/poszt`, adatok, { headers });
  }

  // Kommentek lekérése
  getComments(posztid: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.url}/komment/${posztid}`, { headers });
  }

  addCommentToComment(
    adatok: {
      kommentid: number,
      szoveg: string 
    }
  ): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.put<any>(`${this.url}/komment/komment`, adatok, { headers });
  }

  // Poszt kedvelés
  likePost(postId: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.patch<any>(`${this.url}/posztkedveles/${postId}`, {}, { headers });
  }

   // Poszt kikedvelése
  dislikePost(postId: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.patch<any>(`${this.url}/posztkikedveles/${postId}`, {}, { headers });
  }

  // Komment kedvelés
  likeComment(commentId: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.patch<any>(`${this.url}/kommentkedveles/${commentId}`, {}, { headers });
  }

  // Komment kikedvelés
  dislikeComment(commentId: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.patch<any>(`${this.url}/kommentkikedveles/${commentId}`, {}, { headers });
  }

  // Poszt törlése
  deletePost(postId: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const adatok = { posztid: postId };
    return this.http.delete<any>(`${this.url}/poszttorles`, { body: adatok, headers });
  }

  // Komment törlése
  deleteComment(commentId: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const adatok = { kommentid: commentId };
    return this.http.delete<any>(`${this.url}/kommenttorles`, { body: adatok, headers });
  }

  profilLekeresMasik(felhasznalonev: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.alapUrl}/profil/${felhasznalonev}`, { headers });
  }
}
