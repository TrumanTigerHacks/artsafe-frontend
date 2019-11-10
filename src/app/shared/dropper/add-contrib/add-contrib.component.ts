import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ArtPiece } from './ArtPiece';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { tap, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-add-contrib',
  templateUrl: './add-contrib.component.html',
  styleUrls: ['./add-contrib.component.scss']
})
export class AddContribComponent {
  constructor(public m : MatDialog) { }

  startOverlay(): void {
    this.m.open(AddContribComponentDialog, {
      width: '60%',
      minHeight: '400px'
    });
  }
}

@Component({
  selector: 'app-add-contrib-dialog',
  templateUrl: './add-contrib-dialog.component.html',
  styleUrls: ['./add-contrib.component.scss']
})
export class AddContribComponentDialog {

  artPieceCollection: AngularFirestoreCollection<ArtPiece>;
  artPieces: Observable<ArtPiece[]>;

  form;
  checked='false';
  ngOnInit() {
    this.artPieceCollection = this.db.collection('ArtPiece');
    this.artPieces = this.artPieceCollection.valueChanges();

    this.form = new FormGroup({
  		pieceName: new FormControl('', Validators.compose([Validators.required, Validators.pattern('[\\w\\-\\s\\/]+')])),
  		artistFirst: new FormControl('', Validators.compose([Validators.required, Validators.pattern('[\\w\\-\\s\\/]+')])),
      artistLast: new FormControl('', Validators.compose([Validators.required, Validators.pattern('[\\w\\-\\s\\/]+')])),
      description: new FormControl('', Validators.compose([Validators.required, Validators.pattern('[\\w\\-\\s\\/]+')])),
      art: new FormControl()
  	});
  }

  constructor(private db: AngularFirestore,
              public dialogRef: MatDialogRef<AddContribComponentDialog>,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(art) {
  	this.artPieceCollection.add(art);
  }
}