import {ChangeDetectionStrategy, Component, inject, input, output} from '@angular/core';
import {ThemeService} from '@core/theme/theme-service';

@Component({
    selector: 'app-card',
    templateUrl: 'card.html',
    styleUrl: 'card.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class Card {
    protected readonly isDark = inject(ThemeService).isDark

    readonly name = input.required<string>();
    readonly icon = input.required<string>();
    readonly description = input.required<string>();
    readonly id = input.required<number>();
    readonly isActive = input.required<boolean>();


    protected readonly remove = output<number>();
    protected readonly toggleChange = output<{
        id: number;
        isActive: boolean;
    }>();

    onRemove() {
        this.remove.emit(this.id());
    }

    onToggleChange() {
        this.toggleChange.emit({id: this.id(), isActive: !this.isActive()});
    }
}
