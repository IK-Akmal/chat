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

  constructor(id: string, participants: ChatUser[]) {
    this.id = id;
    this.participants = participants;
    this.messages = [];
  }

  addMessage(message: ChatMessage): void {
    this.messages.push(message);
  }

  searchMessages(query: string): ChatMessage[] {
    return this.messages.filter((msg) => msg.content.includes(query));
  }
}
