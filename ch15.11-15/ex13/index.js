document.getElementById('form').addEventListener('submit', async (e) => {
    e.preventDefault();
    sendMessage();
});

async function sendMessage() {
    const input = document.getElementById('inputMessage');
    const messages = document.getElementById('chat-messages');
    const message = document.createElement('p');
    message.className = "selfMessage";
    const answer = document.createElement('p');
    answer.className = "chatAnswer";
    const content = input.value;
    message.textContent = content;
    messages.appendChild(message);
    messages.appendChild(answer);
    input.value = '';

    const url = "http://localhost:11434/api/chat"
    const obj = {
        "model": "gemma:2b",
        "messages": [{
            "role": "user",
            "content": content,
        }],
    }
    let result = "";
    try {
        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(obj),
        });
        const reader = response.body.getReader();
        while (true) {
            const { done, value } = await reader.read();
            if (done) {
                console.log("出力完了")
                return
            };
            const dec = new TextDecoder('utf-8')
            result += JSON.parse(dec.decode(value)).message.content;
            answer.textContent = result;
        }
    } catch (e) {

    }

}