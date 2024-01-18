import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChatTutorProfileService } from '../../../api/chat-tutor-profile.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-chat-tutor-profile',
  standalone: true,
  templateUrl: './chat-tutor-profile.component.html',
  styleUrl: './chat-tutor-profile.component.scss',
  imports: [NgIf],
})
export class ChatTutorProfileComponent {}
// export class ChatTutorProfileComponent implements OnInit {
//   data: any;

//   constructor(private chatprofileService: ChatTutorProfileService) {}

//   ngOnInit() {
//     this.chatprofileService.loadData().subscribe((response) => {
//       this.data = response;
//     });
//   }

//   // loadData() {
//   //   this.http.get('https://your-api-url.com/data').subscribe((response) => {
//   //     this.data = response;
//   //   });
//   // }
// }
