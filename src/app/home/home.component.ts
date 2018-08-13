import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';

import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';


import { DataService } from '../core/data-services/data.service';


@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit, OnDestroy {

    public isFullScreen = false;
    public genres: any[];
    public genresInResults = [];

    public results = [];
    public resultsAll = [];
    public ratings: any[];

    constructor(private dataService: DataService) {
    }

    public ngOnInit(): void {

        this.genresInResults = [];
        this.getNowPlaying();

        this.ratings = [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10];
        this.dataService.getGenreList()
            .subscribe((genre) => {
                this.genres = genre.genres
                this.dataService.getMovieListings()
                    .subscribe((data) => {
                        // sort data according to popularity
                        this.results = data.results.sort((a, b) => {
                            return b.popularity - a.popularity;
                        });
                        console.log('this.results', this.results);
                    });
            });
    }

    public updateByGenres(option: any) {
        let genreId = Number.parseInt(option.target.value);
        if(option.target.checked) {
            this.results = this.results.filter(x => x.genre_ids.includes(genreId));
        }
        else {
            // need to do implement filtering of only selected genres not all here
            this.results = this.resultsAll;
        }
    }


    public filterbyRating(filterVal: any) {
        // reset the results object to the full set
        this.results = this.resultsAll;
        if (filterVal !== "0")
        this.results = this.results.filter(x => x.vote_average >= filterVal);
        else
        this.results = this.resultsAll;
    }


    public getGenresByIdsArray(genreIds) {
        // let's add all the genre ids here..
        this.genresInResults.push(...genreIds);

        let movieGenres = [];
        for (let {id} of this.genres) {
            movieGenres = this.genres.filter(x => genreIds.includes(x.id));
        }

        if (movieGenres.length != 0) {
            return movieGenres;
        } else {
            return this.genres;
        }
    }

    public getNowPlaying() {
        this.dataService.getMovieListings()
            .map(result => {
                return result.results.map(resultsData => {
                    return {
                        'title': resultsData.title,
                        'popularity': resultsData.popularity,
                        'vote_average': resultsData.vote_average,
                        'genre_ids': resultsData.genre_ids,
                        'genres': this.getGenresByIdsArray(resultsData.genre_ids),
                        'poster_path': resultsData.poster_path
                    }
                }).sort((a, b) => b.popularity - a.popularity)
            })
            .subscribe((data) => {
                this.resultsAll = data;
                this.results = data;
                // update genres object to only include genres in result set
                this.genres = this.genres.filter(x => this.genresInResults.includes(x.id));
            });
    }

    public ngOnDestroy(): void {
    }
}
