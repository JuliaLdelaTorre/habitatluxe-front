import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { Blog } from '../interface/blog.interface';
import { environment } from 'src/app/environments/environments';

@Injectable({ providedIn: 'root' })
export class BlogService {

  baseUrl = 'http://localhost:3000';
  // baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  // Get all posts in the blog.
  getBlog(): Observable<Blog[]> {
    return this.http.get<Blog[]>(`${this.baseUrl}/blog`);
  }

  // Get filtered posts by category.
  getBlogByCategory(category: string) {
    return this.http.get<Blog[]>(`${this.baseUrl}/blog?category=${category}`);
  }

// Add a new post in the blog.
  addBlog(blog: Blog): Observable<Blog[]> {
    return this.http.post<Blog[]>(`${this.baseUrl}/blog`, blog); // mando la petición POST, con la url y el objeto blog como segundo parámetro.
  }


  // Update a post.
  updateBlog(blog: Blog): Observable<Blog[]> {
    if (!blog.id) throw Error('Blog id is required')
    return this.http.patch<Blog[]>(`${this.baseUrl}/blog/${blog.id}`, blog);
  }

  // Delete a post.
  deleteBlog(id: number): Observable<boolean> {
    return this.http.delete(`${this.baseUrl}/blog/${id}`)
    .pipe(
      catchError( error => of(false)),
      map( resp => true)
    );
  }


}
