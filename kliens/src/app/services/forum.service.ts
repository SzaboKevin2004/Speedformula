import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForumService {
  private url = 'http://localhost:3000/forum';

  constructor(private http: HttpClient) {}

  // Posztok lekérése
  getPosts(): Observable<any> {
    return this.http.get<any>(this.url);
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
  getComments(postId: number): Observable<any> {
    const adatok = { posztid: postId };
    return this.http.get<any>(`${this.url}/komment`, adatok,);
  }

  // Poszt kedvelés
  likePost(postId: number): Observable<any> {
    return this.http.patch<any>(`${this.url}/posztkedveles/${postId}`, {});
  }

   // Poszt kikedvelése
  dislikePost(postId: number): Observable<any> {
    return this.http.patch<any>(`${this.url}/posztkikedveles/${postId}`, {});
  }

  // Poszt megosztása
  sharePost(postId: number): Observable<any> {
    return this.http.patch<any>(`${this.url}/posztmegosztas/${postId}`, {});
  }

  // Komment kedvelés
  likeComment(commentId: number): Observable<any> {
    return this.http.patch<any>(`${this.url}/kedveleskomment/${commentId}`, {});
  }

  // Komment megosztása
  shareComment(commentId: number): Observable<any> {
    return this.http.patch<any>(`${this.url}/megosztaskomment/${commentId}`, {});
  }

  // Poszt törlése
  deletePost(postId: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const adatok = { posztid: postId };
    return this.http.delete<any>(`${this.url}/poszt`, { body: adatok, headers });
  }

  // Komment törlése
  deleteComment(commentId: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const adatok = { kommentid: commentId };
    return this.http.delete<any>(`${this.url}/komment`, { body: adatok, headers });
  }
}
