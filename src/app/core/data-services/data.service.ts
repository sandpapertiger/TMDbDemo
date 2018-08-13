import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DataService {

    constructor(private httpClient: HttpClient) {
    }

    public getGenreList(): Observable<any> {
        return this.httpClient.get('https://api.themoviedb.org/3/genre/movie/list?api_key=a6f5f9e113a5d3c98377e3b71e117c25&language=en-US');
    }

    public getMovieListings(): Observable<any> {
        return this.httpClient.get('https://api.themoviedb.org/3/movie/now_playing?api_key=a6f5f9e113a5d3c98377e3b71e117c25&language=en-US&page=1&region=GB');
    }
}
