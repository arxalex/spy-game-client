import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {SetService} from "../../../services/set.service";

@Component({
  selector: 'app-set-editor',
  templateUrl: './set-editor.component.html',
  styleUrls: ['./set-editor.component.scss']
})
export class SetEditorComponent implements OnChanges {
  @Output() closeEvent = new EventEmitter();
  @Input() setId: number | undefined;
  public form: any = {
    name: null,
    words: null
  };
  public isSaveFailed = false;
  public errorMessage = '';

  constructor(private setService: SetService) {

  }

  async ngOnChanges(_changes: SimpleChanges): Promise<void> {
    if(!!this.setId) {
      const setAndWords = await this.setService.getSet(this.setId);
      this.form.name = setAndWords.set.name;
      this.form.words = setAndWords.words.map(e => e.word).join("\n");
    }
  }

  public onClose(): void {
    this.closeEvent.emit();
  }

  public async onSubmit(): Promise<void> {
    try {
      const {name, words} = this.form;
      if (!!this.setId) {
        await this.setService.updateSet(this.setId, name, words.split("\n"));
      } else {
        await this.setService.createSet(name, words.split("\n"));
      }

      this.closeEvent.emit();
    } catch (err: any) {
      this.isSaveFailed = true;
      this.errorMessage = err;
    }
  }
}
