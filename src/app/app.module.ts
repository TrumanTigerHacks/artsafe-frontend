import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { MatGridListModule } from '@angular/material';

// App Modules
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomePageComponent } from './home-page/home-page.component';
import { SharedModule } from './shared/shared.module';
import { AngularFireDatabaseModule } from '@angular/fire/database';

// Firebase imports
import { AngularFireAuthModule } from '@angular/fire/auth';
import { ServiceWorkerModule } from '@angular/service-worker';
import { HelpComponent } from './help/help.component';
import { AboutComponent } from './about/about.component';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireModule } from 'angularfire2';
import { DropZoneDirective } from './drop-zone.directive';
import { FileSizePipe } from './shared/file-size.pipe';
import { MatDialogModule } from '@angular/material';
import {MatInputModule} from '@angular/material';
import { AngularFirestore } from 'angularfire2/firestore';
import { AddContribComponentDialog, AddContribComponent } from './shared/dropper/add-contrib/add-contrib.component';
import { AngularFireStorage } from 'angularfire2/storage';


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    HelpComponent,
    AboutComponent,
    DropZoneDirective,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    AngularFireAuthModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    MatGridListModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    MatDialogModule,
    MatInputModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule
  ],
  providers: [AngularFirestore, AngularFireStorage],
  bootstrap: [AppComponent],
  entryComponents: [
    AddContribComponentDialog
  ]
})
export class AppModule {
  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer){
    matIconRegistry.addSvgIconSet(domSanitizer.bypassSecurityTrustResourceUrl('/assets/mdi.svg'));
  }
}
