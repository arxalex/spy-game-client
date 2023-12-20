import {Component, Input} from '@angular/core';
import {Word} from "../../../../models/word";

@Component({
  selector: 'app-word-item',
  templateUrl: './word-item.component.html',
  styleUrls: ['./word-item.component.scss']
})
export class WordItemComponent {
  @Input() wordItem: Word = {id: 0, word: "", setid: 0};
}
