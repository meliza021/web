// class prymaryButton extends HTMLElement{
//     connectedCallback(){
//         this.innerHTML = `<h1> Hola campers<h1/>`  //aca lo estamos creanod como etiqueta h1
        
//     }

// }
// customElements.define(`p-button`, prymaryButton)

class PrimaryButton extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });

        this.button = document.createElement('button');
        this.button.textContent = this.getAttribute('label') || 'valor por defecto';

        const style = document.createElement('style');
        style.textContent = `
            button {
                padding: 10px 20px;
                color: wheat;
                font-size: 16px;
                border: none;
                border-radius: 5px;       
                background-color: black;
                transition: all 0.3s ease;
            }
            button:hover {
                background-color: gray;
                padding: 15px 25px;
            }
        `;

        shadow.append(style, this.button);//
    }

    connectedCallback() {
        console.log("Se conectó el componente");
        this.button.addEventListener('click', () => {
            const event = new CustomEvent('c-click', {
                detail: { message: 'Click desde el web component' },
                bubbles: true, // para que suba en el DOM si quieres capturarlo desde afuera
                composed: true // permite salir del shadow DOM
            });
            this.dispatchEvent(event);
        });
    }

    disconnectedCallback() {
        console.log('Chao componente 👋');
    }

    static get observedAttributes() {
        return ['label'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'label') {
            this.button.textContent = `N: ${newValue} - o: ${oldValue || ''}`;
        }
    }
}

// Esta línea estaba mal: tenía 'p-class' y 'prymaryButton' mal escritos
customElements.define('p-button', PrimaryButton);
