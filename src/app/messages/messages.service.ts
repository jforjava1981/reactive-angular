import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable()
export class MessagesService {
    
    private errorSubject$:BehaviorSubject<string[]> = new BehaviorSubject([]);
    
    private errors$:Observable<string[]> = this.errorSubject$.asObservable().pipe(
        filter(messages => messages && messages.length > 0)        
    );

    showErrors(...errors:string[]){
        this.errorSubject$.next(errors);
    }

    getErrors(){
        return this.errors$;
    }
}