import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private sharedId: string | null = null;

  setId(id: string) {
    this.sharedId = id;
    console.log('Shared ID set to:', this.sharedId); // 디버깅을 위한 로그 추가
  }

  getId(): string | null {
    console.log('Shared ID retrieved:', this.sharedId); // 디버깅을 위한 로그 추가
    return this.sharedId;
  }
}
