import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';

import { Position } from '../../../models/position';
import { Move } from '../../../models/move';

import { AnimationService } from '../../../service/animation-service';
import { SquareComponent } from '../square/square-component';
import { GameStateService } from '../../../service/gamestateservice';
import { PromotionComponent } from '../promotion/promotion-component';
import { PieceType } from '../../../models/piece';

@Component({
  selector: 'board',
  templateUrl: './board.html',
  styleUrl: './board.css',
  imports: [AsyncPipe, CommonModule, SquareComponent, PromotionComponent],
})
export class BoardComponent {
  board$ = this.gameState.board$;
  lastMove$ = this.gameState.lastMove$;
  legalMoves$ = this.gameState.legalMoves$;
  msg$ = this.gameState.message$;
  selectedPiece$ = this.gameState.selected$;

  @ViewChild('animationLayer', {static: true})
  animateBoard!: ElementRef<HTMLElement>;

  @ViewChild('board', {static: true})
  boardRef!: ElementRef<HTMLElement>;

  hiddenSquare: {row: number, col: number} | null = null;
  legalMoveSet = new Set<string>();
  message: string = '';
  selected: string = '';

  constructor(
    private gameState: GameStateService, 
    private animationService: AnimationService, 
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.gameState.lastMove$.subscribe(move => {
      this.animateMove(move);
    });
    this.gameState.legalMoves$.subscribe(moves => {
      this.legalMoveSet = new Set(
        moves.map(m => `${m.row},${m.col}`)
      );
    });
    this.gameState.message$.subscribe(m => {
      this.message = m;
    });
    this.gameState.selected$.subscribe(sel => {
      sel? this.selected = `${sel.row},${sel.col}`: this.selected = ''
    });
  }

  ngAfterViewInit() {
    this.animationService.init(
      this.boardRef.nativeElement,
      this.animateBoard.nativeElement
    );
  }

  async animateMove(move: Move | null){
    if(!move) return;

    this.animationStart(move);

    await this.animationService.animateMove(move);

    this.animationEnd();

    this.cd.detectChanges();
  }

  animationEnd(){
    this.hiddenSquare = null;
  }

  animationStart(move: Move){
    this.hiddenSquare = move.to;
  }

  isHiddenSquare(row: number, col: number){
    if (!this.hiddenSquare) return false;
    return this.hiddenSquare.row === row && this.hiddenSquare.col === col;
  }

  isLegal(row: number, col: number): boolean {
    return this.legalMoveSet.has(`${row},${col}`);
  }

  isLight(row: number, col: number): boolean {
    return (((row + col)%2) == 0);
  }

  isSelected(row: number, col: number): boolean{
    return (this.selected == `${row},${col}`);
  }

  onSquareClick(pos: Position) {
    this.gameState.handleSquareClick(pos);
  }
}
