import { Component, OnDestroy, OnInit } from '@angular/core';
/* RxJS is a JS Library, separate from Angular, for creating Observables */
import { Subscription, interval, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  /* store custom Observables in a property value of type Subscription (a class shipped with RxJS), which gives access to the Subscription.unsubscribe() method */
  private firstObsSubscription: Subscription;

  constructor() {}

  ngOnInit() {
    /* 
      - interval is a pre-built observable (technically function that returns an Observable) from RxJS that emits an incrementing number after each specified period of time
      - subscribe() method starts the Observable sequence, executing the function passed as the 'next' argument
      - bc this code is in ngOnInit(), the subscription starts when the HomeComponent is rendered
    */
    // this.firstObsSubscription = interval(1000).subscribe((count) => {
    //   console.log(count);
    // });

    /* recreating the interval function above by creating a new custom Observable */
    const customIntervalObservable = Observable.create((observer) => {
      let count = 0;
      setInterval(() => {
        /* .next(data) emits the current value of the arg to the Subscription */
        observer.next(count);
        /* .complete() finishes the Observable sequence and stops emitting new data */
        if (count === 2) {
          observer.complete();
        }
        /* .error(err) cancels the Observable, but does not complete it, and throws the error */
        if (count > 3) {
          observer.error(new Error('Count is greater than 3!'));
        }
        count++;
      }, 1000);
    });

    this.firstObsSubscription = customIntervalObservable
      .pipe(
        filter((data: number) => {
          return data > 0;
        }),
        map((data: number) => {
          return 'Round' + (data + 1);
        })
      )
      .subscribe(
        /* handles the data passed from .next() */
        (data) => {
          console.log(data);
        },
        /* handles the err passed from .error() */
        (error) => {
          console.log(error);
          alert(error.message);
        },
        /* handles anything that should happen if the Observable completes */
        () => {
          console.log('Completed!');
        }
      );
  }

  ngOnDestroy(): void {
    /*
      - must unsubscribe to close the Observable or it will continue until complete, even when the component is no longer rendered
      - in this case, use ngOnDestroy() to close the subscription when navigating away from the Home page (the HomeComponent is no longer being rendered)
    */
    this.firstObsSubscription.unsubscribe();
  }
}
