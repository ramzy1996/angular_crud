import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../service/employee.service';
import { Employee } from '../shared/employee.model';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-employee',
    templateUrl: './employee.component.html',
    styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
    constructor(public service: EmployeeService, private toastr: ToastrService) { }
    ngOnInit(): void {
        this.service.fetchEmployeeList()
    }
    populateForm(selectedRecord: Employee) {
        this.service.employeeForm.setValue({
            _id: selectedRecord._id,
            fullName: selectedRecord.fullName,
            position: selectedRecord.position,
            location: selectedRecord.location,
            salary: selectedRecord.salary,
        })
    }
    onDelete(id: string) {
        if (confirm('Are you sure to delete?')) {
            this.service.deleteEmployee(id).subscribe(res => {
                this.service.fetchEmployeeList()
                this.toastr.error("Employee deleted successfully", "Delete employee")
            })
        }
    }
}
