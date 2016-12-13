import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Hero } from './hero';

@Injectable()
export class HeroService {
    private heroesUrl = 'api/heroes';
    private headers = new Headers({'Content-Type': 'application/json'});
    constructor(private http: Http) { };
    getHeroes(): Promise<Hero[]> {
        return this.http.get(this.heroesUrl)
                    .toPromise()
                    .then((response: any) => response.json().data as Hero[])
                    .catch(this.handleError);
    }
    handleError(error: any): Promise<any> {
        console.error('An error ocurred ', error);
        return Promise.reject(error.message || error);
    }
    getHeroesSlowly(): Promise<Hero[]> {
        return new Promise<Hero[]>(resolve =>
            setTimeout(resolve, 500)) // delay 0.5 seconds
            .then(() => this.getHeroes());
    }
    getHero(id: number): Promise<Hero> {
        const url = `${this.heroesUrl}/${id}`;
        return this.http.get(url)
            .toPromise()
            .then((response: any) => response.json().data as Hero)
            .catch(this.handleError);
    }
    getHeroSlowly(id: number): Promise<Hero> {
        return new Promise<Hero>(resolve =>
            setTimeout(resolve, 500)) // delay 0.5 seconds
            .then(() => this.getHero(id));
    }
    update(hero: Hero): Promise<Hero> {
        const url = `${this.heroesUrl}/${hero.id}`;
        return this.http
                .put(url, JSON.stringify(hero), {headers: this.headers})
                .toPromise()
                .then(() => hero)
                .catch(this.handleError);
    }
}