import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Message} from '../model/message';
import {tap} from 'rxjs/operators';
import { MessagesService }  from './messages.service';

@Component({
  selector: 'messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  showErrors = false;
  errors$: Observable<string[]>; 

  constructor(private messagesService:MessagesService) {
      console.log("created messages component");
  }

  ngOnInit() {

    this.errors$ = this.messagesService.getErrors().pipe(
      tap(messages => this.showErrors = true )
    );

  }

  onClose() {
    this.showErrors = false;
  }

}
