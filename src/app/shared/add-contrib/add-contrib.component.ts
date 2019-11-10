import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ArtPiece } from '../add-contrib/ArtPiece';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

@Component({
  selector: 'app-add-contrib',
  templateUrl: './add-contrib.component.html',
  styleUrls: ['./add-contrib.component.scss']
})
export class AddContribComponent {

  constructor(public m : MatDialog) { }

  startOverlay(): void {
    this.m.open(AddContribComponentDialog, {
      width: '50%',
      minHeight: '500px'
    });
  }
}

@Component({
  selector: 'app-add-contrib-dialog',
  templateUrl: './add-contrib-dialog.component.html'
})

export class AddContribComponentDialog {
  constructor(private db: AngularFirestore,
    public dialogRef: MatDialogRef<AddContribComponentDialog>,
  ) {}

  artPieceCollection: AngularFirestoreCollection<ArtPiece>;
  artPieces: Observable<ArtPiece[]>;

  form;
  checked='false';
  ngOnInit() {
    this.artPieceCollection = this.db.collection('');
    this.artPieces = this.artPieceCollection.valueChanges();

    this.form = new FormGroup({
  		pieceName: new FormControl(),
  		artistFirst: new FormControl('', Validators.compose([Validators.required, Validators.pattern('[\\w\\-\\s\\/]+')])),
      artistLast: new FormControl('', Validators.compose([Validators.required, Validators.pattern('[\\w\\-\\s\\/]+')])),
      medium: new FormControl('', Validators.compose([Validators.required, Validators.pattern('[\\w\\-\\s\\/]+')])),
      published: new FormControl(),
  		explicit: new FormControl(null),
      sensitive: new FormControl(false),
      description: new FormControl(false)
  	});
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(art) {
  	this.artPieceCollection.add(art);
  }
}