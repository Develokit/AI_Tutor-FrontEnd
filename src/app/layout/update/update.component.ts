import {Component, OnInit} from '@angular/core';
import { MatChipsModule } from "@angular/material/chips";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import { UpdateService } from '../../api/update-service';
import {Router} from "@angular/router";
import {HomeService} from "../../api/home-service";

@Component({
  selector: 'app-update',
  standalone: true,
  imports: [
    MatChipsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './update.component.html',
  styleUrl: './update.component.scss'
})
export class UpdateComponent implements OnInit {
  uploadedImage: string | undefined;
  isImageUploaded: boolean = false; // 이미지 업로드 상태
  isFileUploaded: boolean = false; // 파일 업로드 상태
  isFileUploaded2: boolean = false; // 파일 업로드 상태
  fileName1 ='';
  fileName2 ='';
  files: File[] = [];
  file1: File | null = null; // 첫 번째 파일을 위한 속성
  file2: File | null = null; // 두 번째 파일을 위한 속성
  imgFile: File | null = null;
  instruction: string = '';
  name: string = '';
  description: string = '';
  voice: string = '';
  personality: string = '';
  speechLevel: string = '';


  updateForm: FormGroup = new FormGroup({
    imgFile: new FormControl(null, [Validators.required]),
    name: new FormControl('', [Validators.required]),
    instruction: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    // 파일 1, 2는 업로드 처리 필요
    file1: new FormControl(null),
    file2: new FormControl(null),
    personality: new FormControl([], [Validators.required]),
    voice: new FormControl([], [Validators.required]),
    speechLevel: new FormControl([], [Validators.required]),
  });

  constructor(private router: Router, private updateService: UpdateService) { }

  ngOnInit() {
    this.updateService.enterUpdateTutor()
      .then(response => {
        console.log(JSON.stringify(response.data, null, 2));
        console.log(this.updateForm.value);
        if (response && response.data) {
          const data = response.data; // 백엔드에서 받은 데이터
          this.updateForm.patchValue({
            name: data.name,
            instruction: data.instruction,
            description: data.description,
            personality: data.personality,
            voice: data.voice,
            speechLevel: data.speechLevel,
            // ... 다른 필드들
          });

          this.uploadedImage = data.img; // 이미지 URL
          this.isImageUploaded = true;

          // fileNames 배열 처리
          if (data.fileNames && data.fileNames.length > 0) {
            this.fileName1 = data.fileNames[0];
            this.isFileUploaded = true;

            if (data.fileNames.length > 1) {
              this.fileName2 = data.fileNames[1];
              this.isFileUploaded2 = true;
            }
          }

          console.log(this.updateForm.value); // 이제 업데이트된 값을 확인할 수 있음
        } else {
          console.log('No data available');
        }
      }).catch(error => {
      console.error('Error fetching data in component: ', error);
    });
  }



  submitForm(): void {
    // if (this.updateForm.invalid) {
    //   alert("모든 필수 사항을 입력해주세요.");
    //   return;
    // }
    // console.log('Form submitted');

    const formData = this.updateForm.value;

    console.log(this.updateForm.value);

    this.updateService.updateImage(

      formData.imgFile // 또는 this.imgFile (이미지 파일)

    ).then(response => {
      console.log('Response:', response);
    }).catch(error => {
      console.error('Error:', error);
    });

    this.updateService.updateTutor(

      formData.instruction, // 사용자가 입력한 지침
      formData.name, // 사용자가 입력한 이름
      formData.description, // 사용자가 입력한 설명
      formData.voice, // 사용자가 선택한 음성
      formData.personality, // 사용자가 선택한 성격
      formData.speechLevel, // 사용자가 선택한 존대말 여부
      formData.file1,
      formData.file2

    ).then(response => {
      console.log('Response:', response);
    }).catch(error => {
      console.error('Error:', error);
    });
  }

  deleteForm(): void {
    console.log('Form deleted');

    this.updateService.deleteTutor()
      .then(response => {
      // 요청이 성공적으로 완료되었을 때
      console.log('Delete response:', response);
      alert("삭제되었습니다.");
      this.router.navigate(['']);
    }).catch(error => {
      // 오류가 발생했을 때
      console.error('Delete error:', error);
      alert("삭제에 실패했습니다.");
    });
  }

  onFileSelected(event: any) {

    const file = event.target.files[0];

    if (file) {
      this.imgFile = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.uploadedImage = e.target.result;
        this.isImageUploaded = true;
      };

      reader.readAsDataURL(file);
    }
  }
  onFileSelect(event: any): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      if (file) { // file이 존재하는지 확인
        this.file1 = file; // 첫 번째 파일 객체 저장
        this.fileName1 = file.name;
        this.isFileUploaded = true;
      }
    }
  }

  deleteFile1(): void {
    this.file1 = null; // 파일 객체 초기화
    this.fileName1 = ''; // 파일 이름 초기화
    this.isFileUploaded = false; // 업로드 상태 초기화
  }

  onFileSelect2(event: any): void {
    if (event.target.files.length > 0) {
      this.file2 = event.target.files[0]; // 두 번째 파일 객체 저장
      // @ts-ignore
      this.fileName2 = this.file2.name;
      this.isFileUploaded2 = true;
    }
  }

  deleteFile2(event: MouseEvent): void {
    this.file2 = null; // 파일 객체 초기화
    this.fileName2 = ''; // 파일 이름 초기화
    this.isFileUploaded2 = false; // 업로드 상태 초기화
  }

  getImgFile(): FormControl {
    return this.updateForm.get('imgFile') as FormControl
  }

  getName(): FormControl {
    return this.updateForm.get('name') as FormControl
  }

  getExplain(): FormControl {
    return this.updateForm.get('instruction') as FormControl
  }

  getRule(): FormControl {
    return this.updateForm.get('description') as FormControl
  }

  getPersonality(): FormControl {
    return this.updateForm.get('personality') as FormControl
  }

  getVoice(): FormControl {
    return this.updateForm.get('voice') as FormControl
  }

  getAccent(): FormControl {
    return this.updateForm.get('speechLevel') as FormControl
  }
}
