import {Component, computed, inject, OnInit, signal} from '@angular/core';
import {Card} from '@shared/components/ui/card/card';
import {Extension, ExtensionService} from '@core/extensions/extension-service';
import {ThemeService} from '@core/theme/theme-service';

@Component({
    selector: 'app-home',
    templateUrl: 'home.html',
    styleUrl: 'home.scss',
    imports: [
        Card
    ]
})

export default class Home implements OnInit {
    private readonly extensionService = inject(ExtensionService);
    protected readonly isDark = inject(ThemeService).isDark;

    protected readonly extensions = signal<Extension[]>([]);
    protected readonly selectedFilter = signal<'all' | 'active' | 'inactive'>('all');

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

    protected readonly filteredExtensions = computed(() => {
        const filter = this.selectedFilter();
        const all = this.extensions();

        switch (filter) {
            case 'active':
                return all.filter(ext => ext.isActive);
            case 'inactive':
                return all.filter(ext => !ext.isActive);
            default:
                return all;
        }
    });

    protected setFilter(value: 'all' | 'active' | 'inactive') {
        this.selectedFilter.set(value);
    }

    protected toggleActive(id: number, isActive: boolean) {
        const updated = this.extensions().map(ext =>
            ext.id === id ? {...ext, isActive} : ext
        );

        this.extensions.set(updated);
    }

    protected removeExtension(id: number) {
        const updated = this.extensions().filter(ext => ext.id !== id);
        this.extensions.set(updated);
    }
}
