import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import * as fileSaver from 'file-saver';
import { PDFDocument } from 'pdf-lib';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {

  referenciapdfForm: FormGroup;
  arrayBase: any = [];

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.formInit();
  }

  formInit() {
    this.referenciapdfForm = this.formBuilder.group({
      nameFile: new FormControl('File', [Validators.required]),
      pdfArray: this.formBuilder.array([])
    });
  }

  get getReferencias(): FormArray { return this.referenciapdfForm.get('pdfArray') as FormArray; }

  async mergePDF() {
    const pdfDoc = await PDFDocument.create();
    for (const iterator of this.arrayBase) {
      const donorPdfDoc = await PDFDocument.load(iterator);
      const docLength = donorPdfDoc.getPageCount();
      console.log(docLength);
      for(var k = 0; k < docLength; k++) {
        const [donorPage] = await pdfDoc.copyPages(donorPdfDoc, [k]);
        pdfDoc.addPage(donorPage);
    }
    }
    const pdfBytes = await pdfDoc.save();
    const blob: any = new Blob([pdfBytes], { type: 'application/pdf' });    
    fileSaver.saveAs(blob, `${this.referenciapdfForm.value.nameFile}.pdf`);

    this.arrayBase = [];
    this.referenciapdfForm.controls['pdfArray'].setValue([]);

  }

  async getBase64(file: any) {
    let reader = new FileReader();
    await reader.readAsDataURL(file);
    reader.onload = async () => {
      await this.arrayBase.push(reader.result)
    };
    reader.onerror = (error) => {
      console.log('Error: ', error);
    };
  }

  async subir(evento: any) {
    for (const iterator of evento.target.files) {
      await this.getBase64(iterator);
      this.getReferencias.value.push(iterator);
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.arrayBase, event.previousIndex, event.currentIndex);
    moveItemInArray(this.getReferencias.value, event.previousIndex, event.currentIndex);
  }

  elminar(file: any) {
    this.arrayBase.splice(file, 1);
    this.getReferencias.value.splice(file, 1);
  }

}
