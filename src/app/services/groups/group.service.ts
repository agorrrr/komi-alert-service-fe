import { Injectable } from '@angular/core';
import { EnvService } from 'src/app/services/env/env.service';
import { BackendService } from 'src/app/services/backend/backend.service';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  constructor(private backend: BackendService, private _env: EnvService) {}

  retriveGroupAndMenu() {
    
    
    const url = `/ex/groupmanager/retriveGroupAndMenu`;
    return this.backend.get(url);
  }
  addGroup(body: any) {
    const url = `/bvams/companies-group/addGroup`;
    return this.backend.postAPI(url, body);
    
    
  }
  editGroup(body: any) {
    const url = `/bvams/companies-group/updateGroup`;
    return this.backend.postAPI(url, body);
    
    
  }
  getGroupById(body: any) {
    const url = `/bvams/companies-group/getGroupbyId`;
    return this.backend.postAPI(url, body);
    
    
  }
  deleteGroup(body: any) {
    const url = `/bvams/companies-group/deleteGroup`;
    return this.backend.postAPI(url, body);
    
    
  }

  getGroups() {
    const url = `/bvams/companies-group/getGroups`;
    return this.backend.getAPI(url);
    
    
  }
}
