import {Component, OnInit} from '@angular/core';
import {Message} from 'primeng/primeng';
import {SubjectService} from '../../services/subject.service';

@Component({
  selector: 'growl',
  templateUrl: 'growl.html'
})
export class GrowlComponent implements Component{

  public messages: Array<Message> = [];

  constructor(
    private subjectService: SubjectService
  ) {
  }

  ngOnInit() {

    this.subjectService.subscribe('growl:show', (data) => {
      this.messages.push({
        severity: data.type || 'info',  // {success | info | warn | error}
        summary: data.title || 'Info',
        detail: data.content || ''
      });
    });

    this.subjectService.subscribe('growl:hide', () => {
      this.messages = [];
    });
  }
}
