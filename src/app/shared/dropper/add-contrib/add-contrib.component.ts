import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ArtPiece } from './ArtPiece';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { tap, finalize } from 'rxjs/operators';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { HttpClient, HttpEventType } from '@angular/common/http';

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
  fileData: File = null;
  form;
  checked='false';
  ngOnInit() {
    this.artPieceCollection = this.db.collection('ArtPiece');
    this.artPieces = this.artPieceCollection.valueChanges();

    this.form = new FormGroup({
  		pieceName: new FormControl('', Validators.compose([Validators.required, Validators.pattern('[\\w\\-\\s\\/]+')])),
  		artistFirst: new FormControl('', Validators.compose([Validators.required, Validators.pattern('[\\w\\-\\s\\/]+')])),
      artistLast: new FormControl('', Validators.compose([Validators.required, Validators.pattern('[\\w\\-\\s\\/]+')])),
      description: new FormControl('', Validators.compose([Validators.required, Validators.pattern('[\\w\\-\\s\\/]+')]))
  	});
  }

  constructor(private db: AngularFirestore,
              public dialogRef: MatDialogRef<AddContribComponentDialog>,
              private http: HttpClient) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
 
  fileProgress(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
  }
 
  onSubmit(piece) {
    console.log(piece);
    const formData = new FormData();
    formData.append('file', this.fileData);
    const json = {
      'link': `http://artsafe.space/${new Date().getTime()}_${piece.pieceName}`,
      'image': this.fileData
    };
    console.log(formData.get('file'));
    this.http.post('/about', formData, {
      reportProgress: true,
      observe: 'events'   
    }).subscribe(events => {
      if(events.type == HttpEventType.UploadProgress) {
        console.log('Upload progress: ', Math.round(events.loaded / events.total * 100) + '%');
      } else if(events.type === HttpEventType.Response) {
        console.log(events);
      }
    })
  }
}