import { Component, OnInit,ElementRef, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs/Observable';
import { DataSource } from '@angular/cdk/collections';
import { MatSort, MatSortable, MatTableDataSource, MatPaginator } from '@angular/material';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/debounceTime';
@Component({
	selector: 'usertable',
	templateUrl: './usertable.component.html',
 	styleUrls: ['./usertable.component.css']
}) 

export class UsertableComponent implements OnInit {
	@ViewChild(MatSort) sort: MatSort;
	@ViewChild(MatPaginator) paginator: MatPaginator;


	dataSource;
	displayedColumns = [ 'owner', 'title' , 'location', 'jobcode', 'client', 'status', 'applicants', 'created'];
	 
 	constructor(private userService: UserService) { }

 	ngOnInit() {
 	this.userService.getUser().subscribe(results => {
 		if(!results){
 			return;
 		}
 		this.dataSource = new MatTableDataSource(results);
 		this.dataSource.sortingDataAccessor = (item, property) => {
 			switch(property){
 				case 'title' : return item.job.name;
 				break;
 				case 'owner' : return item.jobmembers.fName + " "+ item.jobmembers.lName;
 				break;
 				case 'location' : return item.job.joblocation;
 				break;
 				case 'jobcode' : return item.job.jobcode;
 				break;
 				case 'client' : return item.job.clientName;
 				break;
 				case 'status' : return item.job.jobStatus;
 				break;
 				case 'applicants' : return Number(item.job.applicants);
 				break;
 				case 'created' : 	return  new Date(item.job.date_entered);
 				break;

 				default: return item[property];
 				break;
 			}

 		}
		this.dataSource.sort = this.sort;
		this.dataSource.paginator = this.paginator;

 	});
 	
  }
  onSearchChange(filter: string, datatype: string){
  		if(datatype == 'owner'){
        	this.dataSource.filterPredicate = (data: User, filter: string) => (data.jobmembers.fName + " "+ data.jobmembers.lName).toLowerCase().indexOf(filter.toLowerCase()) != -1;
          }else if(datatype == 'jobname'){
        	this.dataSource.filterPredicate = (data: User, filter: string) => data.job.name.toLowerCase().indexOf(filter.toLowerCase()) != -1;
          }else if(datatype == 'location'){
        	this.dataSource.filterPredicate = (data: User, filter: string) => data.job.joblocation.toLowerCase().indexOf(filter.toLowerCase()) != -1;
          }else if(datatype == 'status'){
        	this.dataSource.filterPredicate = (data: User, filter: string) => data.job.jobStatus.toLowerCase().indexOf(filter.toLowerCase()) != -1;
          }
          else if(datatype == 'jobcode'){
        	this.dataSource.filterPredicate = (data: User, filter: string) => data.job.jobcode.toLowerCase().indexOf(filter.toLowerCase()) != -1;
          }
          this.dataSource.filter = filter;
  }

}
/*
export class UserDataSource extends DataSource<any> {
	constructor(private userService: UserService){
		super();
	}

Chaim_McDermott@dana.io
	connect(): Observable<User[]>{
		return this.userService.getUser();
	}

	disconnect() {

	}
}*/