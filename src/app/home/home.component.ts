import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../service/employee/employee.service';
import { UserDetails } from '../models/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userDet = {} as UserDetails;
  data:any;
  toggle:boolean;
  constructor(private serviceemp: EmployeeService) { }

  ngOnInit(): void {
    this.cleaner();
    this.getData();
  }

  async getData() {
    this.serviceemp.fetchEmp().then((res:any) => {
      this.data = res.result;
    }).catch((err) => {
      alert(err);
    })
  }

  cleaner(){
    this.userDet.id = null;
    this.userDet.fname = '';
    this.userDet.mi = '';
    this.userDet.lname = '';
    this.userDet.position = '';
  }

  async create(){
    if(this.userDet.fname == '' || this.userDet.lname == '' || this.userDet.position == ''){
      alert('Field is Required')
    }else{
      if(this.userDet.mi.length < 5){
        this.serviceemp.createEmp(this.userDet).then((res:any) => {
          if(res.result){
            this.cleaner();
            this.getData();
          }else{
            alert('Try Again');
            this.cleaner();
          }
        }).catch((err) => {
          alert(err);
        })
      }else{
        alert('Middle Initial is max 5 characters only. Try Again');
      }
    }
  }

  async delete(data){
    if(confirm('Are you sure you want to delete?')){
      this.serviceemp.deleteEmp(data).then((res:any) => {
        if(res.result){
          this.getData();
        }else{
          alert('Try Again')
        }
      }).catch((err) => {
        alert(err);
      })
    }
  }

  async singleFetch(id){
    this.serviceemp.fetchSingleEmp(id).then((res:any) => {
      this.toggle = true;
      this.userDet.id = res.result['id'];
      this.userDet.fname = res.result['fname'];
      this.userDet.mi = res.result['mi'];
      this.userDet.lname = res.result['lname'];
      this.userDet.position = res.result['position'];
    }).catch((err) => {
      alert(err);
    })
  }

  async update(){
    if(this.userDet.fname == '' || this.userDet.lname == '' || this.userDet.position == ''){ 
      alert('Field is Required')
    }else{
      if(this.userDet.mi.length < 5){
        this.serviceemp.updateEmp(this.userDet).then((res:any) => {
          if(res.result){
            this.toggle = false;
            this.cleaner();
            this.getData();
            alert('Updated');
          }else{
            alert('Try Again')
          }
        }).catch((err) => {
          alert(err);
        })
      }else{
        alert('Middle Initial is max 5 characters only. Try Again');
      }
    }

  }

  clear(){
    this.toggle = false;
    this.cleaner();
  }

}
