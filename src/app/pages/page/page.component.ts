import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MergePdfService } from 'src/app/services/merge-pdf.service';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {

  movies = [
    'Episode I - The Phantom Menace',
    'Episode II - Attack of the Clones',
    'Episode III - Revenge of the Sith',
    'Episode IV - A New Hope',
    'Episode V - The Empire Strikes Back',
    'Episode VI - Return of the Jedi',
    'Episode VII - The Force Awakens',
    'Episode VIII - The Last Jedi',
    'Episode IX – The Rise of Skywalker'
  ];

  referenciapdfForm: FormGroup;
  arrayFile: any = [];
  table: any = [];

  constructor(
    private formBuilder: FormBuilder,
    private mergeSrv: MergePdfService
  ) { }

  ngOnInit(): void {
    this.formInit();
  }

  formInit() {
    this.referenciapdfForm = this.formBuilder.group({
      pdfArray: this.formBuilder.array([],[Validators.required])
    });
  }

  // get getReferencias(): FormArray { return this.referenciapdfForm.get('pdfArray') as FormArray; }

  mergePDF() {
    const array = this.referenciapdfForm.controls['pdfArray'].value;
    console.log(array);
    const url = 'http://localhost:5000/api/pdf/merge';
    let form = new FormData();
    form.append('fileName', 'file')
    for (const iterator of this.arrayFile) {
      form.append('file', iterator)
    }
    this.mergeSrv.merge(url, form).subscribe((data) => {
      console.log(data);
    })
  }

  subir(evento: any) {
    console.log(evento.target.files.length);
    // this.arrayFile = evento.target.files
    for (const iterator of evento.target.files) {
      console.log(iterator.name);
      this.arrayFile.push(iterator);
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.arrayFile, event.previousIndex, event.currentIndex);
  }

}
