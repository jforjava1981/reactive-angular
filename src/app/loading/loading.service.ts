import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of} from 'rxjs';
import { mergeMap, switchMap, concatMap, finalize, tap } from 'rxjs/operators';

@Injectable()
export class LoadingService {

    private loadingSubject = new BehaviorSubject<boolean>(false);

    loading$:Observable<boolean> = this.loadingSubject.asObservable();

    showUntilComplete<T>(obs$: Observable<T>):Observable<T>{
       return of(null)
       .pipe(tap({next: () => this.loadingOn()}), 
                 concatMap(() => obs$), 
                 finalize(() => this.loadingOff()));
    }

    loadingOn(){
        this.loadingSubject.next(true);
    }

    loadingOff(){
        this.loadingSubject.next(false);
    }
}