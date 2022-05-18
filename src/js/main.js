document.addEventListener("DOMContentLoaded", () => {
    const socket = io("ws://localhost:3000");

    socket.on("recived", (msg) => {
        const p = document.createElement("p");
        p.innerText = `${msg.name}: ${msg.text}`;

        console.log(msg);

        if (msg.image.length > 0) {
            p.innerHTML += `<img src="${msg.image}">`
        }

        document.querySelector("#message-list").appendChild(p);
    })

    document.querySelector("#input-form").addEventListener("submit", (e) => {
        e.preventDefault();

        const name = document.querySelector("#message-name").value;
        const text = document.querySelector("#message-text").value;

        const sendingFunction = (text, name, image = "") => {
            socket.emit("sending", {text, name, image});

            const p = document.createElement("p");
            p.classList.add("self");
            p.innerHTML = `${text}`;

            if (image.length > 0) {
                p.innerHTML += `<img src="${image}">`
            }

            document.querySelector("#message-list").appendChild(p);
        }

        if (document.querySelector("#message-file").files.length > 0) {
            const image = document.querySelector("#message-file").files[0];
            var reader = new FileReader();
            reader.onload = function () {
                const image64 =  "data:image/jpeg;base64," + reader.result.replace("data:", "").replace(/^.+,/, "");
                sendingFunction(text, name, image64);
            }
            reader.readAsDataURL(image);
        } else {
            sendingFunction (text, name);
        }
    })
})