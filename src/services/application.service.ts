import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApplicationService {
  /**
   * Simulates submitting an application.
   * @returns A promise that resolves after a 2-second delay.
   */
  submitApplication(): Promise<void> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, 2000);
    });
  }
}
