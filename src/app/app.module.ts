import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { HeaderSidenavListComponent } from './header-sidenav-list/header-sidenav-list.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule  } from './material-module/material.module';
import { HttpClientModule} from '@angular/common/http';
import { DialogEditingABookComponent } from './dialogs/dialog-editing-a-book/dialog-editing-a-book.component';
import { DialogRemovalComponent } from './dialogs/dialog-removal/dialog-removal.component';
import { DialogAddingABookComponent } from './dialogs/dialog-adding-a-book/dialog-adding-a-book.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    HeaderSidenavListComponent,
    DialogEditingABookComponent,
    DialogRemovalComponent,
    DialogAddingABookComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule //dodałem tu model od angular material ponieważ często używam elemętów z biblioteki materials i prawie zawsze je importuje do swoich projektów 
  ],
  exports: [
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
