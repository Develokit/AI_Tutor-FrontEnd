import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class DetailProfileService {
  //임시 assistantId입니다. 나중에 수정해야함!
  assistantId: string = 'asst_NZnoXNEXyDSvvSy79AWYX2aP';
  endpoint: string = 'https://0574-211-40-5-250.ngrok-free.app/'; // API URL

  fetchProfile() {
    const apiUrl = `${this.endpoint}assistants/${this.assistantId}/info`;
    const config = {
      headers: {
        'content-type': 'application/json',
        'ngrok-skip-browser-warning': '69420',
      },
    };
    return axios.get(apiUrl, config);
  }
}
