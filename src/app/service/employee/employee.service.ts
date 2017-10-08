import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class EmployeeService {
  apiUrl:any = environment.apiUrl;
  constructor(private http: Http) { }

  fetchEmp(){
    var promise = new Promise((resolve,reject) => {
      this.http.get(this.apiUrl + 'EmployeeList').subscribe((res: Response) => {
        const data = res.json();
        resolve(data)
      })
    })
    return promise;
  }

  createEmp(newuser:any){
    var promise = new Promise((resolve,reject) => {
      this.http.post(this.apiUrl + 'EmployeeAdd',{fname:newuser.fname,mi:newuser.mi,lname:newuser.lname,position:newuser.position}).subscribe((res: Response) => {
        const data = res.json();
        resolve(data)
      })
    })
    return promise;
  }

  fetchSingleEmp(id:number){
    var promise = new Promise((resolve,reject) => {
      this.http.get(this.apiUrl + 'EmployeeSingleFetch/'+id).subscribe((res: Response) => {
        const data = res.json();
        resolve(data);
      })
    })
    return promise;
  }

  deleteEmp(id:number){
    var promise = new Promise((resolve,reject) => {
      this.http.delete(this.apiUrl + 'Employeeremove/'+id).subscribe((res: Response) => {
        const data = res.json();
        resolve(data);
      })
    })
    return promise;
  }

  updateEmp(newuser:any){ 
    console.log(newuser);
    var promise = new Promise((resolve,reject) => {
      this.http.post(this.apiUrl + 'EmployeeUpdate',{id:newuser.id,fname:newuser.fname,mi:newuser.mi,lname:newuser.lname,position:newuser.position}).subscribe((res: Response) => {
        const data = res.json();
        resolve(data);
      })
    })
    return promise;
  }
}
