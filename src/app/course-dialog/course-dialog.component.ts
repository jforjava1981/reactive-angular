import {AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import {Course} from "../model/course";
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import * as moment from 'moment';
import {catchError, tap} from 'rxjs/operators';
import {throwError} from 'rxjs';
import { CoursesService } from 'app/services/courses.service';
import { MessagesService } from 'app/messages/messages.service';
import { LoadingService } from 'app/loading/loading.service';

@Component({
    selector: 'course-dialog',
    templateUrl: './course-dialog.component.html',
    styleUrls: ['./course-dialog.component.css'],
    providers:[LoadingService,MessagesService]
})
export class CourseDialogComponent implements AfterViewInit {

    form: FormGroup;

    course:Course;

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<CourseDialogComponent>,
        @Inject(MAT_DIALOG_DATA) course:Course,
        private coursesService:CoursesService,
        private loadingService:LoadingService,
        private messagesService:MessagesService) {

        this.course = course;

        this.form = fb.group({
            description: [course.description, Validators.required],
            category: [course.category, Validators.required],
            releasedAt: [moment(), Validators.required],
            longDescription: [course.longDescription,Validators.required]
        });

    }

    ngAfterViewInit() {

    }

    save() {
        const changes = this.form.value;
        const saveCourses$ = this.coursesService.saveCourses(this.course.id,changes);
        const saveWithLoadingCourses$ = this.loadingService.showUntilComplete(saveCourses$)
        .pipe(tap(() => {
            const errorMessage = "Course cannot be saved";
            this.messagesService.showErrors(errorMessage);
        }),catchError(error => throwError(error)))
        .subscribe((value) => {
            this.dialogRef.close(value);
        });

    }

    close() {
        this.dialogRef.close();
    }

}
