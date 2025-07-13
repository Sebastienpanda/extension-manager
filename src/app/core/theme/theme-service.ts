import {Injectable, signal} from '@angular/core';

@Injectable({providedIn: 'root'})
export class ThemeService {
    private readonly _isDark = signal<boolean>(false);
    readonly isDark = this._isDark.asReadonly();

    constructor() {
        const stored = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        this._isDark.set(stored === 'dark' || (!stored && prefersDark));
        this.updateBodyClass();
    }

    toggleTheme(): void {
        this._isDark.update(v => !v);
        this.updateBodyClass();
        localStorage.setItem('theme', this._isDark() ? 'dark' : 'light');
    }

    private updateBodyClass(): void {
        const classList = document.body.classList;
        if (this._isDark()) {
            classList.add('dark');
        } else {
            classList.remove('dark');
        }
    }
}
