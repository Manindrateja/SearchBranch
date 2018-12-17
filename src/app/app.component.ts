import { Component, ViewChild } from '@angular/core';

import { CommonService } from './common.service';
import {MatPaginator, MatTableDataSource} from '@angular/material';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  _globalbranches: any = {};
  _viewBranches: any;

  _cities: any = [ 'MUMBAI', 'BANGALORE', 'HYDERABAD', 'GOA', 'PUNE', 'KOCHI' ];
  city: string;


  displayedColumns: string[] = [ 'bank_id', 'bank_name','branch', 'city', 'district', 'ifsc', 'address', 'state'];
  //dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

   @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private commonService: CommonService){	
  }

  selectCity(event){
    console.log(event);
    this.getBranches(event.value);
  }

  applyFilter(filterValue: string) {
    this._viewBranches.filter = filterValue.trim().toLowerCase();
  }

  loadingBranches: boolean = false;
  getBranches(city){

  	this.loadingBranches = true;
  	if( city in this._globalbranches){
  		this._viewBranches = new MatTableDataSource<Branch>(this._globalbranches[city]);
      this._viewBranches.paginator = this.paginator;
  		this.loadingBranches = false;
  	}
  	else {
  		this.commonService.getbranchesInfo(city, res => {
        console.log(res);
	  		if(res){
	  			this._globalbranches[city] = res;
	  			this._viewBranches = new MatTableDataSource<Branch>(this._globalbranches[city]);
          this._viewBranches.paginator = this.paginator;
	  		}
	  		this.loadingBranches = false;
	  	});	
  	}
  	
  }
}


export interface Branch {
  bank_id: string;
  bank_name: string;
  branch: number;
  city: string;
  district: string;
  ifsc: string;
  address: string;
  state: string;
}