import { Component, Input, OnInit, Output } from '@angular/core';
import { Course } from '../model/course';
import { tap, filter } from 'rxjs/operators';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {CourseDialogComponent} from '../course-dialog/course-dialog.component';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'courses-card-list',
  templateUrl: './courses-card-list.component.html',
  styleUrls: ['./courses-card-list.component.scss']
})
export class CoursesCardListComponent implements OnInit {

  @Input()
  courses:Course[] = [];

  @Output()
  private courseChanged :EventEmitter<any> = new EventEmitter<any>();

  constructor( private dialog: MatDialog) { }


  ngOnInit(): void {
  }

  editCourse(course: Course) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "400px";

    dialogConfig.data = course;

    const dialogRef = this.dialog.open(CourseDialogComponent, dialogConfig);

    const dialogAfterClosed$ = dialogRef.afterClosed();
    dialogAfterClosed$.
      pipe( filter(value => !!value),tap(value => this.courseChanged.emit(value))).subscribe();
  }

}
