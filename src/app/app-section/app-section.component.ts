import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {MockService} from './../http.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms'

@Component({
  selector: 'app-section',
  templateUrl: './app-section.component.html',
  styleUrls: ['./app-section.component.scss']
})
export class AppSectionComponent implements OnInit {
  showSuccess: boolean = false;

  constructor(private service: MockService, private fb: FormBuilder) { 
    this.service.getWeatherDetails().subscribe((resp: any) => {
    this.weather = resp &&  resp.result ? resp.result : []
  });

  this.service.getCities().subscribe((resp: any) => {
    this.dest = resp && resp.result ? resp.result : []
  });

}
  form: FormGroup
  weather: any = []
  dest: any = []
  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      contact: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
      email: ['', [Validators.required, Validators.email]]
    })
  }
  get name() {
    return this.form.get('name');
  }
 
  get contact() {
    return this.form.get('contact');
  }
 
  get email() {
    return this.form.get('email');
  }
 
  onSubmit(){
    this.form.reset();
    this.showSuccess = true
  }
}
