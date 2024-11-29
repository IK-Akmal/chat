import { ChatDialog, ChatMessage, ChatUser } from "./Models";
import { Formatter } from "./Formatting";

export class ChatManager {
  private dialogs: ChatDialog[];
  private notificationHandler:
    | ((dialogId: string, message: ChatMessage) => void)
    | null;

  constructor() {
    this.dialogs = [];
    this.notificationHandler = null;
  }

  createDialog(participants: ChatUser[]): ChatDialog {
    const dialogId = `dialog-${Date.now()}`;
    const dialog = new ChatDialog(dialogId, participants);
    this.dialogs.push(dialog);
    return dialog;
  }

  getDialogById(dialogId: string): ChatDialog | undefined {
    return this.dialogs.find((dialog) => dialog.id === dialogId);
  }

  sendMessage(
    dialogId: string,
    content: string,
    author: ChatUser,
    quotedMessage: ChatMessage | null = null,
    attachments: string[] = []
  ): ChatMessage {
    const dialog = this.getDialogById(dialogId);
    if (!dialog) throw new Error(`Диалог с ID ${dialogId} не найден`);

    const messageId = `msg-${Date.now()}`;
    const timestamp = new Date().toISOString();
    const formattedContent = Formatter.applyFormatting(content);
    const message = new ChatMessage(
      messageId,
      content,
      author,
      timestamp,
      formattedContent,
      attachments,
      quotedMessage
    );

    dialog.addMessage(message);
    this.notifyNewMessage(dialog.id, message);

    return message;
  }

  setNotificationHandler(
    handler: (dialogId: string, message: ChatMessage) => void
  ): void {
    this.notificationHandler = handler;
  }

  private notifyNewMessage(dialogId: string, message: ChatMessage): void {
    if (this.notificationHandler) {
      this.notificationHandler(dialogId, message);
    }
  }
}
