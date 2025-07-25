import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Header} from '@core/layouts/header';

@Component({
    selector: 'app-home-layout',
    imports: [
        RouterOutlet,
        Header
    ],
    templateUrl: "home-layout.html"
})

export default class HomeLayout {
}
