/* Notación de las Cartas
* 2C = Tow of Clubs (Tréboles)
* 2D = Tow of Diamonds (Diamantes)
* 2H = Tow of Hearts (Corazones)
* 2S = Tow of Spades (Picas)
 */

/*    Patrón Módulo
        (()=>{
        'use strict
    })();
*/

const miModulo = (() => {

    'use estrict'

    //Definiciòn de variables
    let
        deck = [],
        puntosJugadores = [];

    const
        tipos = ['C', 'D', 'H', 'S'],
        especiales = ['A', 'J', 'Q', 'K'];


    //Referencias del html
    const
        btnNewCard = document.querySelector('#btnNewCard'),
        btnStop = document.querySelector('#btnStop'),
        btnNewGame = document.querySelector('#btnNewGame'),
        puntosHTML = document.querySelectorAll('small'),
        divCartasJugadores = document.querySelectorAll('.divCartas');


    //Esta función inicializa el juego (Deck)
    const inicializarJuego = (numJugadores = 2) => {
        deck = crearDeck();
        puntosJugadores = [];
        for (let i = 0; i < numJugadores; i++) {
            puntosJugadores.push(0);
        }
        puntosHTML.forEach(elem => elem.innerText = 0);
        divCartasJugadores.forEach(elem => elem.innerHTML = '');
        btnNewCard.disabled = false;
        btnStop.disabled = false;
    }


    //Esta función crea una nueva baraja de cartas
    const crearDeck = () => {
        for (let i = 2; i <= 10; i++) {
            for (let tipo of tipos) {
                deck.push(i + tipo);
            }
        }
        for (let tipo of tipos) {
            for (let esp of especiales) {
                deck.push(esp + tipo)
            }
        }
        return _.shuffle(deck);
    };


    //Esta función permite tomar una carta
    const pedirCarta = () => {
        if (deck.length === 0) {
            throw 'No hay cartas en el deck';
        }
        return deck.pop();
    }


    //Definición del valor de la carta
    const valorCarta = (carta) => {
        const valor = carta.substring(0, carta.length - 1);
        return (valor === 'A') ? 11 :
            (isNaN(valor)) ? 10 : valor * 1;
    }


    //Función de acumulación de puntos (turno 0 = primero jugador - útimo = computadora)
    const acumularPuntos = (carta, turno) => {
        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
        puntosHTML[turno].innerText = puntosJugadores[turno]
        return puntosJugadores[turno];
    }


    //Función para crear una carta nueva para cada jugador
    const crearCarta = (carta, turno) => {
        const imgCard = document.createElement('img');
        imgCard.src = `assets/cartas/${carta}.png`;
        imgCard.classList.add('carta');
        divCartasJugadores[turno].append(imgCard);
    }


    //Mensaje de Finalizaciòn del Juego
    const determinarGanador = () => {

        const [puntosMinimos, puntosComputadora] = puntosJugadores;

        setTimeout(() => {
            if (puntosMinimos > 21 || (puntosComputadora <= 21 && puntosComputadora > puntosMinimos)) {
                alert('Lo siento. La Computadora ha Ganado :(');
            } else if (puntosMinimos === puntosComputadora) {
                alert('Es empate. Nadie Gana.');
            } else if (puntosComputadora > 21) {
                alert('Felicidades! Has Ganado :D');
            }
        }, 100);
    }


    //Turno de la Computadora
    const turnoComputadora = (puntosMinimos) => {
        let puntosComputadora = 0
        do {
            const carta = pedirCarta();
            puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1);
            crearCarta(carta, puntosJugadores.length - 1);
        } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));
        determinarGanador();
    }


    //Eventos

    //Evento Pedir Carta
    btnNewCard.addEventListener('click', () => {
        const carta = pedirCarta();
        const puntosJugador = acumularPuntos(carta, 0);

        crearCarta(carta, 0);

        if (puntosJugador > 21) {
            console.warn('Lo siento mucho, perdiste');
            btnNewCard.disabled = true;
            btnStop.disabled = true;
            turnoComputadora(puntosJugador);
        } else if (puntosJugador === 21) {
            console.warn('21, muy bien');
            btnNewCard.disabled = true;
            btnStop.disabled = true;
            turnoComputadora(puntosJugador);
        }
    })

    //Evento Stop
    btnStop.addEventListener('click', () => {
        console.warn('Turno de la computadora');
        btnNewCard.disabled = true;
        btnStop.disabled = true;
        turnoComputadora(puntosJugadores[0]);
    })

    //Evento New Game
    btnNewGame.addEventListener('click', () => {
        inicializarJuego();
    })

    return {
        nuevoJuego: inicializarJuego
    };

})();