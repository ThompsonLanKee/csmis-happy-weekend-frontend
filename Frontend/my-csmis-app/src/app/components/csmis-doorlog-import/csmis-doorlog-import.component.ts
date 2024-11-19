import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-csmis-doorlog-import',
  templateUrl: './csmis-doorlog-import.component.html',
  styleUrl: './csmis-doorlog-import.component.css'
})
export class CsmisDoorlogImportComponent {
  uploadProgress: number = 0;
  uploadForm: FormGroup;
  selectedFile: File | null = null;
  isUploading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.uploadForm = this.formBuilder.group({
      file: ['']
    });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input && input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      console.log('File selected:', this.selectedFile.name); // Log file name
    }
  }

  onSubmit() {
    if (!this.selectedFile) {
      alert('Please select a file before uploading.');
      return;
    }

    this.isUploading = true;
    this.uploadProgress = 0;

    const formData = new FormData();
    formData.append('file', this.selectedFile);

    // Start simulated progress in case real progress events don't cover the full 0-100%
    const simulatedProgress = setInterval(() => {
      if (this.uploadProgress < 95) {
        this.uploadProgress += 1; // Gradually increase progress
      }
    }, 100); // Adjust interval time to control speed of simulated progress

    this.http.post('http://localhost:8081/api/doorlog/upload', formData, {
      reportProgress: true,
      observe: 'events',
      responseType: 'text'
    }).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          if (event.total !== undefined) {
            this.uploadProgress = Math.round((100 * event.loaded) / event.total);
          }
        } else if (event.type === HttpEventType.Response) {
          clearInterval(simulatedProgress); // Stop simulated progress when upload completes

          // Ensure progress reaches 100% and then pause for visibility
          const finalizeProgress = setInterval(() => {
            if (this.uploadProgress < 100) {
              this.uploadProgress += 1;
            } else {
              clearInterval(finalizeProgress); // Stop when 100% is reached

              // Wait for 1 second before showing the success message
              setTimeout(() => {
                this.isUploading = false;
                this.showSuccessMessage(event.body ?? 'File uploaded successfully!');
              }, 1000); // 1 second delay
            }
          }, 30); // Control speed of final progress increments for smooth transition
        }
      },
      error => {
        clearInterval(simulatedProgress); // Stop simulated progress on error
        this.isUploading = false;
        this.uploadProgress = 0;
        this.showErrorMessage('File upload failed. Please try again.');
      }
    );
  }

  showSuccessMessage(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: ['mat-toolbar', 'mat-primary']
    });
  }

  showErrorMessage(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: ['mat-toolbar', 'mat-warn']
    });
  }
}
