import { PieceType } from '../models/piece';
import { Move } from '../models/move';
import { AnimationStep } from '../models/animation-model';

import { BOARDSIZE } from '../constants';

import { Injectable } from '@angular/core';
import { Direction } from '../models/direction';
import { Position } from '../models/position';

@Injectable({ providedIn: 'root' })
export class AnimationService {

  private pieceLayer!: HTMLElement;
  private boardElement!: HTMLElement;

  init(board: HTMLElement, layer: HTMLElement) {
    this.boardElement = board;
    this.pieceLayer = layer;
  }

  animateMove(move: Move): Promise<void> {
    return new Promise((resolve) => {

      const timeout: number = 2000;

      // Determine piece start and end pixels
      const start = this.getSquareCenter(move.from.row, move.from.col);
      const end = this.getSquareCenter(move.to.row, move.to.col);

      // Generate animation piece
      const wrapper = document.createElement("div");
      wrapper.className = "floating-wrapper";

      // Determine if piece is white or black
      const piece = document.createElement("span");
      if(move.piece.colour === 'white'){
        piece.className = "floating-piece white";
      }else{
        piece.className = "floating-piece black";
      }
      // Get piece drawing
      piece.innerText = this.getPieceDrawing(move.piece.type);

      //Put piece in div wrapper
      wrapper.appendChild(piece);

      //Locate wrapper insert point
      wrapper.style.left = `${start.col}px`;
      wrapper.style.top = `${start.row}px`;

      //Put animation piece in DOM
      this.pieceLayer.appendChild(wrapper);

      //Determine if wrapping move
      let isWrap = false;
      if(move.piece.type === 'knight'){ // Horsie hook
        if(Math.abs(move.to.col - move.from.col) > 2){
          isWrap = true;
        }
      }else{ // Iterative check logic for every other piece type
        let row: number = move.from.row;
        let col: number = move.from.col;
        while(true){
          row += move.direction.row;
          col += move.direction.col;
          if(col === BOARDSIZE || col === -1){
            isWrap = true;            
            break;
          }else if(row === move.to.row && col === move.to.col){
            //Not a wrap
            break;
          }
        }
      }

      if(isWrap){
        //Find midpoints for animation
        let midrow: number = move.from.row;
        let midcol: number = move.from.col;
        //Mid 1
        while(true){
          midrow += move.direction.row;
          midcol += move.direction.col;
          if(midcol >= BOARDSIZE - 1 || midcol <= 0){         
            break;
          }
        }
        const midfromcoord = this.getMidFrom(midrow, midcol, move.direction);

        //Mid 2
        midrow = move.to.row;
        midcol = move.to.col;
        while(true){
          midrow -= move.direction.row;
          midcol -= move.direction.col;
          if(midcol >= BOARDSIZE - 1 || midcol <= 0){         
            break;
          }
        }
        const midtocoord = this.getMidTo(midrow, midcol, move.direction);

        //Determine delta motions for animation
        const delta1 = this.getDeltaMotion(start.col, start.row, midfromcoord.col, midfromcoord.row);
        const delta2 = this.getDeltaMotion(midfromcoord.col, midfromcoord.row, midtocoord.col, midtocoord.row);
        const delta3 = this.getDeltaMotion(midtocoord.col, midtocoord.row, end.col, end.row);

        console.log(delta1);
        console.log(delta2);
        console.log(delta3);

        //Animate
        const animation: AnimationStep[] = [{x: delta1.x, y: delta1.y, duration: Math.floor(timeout/2)}, 
                                            {x: delta2.x, y: delta2.y, duration: 0, instant: true},
                                            {x: delta3.x, y: delta3.y, duration: Math.floor(timeout/2)}
        ];
        this.runAnimation(wrapper, animation);
      }else{
        //Find delta between end and start squares
       const delta = this.getDeltaMotion(start.col, start.row, end.col, end.row);

       //Animate
        const animation: AnimationStep[] = [{x: delta.x, y: delta.y, duration: timeout}];
        this.runAnimation(wrapper, animation);
      }

      //Destroy animated element
      setTimeout(() => {
        wrapper.remove();
      }, timeout);
      
      resolve();

    });
  }

  private getDeltaMotion(startx: number, starty: number, endx: number, endy: number): {x: number, y: number} {
    return {x: endx - startx, y: endy - starty};
  }

  private getSquareCenter(row: number, col: number): Position {

    const square = this.getSquareElement(row, col)

    const rect = square.getBoundingClientRect();
    const boardRect = this.boardElement.getBoundingClientRect();

    return {
      col: rect.left - boardRect.left + rect.width / 2,
      row: rect.top - boardRect.top + rect.height / 2
    };
  }

  getSquareElement(row: number, col: number): Element {
    const selector =`.s[row="${row}"][col="${col}"]`;
    const el = this.boardElement.querySelector(selector)!;
    return el;
  }

  getMidFrom(fromrow: number, fromcol: number, direction: Direction): Position {
    let mid = this.getSquareCenter(fromrow, fromcol);

    mid.row += (direction.row*60);
    mid.col += (direction.col*60);

    return mid;
  }

  getMidTo(fromrow: number, fromcol: number, direction: Direction): Position {
    let mid = this.getSquareCenter(fromrow, fromcol);

    mid.row -= (direction.row*60);
    mid.col -= (direction.col*60);

    return mid;
  }

  getPieceDrawing(type: PieceType): string {
    switch (type) {
        case 'pawn':
          return '♟';
        case 'rook':
          return '♜';
        case 'knight':
          return '♞';
        case 'bishop':
          return '♝';
        case 'queen':
          return '♛';
        case 'king':
          return '♚';
      }
  }

  runAnimation(
    el: HTMLElement,
    steps: AnimationStep[]
  ): Promise<void> {
    return new Promise(resolve => {
      let i = 0;

      function next() {
        if (i >= steps.length) {
          resolve();
          return;
        }

        const step = steps[i++];

        if (step.instant) {
          // teleport (no transition)
          el.style.transition = 'none';
          el.style.transform = `translate(${step.x}px, ${step.y}px)`;

          // force layout so it sticks
          el.getBoundingClientRect();

          // restore transition for next steps
          el.style.transition = '';

          requestAnimationFrame(next);
        } else {
          // animated step
          el.style.transition = `transform ${step.duration}ms linear`;

          requestAnimationFrame(() => {
            el.style.transform = `translate(${step.x}px, ${step.y}px)`;

            // deterministic timing (no transitionend!)
            setTimeout(next, step.duration);
          });
        }
      }

      next();
    });
  }
}