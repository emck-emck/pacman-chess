import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { GameComponent } from './component/game/game-component';

@Component({
  selector: 'app-root',
  templateUrl: './app-root.html',
  imports: [GameComponent],
})
export class App {

}

bootstrapApplication(App);
