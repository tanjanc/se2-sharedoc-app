import { Component,OnInit } from '@angular/core';
import {HttpEventType, HttpResponse} from '@angular/common/http';
import { FileService } from "./file.service";


  @Component({
    selector: 'app-upload',
    templateUrl: './upload.component.html',
    styleUrls: ['./upload.component.css']
  })

  export class UploadComponent implements OnInit {

    selectedFiles: FileList;
    currentFileUpload: File;
    currentFileUploadFromFiles: File
    progress: { percentage: number } = { percentage: 0 };

    constructor(private uploadService: FileService) { }

    ngOnInit() {
    }

    OnFileSelectedListener(event) {
      if (event.target.files && event.target.files[0]) {
        this.selectedFiles = event.target.files;
      }
    }


    onUpload() {
      this.progress.percentage = 0;

      this.currentFileUpload = this.selectedFiles.item(0);
      this.uploadService.uploadFile(this.currentFileUpload).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress.percentage = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          console.log('File is completely uploaded!');
        }
      });
      this.selectedFiles = undefined
    }

    onMultiFileUpload() {
      this.progress.percentage = 0;
      this.currentFileUploadFromFiles = this.selectedFiles.item(0);

      this.uploadService.uploadFiles(this.selectedFiles).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress.percentage = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          console.log(this.currentFileUpload);
          console.log('File is completely uploaded!');
        }
      });
      this.selectedFiles = undefined;
    }


  }
