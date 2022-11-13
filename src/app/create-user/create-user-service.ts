import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { CreateUserRequest, CreateUserResponse } from './models/create-user-request';


@Injectable({ providedIn: 'root' })
export class CreateUserService {

  private userUrl = 'https://localhost:7108/api/user';  // URL to web api
  

  constructor(
    private http: HttpClient
    ) { }

  getSocialAccountTypes(): Observable<string[]> {
    return this.http.get<string[]>(this.userUrl + '/social-types')
  }

  addUser(userRequest: CreateUserRequest): Observable<CreateUserResponse> {
    return this.http.post<CreateUserRequest>(this.userUrl, userRequest);
  }
}
