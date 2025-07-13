import {Component, computed, inject} from '@angular/core';
import {ThemeService} from '@core/theme/theme-service';

@Component({
    selector: 'app-header',
    templateUrl: './header.html',
    styleUrl: './header.scss'
})

export class Header {
    private readonly themeService = inject(ThemeService);
    protected readonly isDark = this.themeService.isDark;

    toggleTheme() {
        this.themeService.toggleTheme();
    }

    protected readonly fillColor = computed(() =>
        this.isDark() ? '#ffffff' : '#091540'
    );
}
