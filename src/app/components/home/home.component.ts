import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Aluno } from 'src/app/models/aluno.model';
import { AlunosService } from 'src/app/services/alunos.service';
import { SnackBarComponent } from '../snack-bar/snack-bar.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  dataSource!: MatTableDataSource<any>;

  durationInSeconds = 5;

  displayedColumns: string[] = [
    'id',
    'nome',
    'sobrenome',
    'idade',
    'sexo',
    'acoes',
  ];

  constructor(
    private alunos: AlunosService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getAllAlunos();
  }

  getAllAlunos() {
    this.alunos.findAll().subscribe({
      next: (res: Array<Aluno>) => {
        this.dataSource = new MatTableDataSource(res);
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

  addAluno() {
    this.router.navigate(['/novo']);
  }

  editAluno(id: number) {
    this.router.navigate([`/editar`, id]);
  }

  deleteAluno(id: number) {
    this.alunos.deleteAlunoByid(id).subscribe({
      next: (res: any) => {
        this.getAllAlunos();
        this.snackBar.openFromComponent(SnackBarComponent, {
          data: {
            class:'sucess',
            message: 'Registro de aluno deletado'
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
