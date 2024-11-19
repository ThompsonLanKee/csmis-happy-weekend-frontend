import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-excel-import',
  templateUrl: './excel-import.component.html',
  styleUrl: './excel-import.component.css'
})
export class ExcelImportComponent {
  uploadForm: FormGroup;
  selectedFile: File | null = null;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) {
    this.uploadForm = this.formBuilder.group({
      file: ['']
    });
  }

  // Method to handle file selection
  onFileSelected(event: any) {
    const file: File = event.target.files[0];  // Get the selected file
    if (file) {
      this.selectedFile = file;  // Assign to selectedFile
    }
  }

  // Method to handle file upload submission
  onSubmit() {
    if (!this.selectedFile) {
      console.log('No file selected!');
      alert('Please select a file before uploading.');
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile);

    // Make the POST request to the backend
    this.http.post('http://localhost:8081/auth/import/upload', formData, {
      reportProgress: true,
      observe: 'events',
      responseType: 'text' // Expecting plain text response
    }).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          if (event.total !== undefined) {
            const progress = Math.round(100 * event.loaded / event.total);
            console.log(`Upload Progress: ${progress}%`);
          }
        } else if (event.type === HttpEventType.Response) {
          // Check if the response is valid
          if (event.body) {
            console.log('File successfully uploaded!', event.body);
            alert(event.body); // Alert the response message from backend
            this.router.navigate(['/']); // Redirect to your desired route
          } else {
            console.error('Unexpected response structure:', event.body);
            alert('File upload failed.');
          }
        }
      },
      error => {
        console.error('Upload error:', error);
        if (error.status === 200) {
          alert('File uploaded successfully! But an unexpected error occurred in processing the response.');
        } else {
          alert('File upload failed.');
        }
      }
    );
  }
}
