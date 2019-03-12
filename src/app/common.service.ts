import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { HttpRequest, HttpHandler, HttpEvent, HttpEventType } from '@angular/common/http';
import {Http, Response, Headers, RequestOptions} from '@angular/http'
import {Observable} from 'rxjs';
import { BehaviorSubject } from 'rxjs';

interface HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>;
}

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})


export class CommonService {
  public data: BehaviorSubject<any> = new BehaviorSubject([]);
  public pageOption: BehaviorSubject<any> = new BehaviorSubject([]);
  public options;
  public headers;
  public httpHeaders;
  
  constructor(private http: Http, private httpClient: HttpClient) { 
    this.headers =new Headers({'Content-Type': 'application/json','Accept':'application/json',
    'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    'Access-Control-Allow-Headers':'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  }); 
    this.options= new RequestOptions({headers: this.headers})
  }

  get_products(no,val, start, end){
    let baseUrl="https://images-api.nasa.gov/search?q="+val+"&media_type=image&page="+no+"&year_start="+start+"&year_end="+end
    this.httpClient.get(baseUrl).subscribe((res:any)=>{
       let resData = res.collection.items;
       this.pageOption.next(res.collection.links);
       this.data.next(resData)
    });
}




}
