import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ChatService, Message } from '../../services/chat';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './chat.html',
  styleUrl: './chat.scss'
})
export class Chat {
  chatService = inject(ChatService);
  messages$: Observable<Message[]>;
  messageControl = new FormControl('');

  constructor() {
    this.messages$ = this.chatService.getMessages();
  }

  sendMessage() {
    const messageText = this.messageControl.value;
    if (messageText && messageText.trim().length > 0) {
      this.chatService.sendMessage(messageText);
      this.messageControl.reset();
    }
  }
}