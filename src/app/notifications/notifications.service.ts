import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { scan } from 'rxjs/operators';

export interface Command {
  id: number;
  type: 'success' | 'error' | 'clear';
  text?: string;
}

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  messagesInput: Subject<Command>;
  messagesOutput: Observable<Command[]>;

  constructor() {
    this.messagesInput = new Subject<Command>();
    this.messagesOutput = this.messagesInput.pipe(
      scan((acc: Command[], value: Command) => {
        if (value.type === 'clear') {
          return acc.filter((message) => message.id !== value.id);
        }
        return [...acc, value];
      }, [])
    );
  }

  addSuccess(message: string) {
    const id = this.randomId();
    this.messagesInput.next({
      id,
      text: message,
      type: 'success',
    });

    setTimeout(() => {
      this.clearMessages(id);
    }, 5000);
  }

  addError(message: string) {
    const id = this.randomId();

    this.messagesInput.next({
      id,
      text: message,
      type: 'error',
    });

    setTimeout(() => {
      this.clearMessages(id);
    }, 5000);
  }

  clearMessages(id: number) {
    this.messagesInput.next({
      id,
      type: 'clear',
    });
  }

  private randomId() {
    return Math.round(Math.random() * 10000);
  }
}
