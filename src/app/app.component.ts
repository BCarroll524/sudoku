import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { SudokuService } from '../services/sudoku.service';


@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {

  board = [];
  starters = [];
  currentRow = [];
  currentCol = [];
  currentNinth = [];
  storedNumber: string = undefined;
  activePosition: number = undefined;
  


  constructor(
    private http: HttpClient,
    private service: SudokuService,
  ) {}

  ngOnInit() { 
    this.getBoard();
    console.log(this.starters);

  }

  storeNumber(num: string): void {
    this.storedNumber = num;
    if(this.validateRow(this.activePosition, parseInt(num)) 
        && this.validateNinth(this.activePosition, parseInt(num))
        && this.validateCol(parseInt(num))) {
          this.board[this.activePosition] = num;
        }
  }

  changeValue(num: string): void {
    if(!this.checkIfStarter(num)) {
      this.storedNumber = undefined;
      this.activePosition = parseInt(num);
    }
    this.getRow(parseInt(num));
    this.getCol(parseInt(num));
    this.getNinth(parseInt(num));
  }
 
  getBoard(): void {
    this.service.getEasyBoard().subscribe(data => {
      let counter = 0;
      for(let row of data.board) {
        for(let num of row) {
          if(num === 0) {
            this.board.push(num.toString());
          } else {
            this.board.push(num.toString());
            this.starters.push(counter);
          }
          counter++;
        }
      }
      console.log(this.board);
    });
  }


  checkIfStarter(num: string): boolean {
    const position = parseInt(num);
    if (this.starters.indexOf(position) === -1) {
      return false;
    }
    return true;
  }

  checkIfEmpty(num: string): boolean {
    const position = parseInt(num);
    if(this.board[position] === '0') {
      return true;
    }
    return false;
  }

  getNinth(position: number): void {
    this.currentNinth = [];
    let ninth = Math.floor(position / 9);
    let column = ninth % 3;
    let ninthIndex = position % 3;
    const indexs = [0,1,2];
    for(let i of indexs) {
      let currPosition = position + ((i - column) * 9);
      this.getRowInNinth(currPosition, ninthIndex);
    }
  }

  getRowInNinth(position: number, index: number): void {
    const rowStart = position - index;
    const indexs = [0,1,2];
    for(let i of indexs) {
      this.currentNinth.push(rowStart + i);
    }
  }


  getRow(position: number): void {
    this.currentRow = [];
    const rowStart = Math.floor(position/9)*9;
    for(let i =0; i < 9; i++){
      this.currentRow.push(rowStart + i);
    }
  }
  

  getCol(position: number): void {
    this.currentCol = [];
    const colStart = position%9;
    for(let i = 0; i <= 72; i += 9){
      this.currentCol.push(colStart + i);
    }
  }

  isActivePiece(num: string): boolean {
    const pos = parseInt(num);
    if(this.currentNinth.indexOf(pos) !== -1) {
      return true;
    } else if (this.currentRow.indexOf(pos) !== -1) {
      return true;
    } else if (this.currentCol.indexOf(pos) !== -1) {
      return true;
    }
    return false;
  }

  validateRow(position: number, value: number): boolean {
    // check if current row has passed in value
    for(let i of this.currentRow) {
      if(parseInt(this.board[i]) === value) {
        return false;
      }
    }
    return true;
  }

  
  validateNinth(position: number, value: number): boolean {
    // check if current ninth has passed in value
    for(let i of this.currentNinth) {
      if(parseInt(this.board[i]) === value) {
        return false;
      }
    }
    return true;
  }

  validateCol(inputNum:number){
    for(let i of this.currentCol){
      if(parseInt(this.board[i]) === inputNum){
        return false;
      }
    }
    return true;
  }

}


