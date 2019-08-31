import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Prediction } from '../data-structures/prediction';
import * as mobilenet from '@tensorflow-models/mobilenet';

@Component({
  selector: 'app-image-classifier-upload',
  templateUrl: './image-classifier-upload.component.html',
  styleUrls: ['./image-classifier-upload.component.scss']
})
export class ImageClassifierUploadComponent implements OnInit {
  imageSrc: string;

  @ViewChild('img', { static: false }) imageEl: ElementRef;

  predictions: Prediction[];

  model: any;
  loading = true;

  constructor() {}

  async ngOnInit() {
    console.log('loading mobilenet model...');
    this.model = await mobilenet.load();
    console.log('Sucessfully loaded model');
    this.loading = false;
  }

  async fileChangeEvent(event) {
    console.log('file changes');

    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]);

      reader.onload = (res: any) => {
        this.imageSrc = res.target.result;
        setTimeout(async () => {
          console.log(this.imageEl);
          const imgEl = this.imageEl.nativeElement;
          this.predictions = await this.model.classify(imgEl);
        }, 0);
      };
    }
  }
}
