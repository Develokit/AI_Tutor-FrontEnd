import { Component, OnInit } from '@angular/core';
import { SubHeaderComponent } from '../sub-header/sub-header.component';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-detail',
  standalone: true,
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss',
  imports: [SubHeaderComponent, NgIf, NgFor],
})
export class DetailComponent {
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
