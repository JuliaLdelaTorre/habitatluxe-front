import { Component, Input } from '@angular/core';

@Component({
  selector: 'shared-show-more',
  templateUrl: './show-more.component.html',
  styleUrls: ['./show-more.component.css']
})
export class ShowMoreComponent {
  @Input() text: string = '';
  @Input() maxLength: number = 50;
  showFullText: boolean = false;

  toggleShowFullText() {
    this.showFullText = !this.showFullText;
  }

  get displayText() {
    if (this.showFullText) {
      return this.text;
    } else {
      return this.text.substring(0, this.maxLength) + '...'; // hace que el texto se corte en maxLength y se añada ... al final.
    }
  }
}
