import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  /* Subjects allow this value to be updated by subscribing to a Subject declared in UserService, clicking a button in UserComponent, which sets a value for the Subject to emit, which is caught by the subscription in this component, which updates this value to the emitted value */
  userActivated = false;
  /* store Subscription in a property to be able to use Subscription.unsubscribe() */
  private activatedSub: Subscription;

  constructor(private userService: UserService) {}

  ngOnInit() {
    /* Subjects still use .subscribe() to receive the data */
    this.activatedSub = this.userService.activatedEmitter.subscribe(
      (didActivate) => {
        this.userActivated = didActivate;
      }
    );
  }

  /* Subjects are Observables, so must .unsubscribe() when it's no longer needed */
  ngOnDestroy(): void {
    this.activatedSub.unsubscribe();
  }
}
