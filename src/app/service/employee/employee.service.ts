import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

@Injectable()
export class EmployeeService {

  constructor(private http: Http) { }

  fetchEmp(){
    var promise = new Promise((resolve,reject) => {
      this.http.get('http://localhost:8000/EmployeeList').subscribe((res: Response) => {
        const data = res.json();
        resolve(data)
      })
    })
    return promise;
  }

  createEmp(newuser:any){
    var promise = new Promise((resolve,reject) => {
      this.http.post('http://localhost:8000/EmployeeAdd',{fname:newuser.fname,mi:newuser.mi,lname:newuser.lname,position:newuser.position}).subscribe((res: Response) => {
        const data = res.json();
        resolve(data)
      })
    })
    return promise;
  }

  fetchSingleEmp(id:number){
    var promise = new Promise((resolve,reject) => {
      this.http.get('http://localhost:8000/EmployeeSingleFetch/'+id).subscribe((res: Response) => {
        const data = res.json();
        resolve(data);
      })
    })
    return promise;
  }

  deleteEmp(id:number){
    var promise = new Promise((resolve,reject) => {
      this.http.delete('http://localhost:8000/Employeeremove/'+id).subscribe((res: Response) => {
        const data = res.json();
        resolve(data);
      })
    })
    return promise;
  }

  updateEmp(newuser:any){
    console.log(newuser);
    var promise = new Promise((resolve,reject) => {
      this.http.post('http://localhost:8000/EmployeeUpdate',{id:newuser.id,fname:newuser.fname,mi:newuser.mi,lname:newuser.lname,position:newuser.position}).subscribe((res: Response) => {
        const data = res.json();
        resolve(data);
      })
    })
    return promise;
  }
}
