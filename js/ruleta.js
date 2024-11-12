const options = ["Bono 1", "Bono 2", "Bono 3", "Bono 4"]; // Array de opciones dinámicas
const results = ["Compra de maquillaje", "Compra de ropa", "Compra en Bazar/Chino", "Cena totalmente paga o Comodín"];
const img = ["/img/maquillaje.jpeg", "/img/ropa.jpeg", "/img/bazar.jpg", "/img/cena.jpeg"];
const wheel = document.getElementById('wheel');
const resultDisplay = document.getElementById('result');
const resultContainer = document.querySelector('.result-container'); // Selecciona el contenedor de resultados
const numSegments = options.length;

function createWheel() {
    const angle = 360 / numSegments; // Calcula el ángulo por segmento
    options.forEach((option, index) => {
        const segment = document.createElement('div');
        segment.classList.add('wheel-segment');

        // Colocar cada segmento en su posición con skew para formar el círculo
        segment.style.transform = `rotate(${angle * index}deg) skewY(${90 - angle}deg)`;

        // Asignar color de fondo a cada segmento
        segment.style.backgroundColor = `hsl(${(360 / numSegments) * index}, 50%, 50%)`;

        // Crear un contenedor para el texto, con rotación que sigue la orientación del segmento
        const text = document.createElement('div');
        text.style.transform = `rotate(-${angle / 2}deg) skewY(-${90 - angle}deg)`;
        text.style.display = 'flex';
        text.style.alignItems = 'center';
        text.style.justifyContent = 'center';
        text.style.height = '100%';
        text.style.width = '100%';
        text.textContent = option;

        segment.appendChild(text);
        wheel.appendChild(segment);
    });
}

let currentRotation = 0; // Variable para rastrear la rotación acumulada

function spinWheel() {
    // Generamos una rotación aleatoria
    const randomRotation = Math.floor(Math.random() * 360) + 300;
    currentRotation += randomRotation;

    // Aplicamos la rotación acumulada
    wheel.style.transform = `rotate(${currentRotation}deg)`;

    // Escuchar el evento 'transitionend' en la rueda para mostrar el resultado
    wheel.addEventListener('transitionend', function showResult() {
        // Remover el event listener para evitar múltiples ejecuciones
        wheel.removeEventListener('transitionend', showResult);

        // Calcular el índice ganador
        const anglePerSegment = 360 / numSegments;
        const winningIndex = (numSegments - Math.floor((currentRotation % 360) / anglePerSegment)) % numSegments;

        // Obtener el bono, premio e imagen correspondiente
        const winningOption = options[winningIndex];
        const prize = results[winningIndex];
        const prizeImg = img[winningIndex];

        // Mostrar el bono y el premio en el `resultDisplay`
        resultDisplay.textContent = `Resultado: ${winningOption}`;

        // Insertar el resultado en el contenedor `result-container`
        resultContainer.innerHTML = `
            <h3>${winningOption}</h3>
            <p>${prize}</p>
            <img src="${prizeImg}" alt="${prize}">
        `;
    });
}

// Inicializa la ruleta dinámicamente
createWheel();
