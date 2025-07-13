import {Component, input, output} from '@angular/core';

@Component({
    selector: 'app-card',
    templateUrl: 'card.html',
    styleUrl: 'card.scss',
})

export class Card {
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
