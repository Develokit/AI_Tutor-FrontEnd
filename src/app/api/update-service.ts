import { Injectable } from '@angular/core';
import axios from "axios";
import {SharedService} from "./shared.service";

@Injectable({
  providedIn: 'root'
})
export class UpdateService {

  constructor(private sharedService: SharedService) {}

  endpoint : string = 'https://0574-211-40-5-250.ngrok-free.app';

  deleteTutor() {
    const apiUrl = `${this.endpoint}/assistants/asst_Ujv8gDJHALBpl3oND9jibIV1`;
    const config = { headers: { 'ngrok-skip-browser-warning': '69420' } };
    return axios.delete(apiUrl, config);
  }

  enterUpdateTutor() {
     const id = this.sharedService.getId();

    const apiUrl = `${this.endpoint}/assistants/asst_Ujv8gDJHALBpl3oND9jibIV1/info/page`;
    const config = { headers: { 'content-type': 'application/json', 'ngrok-skip-browser-warning': '69420' } };
    return axios.get(apiUrl, config);
  }

  updateImage(img: File){
    const apiUrl = `${this.endpoint}/assistants/asst_Ujv8gDJHALBpl3oND9jibIV1/info/page/img`;
    const config = {headers : {'content-type' : 'multipart/form-data', 'ngrok-skip-browser-warning' : '69420'}};
    const formData = new FormData();
    formData.append('imgFile', img, img.name);

    return axios.put(apiUrl, formData, config);
  }

  updateTutor(instruction: string, name: string, description: string, voice: string,
                  personality: string, speechLevel: string, file1: File, file2: File){
    const apiUrl = `${this.endpoint}/assistants/asst_Ujv8gDJHALBpl3oND9jibIV1/info/page`;
    const config = {headers : {'content-type' : 'multipart/form-data', 'ngrok-skip-browser-warning' : '69420'}};
    const formData = new FormData();
    formData.append('instruction', instruction);
    formData.append('name', name);
    formData.append('description', description);
    formData.append('voice', voice);
    formData.append('personality', personality);
    formData.append('speechLevel', speechLevel);
    formData.append('file1', file1, file1.name);
    formData.append('file2', file2, file2.name);

    return axios.put(apiUrl, formData, config);
  }
}
