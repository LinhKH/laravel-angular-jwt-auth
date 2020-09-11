import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './../../shared/auth.service';
import { throwError } from 'rxjs';


@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.scss']
})

export class ChangePasswordComponent implements OnInit {
    changePasswordForm: FormGroup;
    errors = null;

    constructor(
        public fb: FormBuilder,
        route: ActivatedRoute,
        public authService: AuthService,
        public router: Router
    ) {
        this.changePasswordForm = this.fb.group({
            email: [''],
            password: [''],
            password_confirmation: [''],
            passwordToken: ['']
        })
        route.queryParams.subscribe((params) => {
            this.changePasswordForm.controls['passwordToken'].setValue(params['token']);
        })
    }

    ngOnInit(): void {

    }

    onSubmit() {
        this.authService.resetPassword(this.changePasswordForm.value).subscribe(
            result => {
                alert('Password has been updated');
                this.changePasswordForm.reset();
                this.router.navigate(['login']);
            },
            error => {
                this.handleError(error);
            }
        );
    }

    handleError(error) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            // client-side error
            errorMessage = `Error: ${error.error.message}`;
        } else {
            // server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        console.log(errorMessage);
        return throwError(errorMessage);
    }

}