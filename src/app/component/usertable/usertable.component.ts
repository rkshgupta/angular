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
	@ViewChild('filter') filter: ElementRef;

	dataSource;
	displayedColumns = ['name' , 'email', 'phone', 'company'];
	
 	constructor(private userService: UserService) { }

 	ngOnInit() {
 	this.userService.getUser().subscribe(results => {
 		if(!results){
 			return;
 		}ElementRef
 		this.dataSource = new MatTableDataSource(results);
		this.dataSource.sort = this.sort;
		this.dataSource.paginator = this.paginator;

 	});
 	Observable.fromEvent(this.filter.nativeElement, 'keyup')
        .debounceTime(150)
        .distinctUntilChanged()
        .subscribe(() => {
          if (!this.dataSource) { return; }
          console.log(this.filter.nativeElement);
          this.dataSource.filter = this.filter.nativeElement.value;
        });
 	

 	
  }

}ElementRef
/*
export class UserDataSource extends DataSource<any> {
	constructor(private userService: UserService){
		super();
	}

	connect(): Observable<User[]>{
		return this.userService.getUser();
	}

	disconnect() {

	}
}*/