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

(() => {
    'use estrict'
    //Definiciòn de variables
    let deck = [];
    const tipos = ['C', 'D', 'H', 'S'];
    const especiales = ['A', 'J', 'Q', 'K'];
    let puntosJugador = 0, puntosComputadora = 0;



    //Referencias del html

    const btnNewCard = document.querySelector('#btnNewCard');
    const btnStop = document.querySelector('#btnStop');
    const btnNewGame = document.querySelector('#btnNewGame');
    const puntosHTML = document.querySelectorAll('small');
    const divCartasJugador = document.querySelector('#jugador-cartas');
    const divCartasComputadora = document.querySelector('#computadora-cartas');



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
        deck = _.shuffle(deck);
        return deck;
    };

    crearDeck();


    //Esta función permite tomar una carta
    const pedirCarta = () => {
        if (deck.length === 0) {
            throw 'No hay cartas en el deck';
        }
        const carta = deck.pop();
        return carta;
    }


    //Definiciòn del valor de la carta

    const valorCarta = (carta) => {
        const valor = carta.substring(0, carta.length - 1);
        return (valor === 'A') ? 11 :
            (isNaN(valor)) ? 10 : valor * 1;
    }


    //Turno de la Computadora
    const turnoComputadora = (puntosMinimos) => {
        do {
            const carta = pedirCarta();
            puntosComputadora = puntosComputadora + valorCarta(carta);
            puntosHTML[1].innerText = puntosComputadora;
            const imgCard = document.createElement('img');
            imgCard.src = `assets/cartas/${carta}.png`;
            imgCard.classList.add('carta');
            divCartasComputadora.append(imgCard);
            if (puntosMinimos > 21) {
                break;
            }
        } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));

        //Mensaje de Finalizaciòn del Juego

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


    //Eventos

    //Evento Pedir Carta
    btnNewCard.addEventListener('click', () => {
        const carta = pedirCarta();
        puntosJugador = puntosJugador + valorCarta(carta);
        puntosHTML[0].innerText = puntosJugador;
        const imgCard = document.createElement('img');
        imgCard.src = `assets/cartas/${carta}.png`;
        imgCard.classList.add('carta');
        divCartasJugador.append(imgCard);

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
        turnoComputadora(puntosJugador);
    })

    //Evento New Game
    btnNewGame.addEventListener('click', () => {
        console.clear();
        deck = [];
        deck = crearDeck();
        puntosJugador = 0;
        puntosComputadora = 0;
        puntosHTML[0].innerText = 0;
        puntosHTML[1].innerText = 0;
        divCartasComputadora.innerHTML = '';
        divCartasJugador.innerHTML = '';
        btnNewCard.disabled = false;
        btnStop.disabled = false;
    })

})();



