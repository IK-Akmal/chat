
// Интерфейс для уведомлений
export interface IChatNotification {
  type: 'newMessage' | 'statusChange';
  dialogId: string;
  message?: ChatMessage;
  timestamp: string;
}

// Типы ролей и статусов сообщения
export type UserRole = "client" | "employee";
export type MessageStatus = "sent" | "delivered" | "read" | "error";

// ChatUser: Участник чата
export class ChatUser {
  constructor(public id: string, public name: string, public role: UserRole) {}
}

// ChatMessage: Сообщение
export class ChatMessage {
  status: MessageStatus;

  constructor(
    public id: string,
    public content: string,
    public author: ChatUser,
    public timestamp: string,
    public formattedContent: string,
    public attachments: string[] = [],
    public quotedMessage: ChatMessage | null = null
  ) {
    this.status = "sent";
  }
}

// ChatDialog: Диалог
export class ChatDialog {
  id: string;
  participants: ChatUser[];
  messages: ChatMessage[];
  private subscribers: ((notification: IChatNotification) => void)[] = [];

  constructor(id: string, participants: ChatUser[]) {
    this.id = id;
    this.participants = participants;
    this.messages = [];
  }

  addMessage(message: ChatMessage): void {
    this.messages.push(message);
    this.notifySubscribers({
      type: 'newMessage',
      dialogId: this.id,
      message: message,
      timestamp: new Date().toISOString()
    });
  }

  updateMessageStatus(messageId: string, status: MessageStatus): void {
    const message = this.messages.find(m => m.id === messageId);
    if (message) {
      message.status = status;
      this.notifySubscribers({
        type: 'statusChange',
        dialogId: this.id,
        message: message,
        timestamp: new Date().toISOString()
      });
    }
  }

  subscribe(callback: (notification: IChatNotification) => void): void {
    this.subscribers.push(callback);
  }

  unsubscribe(callback: (notification: IChatNotification) => void): void {
    this.subscribers = this.subscribers.filter(sub => sub !== callback);
  }

  private notifySubscribers(notification: IChatNotification): void {
    this.subscribers.forEach(callback => callback(notification));
  }

  searchMessages(query: string): ChatMessage[] {
    return this.messages.filter((msg) => msg.content.toLowerCase().includes(query.toLowerCase()));
  }
}
