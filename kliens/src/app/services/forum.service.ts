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
  createPost(data: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    return this.http.put<any>(`${this.url}/cikk`, data, { headers });
  }

  // Kép/videó poszt létrehozása
  createImagePost(data: any): Observable<any> {
    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    return this.http.put<any>(`${this.url}/kepes`, data, { headers });
  }

  // Komment hozzáadása egy poszthoz
  addCommentToPost(postId: number, commentText: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const data = {
      poszt_id: postId,
      szoveg: commentText
    };

    return this.http.put<any>(`${this.url}/komment/poszt`, data, { headers });
  }

  // Kommentek lekérése
  getComments(postId: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<any>(`${this.url}/komment/${postId}`, { headers });
  }

  // Poszt kedvelés
  likePost(postId: number): Observable<any> {
    return this.http.patch<any>(`${this.url}/kedvelesposzt/${postId}`, {});
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

    const data = { posztid: postId };
    return this.http.delete<any>(`${this.url}/poszt`, { body: data, headers });
  }

  // Komment törlése
  deleteComment(commentId: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const data = { kommentid: commentId };
    return this.http.delete<any>(`${this.url}/komment`, { body: data, headers });
  }
}
