import { Router } from '@angular/router';
import { AuthServiceService } from '../../services/AuthService/auth-service.service';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {

  hasError : string;

  formLogin = this.fb.group({
    acessKey: ["", [
      Validators.minLength(49),
      Validators.required
    ]]
  });

  constructor(private fb: FormBuilder,
    private authService: AuthServiceService,
    public router :Router){
      this.hasError = "";
  }

  async onSubmit() {
    const acessKey : string | any = this.formLogin.value.acessKey?.toString();
    const result = await this.authService.authUser(acessKey);
    if(result) {
      this.router.navigate(['']);

    } else {
      this.hasError = "Key inválida";

    }
  }


}
