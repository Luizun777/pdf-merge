import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MergePdfService } from 'src/app/services/merge-pdf.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import * as fileSaver from 'file-saver';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {

  referenciapdfForm: FormGroup;
  arrayFile: any = [];

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
    let form = new FormData();
    form.append('fileName', 'file')
    this.arrayFile.forEach((file: any) => form.append('file', file));
    this.mergeSrv.merge(form).subscribe((data: Blob) => {
      console.log(data);
      // const blob: any = new Blob(data.infoPdf.data, { type: 'application/pdf' });
      fileSaver.saveAs(data, `file.pdf`);
    }, (x) => {
      setTimeout(() => {
        this.mergePDF();
      }, 2000);
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

  elminar(file: any) {
    console.log(file);
    this.arrayFile.splice(file, 1);
  }

}
