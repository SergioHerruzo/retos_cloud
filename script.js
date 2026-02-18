// Substitueix amb la teva URL d'API Gateway acabada en /prod/contact
const API_URL = 'https://jjjg49h1sk.execute-api.us-east-1.amazonaws.com/prod/contact';

document.querySelector('form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = {
        name: document.getElementById('name').value, // Revisa que els IDs coincideixin amb l'HTML
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };

    console.log("Enviant dades:", data);

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            mode: 'cors', // Forcem mode CORS
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            alert('Missatge enviat correctament!');
            e.target.reset(); // Neteja el formulari
        } else {
            const errorData = await response.json();
            console.error("Error de l'API:", errorData);
            alert('Error al servidor: ' + (errorData.error || 'Desconegut'));
        }
    } catch (error) {
        console.error("Error de xarxa:", error);
        alert('No s\'ha pogut connectar amb el servidor.');
    }
});
