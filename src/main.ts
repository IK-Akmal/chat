import { type ChatMessage, ChatUser } from "./chat/Models";
import { ChatManager } from "./chat/ChatManager";

// Настраиваем обработчик уведомлений
const notificationHandler = (dialogId: string, message: ChatMessage) => {
    console.log(`Новое сообщение в диалоге ${dialogId} от ${message.author.name}`);
};

const chatManager = new ChatManager();
chatManager.setNotificationHandler(notificationHandler);

// Создаем пользователей
const client = new ChatUser("client-1", "Иван Петров", "client");
const employee = new ChatUser("emp-1", "Мастер Алексей", "employee");

// Создаем диалог
const dialog = chatManager.createDialog([client, employee]);

// Подписываемся на уведомления диалога
dialog.subscribe((notification) => {
    switch (notification.type) {
        case 'newMessage':
            console.log(`Диалог ${notification.dialogId}: Новое сообщение от ${notification.message?.author.name}`);
            break;
        case 'statusChange':
            console.log(`Диалог ${notification.dialogId}: Статус сообщения изменен на ${notification.message?.status}`);
            break;
    }
});

// Клиент пишет первое сообщение
const clientFirstMessage = chatManager.sendMessage(
    dialog.id,
    "Здравствуйте! Подскажите, пожалуйста, когда будет готова моя Тойота Камри? Номер заказа 123-456",
    client
);

// Сообщение прочитано сотрудником
dialog.updateMessageStatus(clientFirstMessage.id, "read");
console.log(`Статус сообщения клиента: ${clientFirstMessage.status}`);

// Сотрудник отвечает с цитированием
chatManager.sendMessage(
    dialog.id,
    "[b]Добрый день, Иван![/b]\nПо вашему обращению:\n" +
    "Я сейчас посмотрю информацию по вашему заказу.",
    employee,
    clientFirstMessage // Добавляем цитирование
);

// Сотрудник отправляет информацию о работах с фотографиями
const workReportMessage = chatManager.sendMessage(
    dialog.id,
    "[b]По вашему автомобилю выполнены следующие работы:[/b]\n" +
    "[ul]" +
    "[li]Замена масла в двигателе[/li]" +
    "[li]Диагностика ходовой части[/li]" +
    "[li]Замена тормозных колодок[/li]" +
    "[/ul]\n" +
    "Машина будет готова [i]через 30 минут[/i].\n" +
    "Прикрепляю фотографии выполненных работ:",
    employee,
    null,
    ["brake-replacement.jpg", "oil-change.jpg", "diagnostic-report.pdf"] // Добавляем вложения
);

// Клиент получил сообщение с отчетом
dialog.updateMessageStatus(workReportMessage.id, "delivered");
console.log(`Статус сообщения с отчётом: ${workReportMessage.status}`);

// Клиент спрашивает про стоимость
chatManager.sendMessage(
    dialog.id,
    "Спасибо за информацию и фотографии! А сколько будет стоить ремонт?",
    client
);

// Сотрудник отправляет важную информацию
const paymentMessage = chatManager.sendMessage(
    dialog.id,
    "[b]Стоимость работ:[/b]\n" +
    "[m]Общая сумма: 12 500 000 суммов[/m]\n\n" +
    "Оплатить можно картой или наличными. Подробный список цен на услуги можно посмотреть здесь: " +
    "[link=https://example.com/prices]прайс-лист[/link]",
    employee
);

// Клиент прочитал информацию об оплате
dialog.updateMessageStatus(paymentMessage.id, "read");

// Клиент цитирует сумму в ответе
chatManager.sendMessage(
    dialog.id,
    "Хорошо, я подъеду через 40 минут с картой. Сумма: [b]12 500 000 сумм[/b]",
    client,
    paymentMessage // Цитируем сообщение о стоимости
);

// Сотрудник прощается
const finalMessage = chatManager.sendMessage(
    dialog.id,
    "Отлично! Будем ждать вас. [m]Не забудьте, пожалуйста, паспорт для оформления документов.[/m]",
    employee
);

// Проверяем статусы сообщений
console.log("\nСтатусы сообщений:");
[clientFirstMessage, workReportMessage, paymentMessage, finalMessage].forEach(msg => {
    console.log(`${msg.author.name}: ${msg.content.slice(0, 20)}... - ${msg.status}`);
});

// Поиск сообщений про стоимость
console.log("\nПоиск сообщений про стоимость:");
const searchResults = dialog.searchMessages("стоимость");
searchResults.forEach(message => {
    console.log(`${message.author.name}: ${message.content}`);
});
