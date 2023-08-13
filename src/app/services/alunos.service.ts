import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Aluno } from '../models/aluno.model';

@Injectable({
  providedIn: 'root',
})
export class AlunosService {
  constructor(private htttp: HttpClient) {}

  findAll(): Observable<any> {
    return this.htttp.get<any>(environment.ALUNOS_API);
  }

  deleteAlunoByid(id: number) {
    return this.htttp.delete<any>(environment.ALUNOS_API + '/' + `${id}`);
  }

  createAluno(aluno: Aluno) {
    return this.htttp.post<Aluno>(environment.ALUNOS_API, aluno);
  }

  findById(id: number) {
    return this.htttp.get<Aluno>(environment.ALUNOS_API + '/' + `${id}`);
  }

  patchAluno(id: number, aluno: Aluno) {
    return this.htttp.patch<Aluno>(
      environment.ALUNOS_API + '/' + `${id}`,
      aluno
    );
  }
}
