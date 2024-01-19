import { Component, OnInit } from '@angular/core';
import { SubHeaderComponent } from '../sub-header/sub-header.component';
import { NgFor, NgIf } from '@angular/common';
import { DetailProfileService } from '../../api/detail-profile.service';

@Component({
  selector: 'app-detail',
  standalone: true,
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss',
  imports: [SubHeaderComponent, NgIf, NgFor],
})
export class DetailComponent {
  constructor(private detailprofileService: DetailProfileService) {}

  name: string = '';
  img: string = '';
  description: string = '';
  personality: string = '';
  speechlevel: string = '';
  voice: string = '';

  ngOnInit() {
    this.detailprofileService
      .fetchProfile()
      .then((response) => {
        this.name = response.data.name; // response.data 객체에서 name 속성을 추출하여 컴포넌트의 name 변수에 할당
        this.img = response.data.img;
        this.description = response.data.description;
        this.personality = response.data.personality;
        this.speechlevel = response.data.speechlevel;
        this.voice = response.data.voice;
      })
      .catch((error) => {
        console.error('에러 메시지 : ' + error);
      });
  }

  // 해당 부분 튜터 프로필 사진 출력을 위한 api 연결 코드 test
  // export class DetailComponent implements OnInit {
  // imageUrl: string | null = null;
  // constructor(private imageService: ImageService) {}
  // ngOnInit() {
  //   this.imageService.getImageUrl().subscribe((url) => {
  //     this.imageUrl = url;
  //   });
  // }
}
