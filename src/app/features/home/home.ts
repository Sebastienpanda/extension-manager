import {Component, inject, OnInit, signal} from '@angular/core';
import {Card} from '@shared/components/ui/card/card';
import {Extension, ExtensionService} from '@core/extensions/extension-service';

@Component({
    selector: 'app-home',
    templateUrl: 'home.html',
    styleUrl: 'home.scss',
    imports: [
        Card
    ]
})

export default class Home implements OnInit {
    protected readonly extensions = signal<Extension[]>([]);
    private readonly extensionService = inject(ExtensionService);

    ngOnInit() {
        this.extensionService.getExtensions().subscribe({
            next: (data) => {
                this.extensions.set(data);
            },
            error: (err) => {
                console.error('Erreur de chargement des extensions', err);
            }
        });
    }
}
