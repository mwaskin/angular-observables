import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' }) // alternative to adding this to providers array in app.module
export class UserService {
  /* Subjects are recommended over EventEmitter when communicating across components through a service; bc it's an Observable, it can access RxJS operators */
  activatedEmitter = new Subject<boolean>();
  /* use EventEmitter when simply outputting data from a component with @Output() */
  // activatedEmitter = new EventEmitter<boolean>();
}
