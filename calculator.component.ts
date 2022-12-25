import { Component, OnInit } from '@angular/core';
import {  ElementRef,  ViewChild } from '@angular/core';
@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


@ViewChild('valueArea') valueArea!: ElementRef;
  showAlert: boolean = false;
  showAlertText:string = '';
 appendText(val: any) {
    this.valueArea.nativeElement.value = this.valueArea.nativeElement.value + val;
  }
 delChar() {
    this.valueArea.nativeElement.value = this.valueArea.nativeElement.value.substring(0, this.valueArea.nativeElement.value.length - 1);
  }
clearValueArea() {
    this.valueArea.nativeElement.value = '';
  }
  appendResult() {
    var res = /\d/.test(this.valueArea.nativeElement.value);
    var resText = this.valueArea.nativeElement.value;
    try{
      eval(resText);
    }catch(e){
      if(e instanceof SyntaxError){
        this.showAlert = true;
        this.showAlertText = 'Wrong Expression,Clearing the textarea'
        setTimeout(() => {
          this.showAlert = false;
          this.valueArea.nativeElement.value = '';
        }, 3000);
      }
    }
    if(resText == ''){
      this.showAlert = true;
      this.showAlertText = 'Nothing is there to do calculation,Please enter something,Clearing the textarea';
      setTimeout(() => {
        this.showAlert = false;
        this.valueArea.nativeElement.value = '';
      }, 3000);
    }
    else if(res){
    this.valueArea.nativeElement.value = eval(resText) != undefined ? eval(resText) : '';
    }
    else{
      this.showAlert = true;
      this.showAlertText = 'Please include digits in expression,Clearing the textarea'
      setTimeout(() => {
        this.showAlert = false;
        this.valueArea.nativeElement.value = '';
      }, 3000);
    }
  }
}

