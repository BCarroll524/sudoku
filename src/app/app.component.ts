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
  storedNumber: string = undefined;
  changeValueActive: boolean = false;
  


  constructor(
    private http: HttpClient,
    private service: SudokuService,
  ) {}

  ngOnInit() { 
    this.getBoard();
    console.log(this.starters);

  }

  storeNumber(num: string): void {
    if(num === this.storedNumber) {
      this.changeValueActive = false;
      this.storedNumber = undefined;
    } else {
      this.changeValueActive = true;
      this.storedNumber = num;
    }
  }

  changeValue(num: string): void {
    if(this.changeValueActive && !this.checkIfStarter(num)) {
      this.board[num] = this.storedNumber;
      this.changeValueActive = false;
      this.storedNumber = undefined;
    }
    this.getRow(parseInt(num));
    this.getCol(parseInt(num));
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
      console.log(this.starters);
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

  getRow(position: number): void {
    this.currentRow = [];
    const mod = position % 9;
    let counter = 0;
    while(counter < 9) {
      this.currentRow.push(position - mod + counter);
      counter++;
    }
    console.log(this.currentRow);
  }

  getCol(position: number): void {
    this.currentCol = [];
    let mod = position % 9;
    while(mod < 81) {
      this.currentCol.push(mod);
      mod = mod + 9;
    }
    console.log(this.currentCol);
  }

}


