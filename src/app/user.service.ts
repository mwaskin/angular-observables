import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' }) // alternative to adding this to providers array in app.module
export class UserService {
  activatedEmitter = new Subject<boolean>();
  // activatedEmitter = new EventEmitter<boolean>();
}
