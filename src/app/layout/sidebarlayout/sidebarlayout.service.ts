import { Injectable } from '@angular/core';
import { EnvService } from 'src/app/services/env/env.service';
import { BackendService } from 'src/app/services/backend/backend.service';

@Injectable({
  providedIn: 'root'
})
export class SidebarlayoutService {

  constructor(readonly backend: BackendService,readonly _env:EnvService) { }

  
  
  
  




}
