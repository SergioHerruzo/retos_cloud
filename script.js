// Substitueix amb la teva "Invoke URL" de l'API Gateway d'AWS Academy
const API_URL = 'https://jjjg49h1sk.execute-api.us-east-1.amazonaws.com/prod/contact';

const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const statusDiv = document.getElementById('status');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // UI Feedback inicial
    submitBtn.disabled = true;
    submitBtn.innerText = 'Enviant dades...';
    statusDiv.className = ''; 
    statusDiv.style.display = 'none';

    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            mode: 'cors', // Necessari per a API Gateway
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            statusDiv.innerText = "S'ha guardat a DynamoDB amb èxit! ✅";
            statusDiv.classList.add('success');
            contactForm.reset();
        } else {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error en la resposta');
        }
    } catch (err) {
        console.error("Error d'enviamment:", err);
        statusDiv.innerText = "Error: Comprova el LabRole o el CORS.";
        statusDiv.classList.add('error');
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerText = 'Enviar Missatge';
    }
});
