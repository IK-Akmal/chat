export class BBCodeParser {
    private static readonly TAGS = {
        b: { openHtml: '<strong>', closeHtml: '</strong>' },
        i: { openHtml: '<em>', closeHtml: '</em>' },
        ul: { openHtml: '<ul>', closeHtml: '</ul>' },
        li: { openHtml: '<li>', closeHtml: '</li>' },
        m: { openHtml: '<div class="marker">• ', closeHtml: '</div>' },
        quote: { openHtml: '<blockquote class="quote">', closeHtml: '</blockquote>' },
    };

    private static readonly LINK_REGEX = /\[link=(.*?)\](.*?)\[\/link\]/g;

    public static parse(text: string): string {
        let formattedText = text;

        // Обработка простых тегов
        Object.entries(this.TAGS).forEach(([tag, html]) => {
            formattedText = formattedText
                .replace(new RegExp(`\\[${tag}\\]`, 'g'), html.openHtml)
                .replace(new RegExp(`\\[/${tag}\\]`, 'g'), html.closeHtml);
        });

        // Обработка ссылок
        formattedText = formattedText.replace(
            this.LINK_REGEX,
            '<a href="$1" target="_blank" rel="noopener noreferrer">$2</a>'
        );

        return formattedText;
    }

    public static stripTags(text: string): string {
        let plainText = text;

        // Удаление простых тегов
        Object.entries(this.TAGS).forEach(([tag]) => {
            plainText = plainText
                .replace(new RegExp(`\\[${tag}\\]`, 'g'), '')
                .replace(new RegExp(`\\[/${tag}\\]`, 'g'), '');
        });

        // Удаление ссылок (оставляем только текст)
        plainText = plainText.replace(this.LINK_REGEX, '$2');

        return plainText;
    }
}
