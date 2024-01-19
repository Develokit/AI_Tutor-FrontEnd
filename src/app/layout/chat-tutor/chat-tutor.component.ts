import { Component, OnInit, OnDestroy } from '@angular/core';
import { SubHeaderComponent } from '../sub-header/sub-header.component';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { ChatTutorProfileComponent } from './chat-tutor-profile/chat-tutor-profile.component';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { VoiceComponent } from '../voice/voice.component';
import { ChatService } from '../../api/chat.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ChatTutorProfileService } from '../../api/chat-tutor-profile.service';

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
export class ChatTutorComponent implements OnInit, OnDestroy {
  name: string = ''; // 튜터 이름
  imgFile: string = ''; // 튜터 이미지
  description: string = ''; // 튜터 소개

  selectedImage: string | null = null;
  selectedFile: File | null = null;

  newMessage: string = '';
  text: string = '';
  constructor(
    private router: Router,
    public dialog: MatDialog,
    public chatService: ChatService,
    private chatprofileService: ChatTutorProfileService
  ) {}

  // 채팅창에 입력한 text가 출력되도록
  // 텍스트 입력 컴포넌트
  sendMessage() {
    if (this.newMessage.trim() !== '') {
      // 메시지와 함께 파일도 전송하는 경우
      if (this.selectedFile != null) {
        // 나는 병신이야 나는 병신이야 나는 병신이야 ^^7
        this.chatService.addFile(this.selectedFile);
        this.chatService.addMessage({
          sender: '사용자',
          text: this.newMessage,
        });
        console.log(
          'send message에서 add file이 실행된 후 : ' + this.selectedFile.name
        );
        this.selectedFile = null; // 파일 전송 후 선택된 파일 초기화
      } else {
        // 파일 없이 메시지만 전송하는 경우
        this.chatService.addMessage({
          sender: '사용자',
          text: this.newMessage,
        });
      }
      this.newMessage = '';
    }
  }

  // 채팅 메시지 출력 컴포넌트
  messages: { sender: string; text: string }[] = [];

  ngOnInit() {
    this.chatService.currentMessages.subscribe((messages) => {
      this.messages = messages;
    });
    this.chatprofileService
      .fetchProfile()
      .then((response) => {
        this.name = response.data.name; // response.data 객체에서 name 속성을 추출하여 컴포넌트의 name 변수에 할당
        this.imgFile = response.data.imgFile;
        this.description = response.data.description;
      })
      .catch((error) => {
        console.error('에러 메시지 : ' + error);
      });
  }

  ngOnDestroy(): void {
    this.chatService.deleteThread();
    console.log('화면에서 벗어나서 destroy실행 됨');
  }

  // 이 아래는 이미지 및 파일 선택 및 삭제 관련 함수 설정

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

  onFileSelect(event: any) {
    this.selectedImage = null;
    this.selectedFile = event.target.files[0];
    // if (file) {
    //   // 파일 선택 시 이미지 선택 초기화
    //   this.selectedFile = file;
    // }
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
