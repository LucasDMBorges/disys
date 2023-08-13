import { Component, Inject, OnInit, inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';
import { SnackBar } from 'src/app/models/snack-bar.model';

@Component({
  selector: 'app-snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.css'],
})
export class SnackBarComponent implements OnInit {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: SnackBar) { }
  snackBarRef = inject(MatSnackBarRef);

  snackBarClass: any;

  ngOnInit(): void {
    console.log(this.data);
  }
}
