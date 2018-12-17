import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: HttpClient) { }
	
	getbranchesInfo(id: string, callback){
		this.http.get('https://vast-shore-74260.herokuapp.com/banks?city=' + id).subscribe(res => {
			callback(res);
		});
	}
  
}
