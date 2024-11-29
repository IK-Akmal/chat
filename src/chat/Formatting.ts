export class Formatter {
  /**
   * Применяет форматирование к тексту.
   * @param content Исходный текст сообщения.
   * @returns Отформатированный текст.
   */
  static applyFormatting(content: string): string {
    let formattedContent = content
      .replace(/\[b\](.*?)\[\/b\]/g, "<strong>$1</strong>") // Жирный текст
      .replace(/\[i\](.*?)\[\/i\]/g, "<em>$1</em>") // Курсив
      .replace(/\[u\](.*?)\[\/u\]/g, "<u>$1</u>") // Подчеркнутый текст
      .replace(/\[m\](.*?)\[\/m\]/g, "<mark>$1</mark>") // маркер
      .replace(/\[link=(.*?)\](.*?)\[\/link\]/g, '<a href="$1">$2</a>'); // Гиперссылки

    // Шаг 2: Обрабатываем [ul] и [li]
    const listPattern = /\[ul\](.*?)\[\/ul\]/gs;
    formattedContent = formattedContent.replace(listPattern, (match) => {
      let listItems = match
        .replace(/\[ul\]/g, "")
        .replace(/\[\/ul\]/g, "")
        .split("[li]")
        .filter((item) => item.trim())
        .map((item) => `<li>${item.replace("[/li]", "")}</li>`)
        .join("");
      return `<ul>${listItems}</ul>`;
    });

    formattedContent = formattedContent
      .split("\n")
      .map((line) => {
        if (line.trim().startsWith("<ul>") || line.trim().startsWith("<li>")) {
          return line;
        }
        return `<p>${line.trim()}</p>`;
      })
      .join("");

    return formattedContent;
  }
}
