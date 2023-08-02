import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { throwError, catchError } from 'rxjs'
import { Employee } from '../shared/employee.model';

@Injectable({
    providedIn: 'root'
})
export class EmployeeService {
    list: Employee[] = []

    constructor(private fb: FormBuilder, private http: HttpClient) { }

    readonly baseURL = 'http://localhost:3000/api/employees/'

    employeeForm = this.fb.group({
        _id: [''],
        fullName: ['', Validators.required],
        position: ['', Validators.required],
        location: ['', Validators.required],
        salary: ['', Validators.required],
    })
    fetchEmployeeList() {
        return this.http.get(this.baseURL)
            .pipe(catchError(this.handleError))
            .subscribe(data => {
                this.list = data as Employee[]
                console.log(data)
            })
    }
    postEmployee() {
        return this.http.post(this.baseURL, this.employeeForm.value)
            .pipe(catchError(this.handleError))
    }
    putEmployee() {
        return this.http.put(this.baseURL + this.employeeForm.get('_id')?.value, this.employeeForm.value)
            .pipe(catchError(this.handleError))
    }

    deleteEmployee(id: string) {
        return this.http.delete(this.baseURL + id)
            .pipe(catchError(this.handleError))
    }

    private handleError(error: HttpErrorResponse) {
        if (error.status === 0) {
            console.error('An error occurred:', error.error);
        } else {
            console.error(
                `Backend returned code ${error.status}, body was: `, error.error);
        }
        return throwError(() => new Error('Something bad happened; please try again later.'));
    }
}
