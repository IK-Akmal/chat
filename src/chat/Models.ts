// Типы ролей и статусов сообщения
export type UserRole = "client" | "employee";
export type MessageStatus = "sent" | "delivered" | "read" | "error";

// ChatUser: Участник чата
export class ChatUser {
  id: string;
  name: string;
  role: UserRole;

  constructor(id: string, name: string, role: UserRole) {
    this.id = id;
    this.name = name;
    this.role = role;
  }
}

// ChatMessage: Сообщение
export class ChatMessage {
  id: string;
  content: string;
  formattedContent: string;
  author: ChatUser;
  timestamp: string;
  attachments: string[];
  quotedMessage: ChatMessage | null;
  status: MessageStatus;

  constructor(
    id: string,
    content: string,
    author: ChatUser,
    timestamp: string,
    formattedContent: string,
    attachments: string[] = [],
    quotedMessage: ChatMessage | null = null
  ) {
    this.id = id;
    this.content = content;
    this.formattedContent = formattedContent;
    this.author = author;
    this.timestamp = timestamp;
    this.attachments = attachments;
    this.quotedMessage = quotedMessage;
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
