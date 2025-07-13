import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

export interface Extension {
    id: number;
    name: string;
    description: string;
    logo: string;
    isActive: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class ExtensionService {
    private readonly dataUrl = '/data/data.json';
    private readonly http = inject(HttpClient)

    getExtensions(): Observable<Extension[]> {
        return this.http.get<Extension[]>(this.dataUrl);
    }
}
