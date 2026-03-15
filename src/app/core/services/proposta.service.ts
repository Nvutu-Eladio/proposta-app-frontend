import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PropostaResponse } from '../models/proposta.model';
import { PropostaRequest } from '../models/proposta-request.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PropostaService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  listarPropostas(): Observable<PropostaResponse[]> {
    return this.http.get<PropostaResponse[]>(this.apiUrl);
  }

  criarProposta(proposta: PropostaRequest): Observable<PropostaResponse> {
    return this.http.post<PropostaResponse>(this.apiUrl, proposta);
  }
}
