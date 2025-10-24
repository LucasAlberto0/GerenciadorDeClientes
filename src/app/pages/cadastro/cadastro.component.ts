import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { FloatLabel, FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ICadastroGerente } from '../../interfaces/ICadastoGerenteInterface';
import { GerenteService } from '../../services/gerente.service';

@Component({
  selector: 'app-cadastro',
  imports: [ButtonModule, FormsModule, PasswordModule, FloatLabelModule, FloatLabel, InputTextModule, DividerModule, ReactiveFormsModule],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss'
})
export class CadastroComponent implements OnInit {

    cadastroForm!: FormGroup;
    value!: string | undefined;
    private _router = inject(Router);
    constructor(private _fb: FormBuilder, private _gerenteService: GerenteService) {}

    ngOnInit(): void {
      this.cadastroForm = this._fb.group({
        nome: [null, Validators.required],
        email: [null, [Validators.email, Validators.required]],
        empresa: [null, [Validators.required]],
        password: [null, [Validators.required, Validators.minLength(3)]],
        rePassword: [null, [Validators.required, Validators.minLength(3)]]
      })
    }


    getCadastro(): FormGroup | null {
      return this.cadastroForm;
    }

    setCadastro(form: FormGroup){
      this.cadastroForm = form;
    }

    cadastrar(){
      const formCadastro = this.getCadastro()
      
      if(formCadastro?.valid){
        const novoCadastro = formCadastro.getRawValue() as ICadastroGerente;
        this._gerenteService.cadastrar(novoCadastro).subscribe({
          next: (value) => {
            console.log('Cadastro realizado', value)
          },
          error: (err) => {
            console.log('Erro ao cadastrar', err)
          }
        })
      }
    }



}
