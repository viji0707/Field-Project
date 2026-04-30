const form = document.getElementById("contactForm");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        message: document.getElementById("message").value
    };

    console.log("Sending:", data);

    try {
        const res = await fetch("http://127.0.0.1:3001/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await res.json();
        alert(result.message);

        form.reset();

    } catch (error) {
        console.error(error);
        alert("Server not working");
    }
});