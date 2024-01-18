import { Component } from '@angular/core';
import { SubHeaderComponent } from '../sub-header/sub-header.component';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { ChatTutorProfileComponent } from './chat-tutor-profile/chat-tutor-profile.component';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { VoiceComponent } from '../voice/voice.component';
import { ChatService } from '../../api/chat.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-chat-tutor',
  standalone: true,
  templateUrl: './chat-tutor.component.html',
  imports: [
    SubHeaderComponent,
    ChatTutorProfileComponent,
    FormsModule,
    NgFor,
    NgIf,
    HttpClientModule,
  ],
})
export class ChatTutorComponent {
  constructor(
    private router: Router,
    public dialog: MatDialog,
    public chatService: ChatService
  ) {}
  newMessage: string = '';
  text: string = '';

  // 채팅창에 입력한 text가 출력되도록
  // 텍스트 입력 컴포넌트
  sendMessage() {
    if (this.newMessage.trim() !== '') {
      // 메시지와 함께 파일도 전송하는 경우
      if (this.selectedFile != null) {
        this.chatService.addMessage({
          sender: '사용자',
          text: this.newMessage,
        });
        this.chatService.addFile(this.selectedFile);
      } else {
        // 파일 없이 메시지만 전송하는 경우
        this.chatService.addMessage({
          sender: '사용자',
          text: this.newMessage,
        });
      }
      this.newMessage = '';
      this.selectedFile = null; // 파일 전송 후 선택된 파일 초기화
    }
  }

  // 채팅 메시지 출력 컴포넌트
  messages: { sender: string; text: string }[] = [];

  ngOnInit() {
    this.chatService.currentMessages.subscribe((messages) => {
      this.messages = messages;
    });
  }

  // 이 아래는 이미지 및 파일 선택 및 삭제 관련 함수 설정

  selectedImage: string | null = null;
  selectedFile: File | null = null;

  onImageSelect(event: Event) {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    if (file) {
      // 이미지 선택 시 파일 선택 초기화
      this.selectedFile = null;

      const reader = new FileReader();
      reader.onload = (e) => {
        if (reader.result) {
          this.selectedImage = reader.result.toString();
        }
      };
      reader.readAsDataURL(file);
    }
  }

  onFileSelect(event: Event) {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    if (file) {
      // 파일 선택 시 이미지 선택 초기화
      this.selectedImage = null;

      this.selectedFile = file;
    }
  }

  removeSelectedImage() {
    this.selectedImage = null;
  }

  removeSelectedFile() {
    this.selectedFile = null;
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }

  // 모달 설정
  openDialog(): void {
    const dialogRef = this.dialog.open(VoiceComponent, {
      width: '100%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('모달이 닫혔습니다.');
    });
  }
}
