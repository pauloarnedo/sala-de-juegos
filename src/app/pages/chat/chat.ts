import { Component, inject, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ChatService, Message } from '../../services/chat';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth';
@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './chat.html',
  styleUrls: ['./chat.scss']
})
export class Chat implements OnInit, AfterViewChecked {
  @ViewChild('scrollMe') private myScrollContainer!: ElementRef;

  chatService = inject(ChatService);
  authService = inject(AuthService);
  
  messages$: Observable<Message[]>;
  messageControl = new FormControl('');
  currentUserEmail: string | null = null;

  constructor() {
    this.messages$ = this.chatService.getMessages();
  }

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      this.currentUserEmail = user?.email ?? null;
    });
    this.scrollToBottom();
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  sendMessage() {
    const messageText = this.messageControl.value;
    if (messageText && messageText.trim().length > 0) {
      this.chatService.sendMessage(messageText);
      this.messageControl.reset();
    }
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }
  }
}