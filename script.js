document.addEventListener("DOMContentLoaded", () => {

    // 1. Тема сайту
    const themeBtn = document.getElementById("themeBtn");

    function autoTheme() {
        const currentHour = new Date().getHours();
        if (currentHour >= 7 && currentHour < 21) {
            document.body.classList.remove("dark");
        } else {
            document.body.classList.add("dark");
        }
    }
    autoTheme();

    if (themeBtn) {
        themeBtn.addEventListener("click", () => {
            document.body.classList.toggle("dark");
        });
    }

    // 2. LocalStorage та футер
    localStorage.setItem("browser", navigator.userAgent);
    localStorage.setItem("language", navigator.language);
    localStorage.setItem("platform", navigator.platform);

    const footer = document.getElementById("footer");
    if (footer) {
        footer.innerHTML = "";
        for (let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i);
            let value = localStorage.getItem(key);
            footer.innerHTML += `<p><strong>${key}:</strong> ${value}</p>`;
        }
    }

    // 3. Динамічні коментарі (Варіант 14)
    fetch("https://jsonplaceholder.typicode.com/posts/14/comments")
        .then(res => res.json())
        .then(data => {
            const commentsDiv = document.getElementById("comments");
            if (commentsDiv) {
                commentsDiv.innerHTML = "";
                data.forEach(comment => {
                    commentsDiv.innerHTML += `
                        <div class="comment">
                            <h4>${comment.name}</h4>
                            <p>${comment.body}</p>
                            <small>${comment.email}</small>
                        </div>
                    `;
                });
            }
        })
        .catch(err => console.error(err));

    // 4. Модальне вікно зворотнього зв'язку (через 3 секунди)
    setTimeout(() => {
        showModalForm();
    }, 3000);

    function showModalForm() {
        const overlay = document.createElement("div");
        overlay.id = "modalOverlay";

        // Заміни "xbjnywzq" на свій унікальний ID з особистого кабінету Formspree
        const formspreeId = "xbjnywzq";

        overlay.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <h3>Зворотній зв'язок</h3>
                <form action="https://formspree.io/f/${formspreeId}" method="POST">
                    <label>Ім'я: <input type="text" name="name" required></label>
                    <label>Email: <input type="email" name="email" required></label>
                    <label>Телефон: <input type="tel" name="phone" required></label>
                    <label>Повідомлення: <textarea name="message" required></textarea></label>
                    <button type="submit">Відправити</button>
                </form>
            </div>
        `;

        document.body.appendChild(overlay);

        overlay.querySelector(".close-modal").addEventListener("click", () => {
            overlay.remove();
        });
    }
});