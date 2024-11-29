import { ChatUser } from "./chat/Models";
import { ChatManager } from "./chat/ChatManager";

const chatManager = new ChatManager();

// Создаем пользователей
const client = new ChatUser("user1", "User name", "client");
const employee = new ChatUser("user2", "Employee name", "employee");

// Создаем диалог
const dialog = chatManager.createDialog([client, employee]);
// Пример 1: Простое сообщение
const message1 = chatManager.sendMessage(
  dialog.id,
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel nisl et ipsum ultrices pharetra.",
  client
);
console.log("Простое сообщение:", message1.formattedContent);

// Пример 2: Сообщение с жирным и курсивным текстом
const message2 = chatManager.sendMessage(
  dialog.id,
  "[b]Lorem ipsum dolor[/b] sit amet, [i]consectetur adipiscing elit[/i]. Vivamus luctus urna sed urna ultricies ac tempor dui sagittis.",
  employee
);
console.log("Сообщение с форматированием:", message2.formattedContent);

// Пример 3: Список с маркером
const message3 = chatManager.sendMessage(
  dialog.id,
  "[b]Tasks to complete:[/b]\n[m]Lorem ipsum dolor sit amet[/m]",
  employee
);
console.log("Сообщение с маркерами:", message3.formattedContent);

// Пример 4: Гиперссылки
const message4 = chatManager.sendMessage(
  dialog.id,
  "More details can be found at [link=https://example.com]this link[/link].",
  employee
);
console.log("Сообщение с ссылкой:", message4.formattedContent);

// Пример 5: Цитирование сообщения
const quotedMessage = chatManager.sendMessage(
  dialog.id,
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  client
);
const message5 = chatManager.sendMessage(
  dialog.id,
  "Quoting your message: [b]Lorem ipsum dolor sit amet, consectetur adipiscing elit[/b]. Please confirm the details.",
  employee,
  quotedMessage
);
console.log("Сообщение с цитированием:", message5.formattedContent);

// Пример 6: Сообщение с вложениями
const message6 = chatManager.sendMessage(
  dialog.id,
  "Attached document contains project details. Lorem ipsum dolor sit amet.",
  client,
  null,
  ["project-details.pdf"]
);
console.log("Сообщение с вложениями:", message6);

// Пример 7: Комбинированное сообщение
const message7 = chatManager.sendMessage(
  dialog.id,
  "[b]Project Overview:[/b]\n [ul]\n[li]Lorem ipsum dolor sit amet[/li]\n[li]Consectetur adipiscing elit[/li]\n[li]Nulla vel nisl et ipsum ultrices pharetra[/li]\n [/ul]\n[link=https://example.com]Click here for more information[/link]",
  employee
);
console.log("Комбинированное сообщение:", message7.formattedContent);

// Пример 8: Поиск по тексту
const foundMessages = dialog.searchMessages("Project Overview:");

console.log("Поиск:", foundMessages);
