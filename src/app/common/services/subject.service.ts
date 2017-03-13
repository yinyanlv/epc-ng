import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable()
export class SubjectService {

  private subject = new Subject();
  private subject$ = this.subject.asObservable();
  private listenerMap: Map<string, Array<Function>> = new Map<string, Array<Function>>();
  private cache: Map<string, any> = new Map<string, any>();

  constructor() {
    this.subject$.subscribe(data => this.onEvent(data));
  }

  onEvent(data: Object): void {

    let listeners = this.listenerMap.get(data['event']) || null;

    listeners.forEach((fn) => {

      fn.call(null, data['data']);
    });
  }

  subscribe(event: string, fn: Function): void {

    let listeners = this.listenerMap.get(event);

    if (listeners) {

      listeners.push(fn);
    } else {

      this.listenerMap.set(event, [fn]);
    }
  }

  doCheck(event: string, data: any): void {

    let prevValue = this.cache.get(event);

    if (prevValue !== data) {

      this.cache.set(event, data);

      this.subject.next({
        event,
        data
      });
    }
  }

  trigger(event: string, data: any): void {

    this.subject.next({
      event,
      data
    });
  }
}
