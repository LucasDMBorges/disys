import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Aluno } from 'src/app/models/aluno.model';
import { AlunosService } from 'src/app/services/alunos.service';
import { SnackBarComponent } from '../snack-bar/snack-bar.component';

@Component({
  selector: 'app-aluno-form',
  templateUrl: './aluno-form.component.html',
  styleUrls: ['./aluno-form.component.css'],
})
export class AlunoFormComponent implements OnInit {
  public form = this.fb.group({
    nome: ['', Validators.required],
    sobrenome: ['', Validators.required],
    idade: [0, Validators.required],
    sexo: ['', Validators.required],
  });

  public alunoId: any;

  constructor(
    private fb: FormBuilder,
    private alunoService: AlunosService,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.alunoId = this.activatedRoute.snapshot?.paramMap.get('id');
    if(this.alunoId) this.findAluno();
  }

  saveAluno() {
    const aluno = this.form.getRawValue() as Aluno;
    if (this.alunoId) {
      this.alunoService.patchAluno(this.alunoId, aluno).subscribe({
        next: (res: Aluno) => {
          console.log(res);
          this.snackBar.openFromComponent(SnackBarComponent, {
            data: {
              class:'sucess',
              message: 'Registro de aluno atualizado'
            }          
          });
        },
        error: (err: any) => {
          this.snackBar.openFromComponent(SnackBarComponent, {
            data: {
              class:'error',
              message: err.statusText
            }          
          });
        },
      });
    } else {
      this.alunoService.createAluno(aluno).subscribe({
        next: (res: Aluno) => {
          this.snackBar.openFromComponent(SnackBarComponent, {
            data: {
              class:'sucess',
              message: 'Registro de aluno criado'
            }          
          });
        },
        error: (err: any) => {
          this.snackBar.openFromComponent(SnackBarComponent, {
            data: {
              class:'error',
              message: err.statusText
            }          
          });
        },
      });
    }
  }

  findAluno() {
    this.alunoService.findById(this.alunoId).subscribe({
      next: (res: Aluno) => {
        this.form.patchValue({
          ...res,
        });
      },
      error: (err: any) => {
        this.snackBar.openFromComponent(SnackBarComponent, {
          data: {
            class:'error',
            message: err.statusText
          }          
        });
      },
    });
  }

  fieldValid(field: string) {
		return (
			(this.form.get(field)?.dirty || this.form.get(field)?.touched) &&
			this.form.get(field)?.invalid
		);
	}
}
