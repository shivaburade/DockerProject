import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'notesw';
  Notes:any = [];
  note = {
    'title': '',
    'body': ''
  }
  clickButton = false;
  url: string = "http://localhost:3000/Notes";
  constructor(private http: HttpClient){}

  ngOnInit(): void {
    this.getNotes();
  }

  delete(id){
    console.log(id);
    this.http.delete(this.url+"/"+id).subscribe((data) => {
      this.getNotes();
    });
    this.clickButton = true;
  }
  getNotes(){
    this.http.get(this.url).subscribe((data) => {
      this.Notes = data;
      console.log(data);
    });
  }

  addNote(){
    this.http.post(this.url, this.note).subscribe((data) => {
      this.getNotes();
      this.note.body = "";
      this.note.title = "";
    });
      //console.log(this.note_content + " " + this.note_title);
  }

  
  

}
