import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

type Note = { noteTitle: string, noteContent: string };
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'hw-3';
  noteForm: FormGroup;
  notes: Note[] = [];
  selectedNoteIndex: number = -1;
  editMode: boolean = false;

  constructor(private fb: FormBuilder) {
    this.noteForm = this.fb.group({
      noteTitle: ['', [Validators.required, Validators.minLength(5)]],
      noteContent: ['', [Validators.required, Validators.minLength(7)]]
    });
  }

  get noteTitle() {
    return this.noteForm.get('noteTitle');
  }

  get noteContent() {
    return this.noteForm.get('noteContent');
  }

  onSubmit() {
    if (this.noteForm.valid) {
      if (this.selectedNoteIndex !== -1 && this.editMode) {
        this.notes[this.selectedNoteIndex] = this.noteForm.value;
        this.selectedNoteIndex = -1;
      } else {
        this.notes.push(this.noteForm.value);
        this.selectedNoteIndex = -1;
      }
      this.noteForm.reset();
    }
  }

  selectNote(note: Note) {
    this.selectedNoteIndex = this.notes.indexOf(note);
  }

  editNote() {
    this.noteForm.setValue({
      noteTitle: this.notes[this.selectedNoteIndex].noteTitle,
      noteContent: this.notes[this.selectedNoteIndex].noteContent
    });
    this.editMode = true;
  }

  deleteNote() {
    this.notes.splice(this.selectedNoteIndex, 1);
    this.selectedNoteIndex = -1;
  }
}
