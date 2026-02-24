import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { BoardComponent } from './component/board/board-component';

@Component({
  selector: 'app-root',
  templateUrl: './app-root.html',
  imports: [BoardComponent],
})
export class App {

}

bootstrapApplication(App);
