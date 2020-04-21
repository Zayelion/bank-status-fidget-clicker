class Application {
    constructor() {
        if (window.application) {
            // Singleton pattern.
            return window.application;
        }



        this.state = {
            subprotocol: 'android',
            cards: React.createElement('div'),
            navs: {
                android: '',
                iOs: ''
            }
        }
        this.root = document.getElementById('cards');
        this.connect();
    }

    render() {
        ReactDOM.render(this.state.cards, this.root);
    }

    onmessage(message) {
        const element = React.createElement;
        const data = JSON.parse(message.data);
        console.log(data);
        const cards = data.map((card, i) => {
            switch (card.type) {
                case 'checking':
                    return new CheckingComponent(card, i).render();
                case 'savings':
                    return new SavingsComponent(card, i).render();
                case 'credit':
                    return new CreditComponent(card, i).render();
                case 'loans':
                    return new LoanComponent(card, i).render();
            }
        });
        this.state.cards = element('div', { className: 'container' },
            element('div', { className: 'card-deck text-center' }, cards));
        this.render();
    }

    swithEndpoint(id) {
        this.connection.close();
        this.state.subprotocol = id;
        this.connect();
    }

    close() {
        console.log('connection closed');
    }

    open() {
        console.log('Connected to server');
    }

    error() {
        console.log('Connection error');
    }

    connect() {
        const protocol = (location.protocol === 'https:') ? 'wss://' : 'ws://';
        this.connection = new WebSocket((protocol + location.host) + '/' + this.state.subprotocol);
        this.connection.onopen = this.open.bind(this);
        this.connection.onclose = this.close.bind(this);
        this.connection.onerror = this.error.bind(this);
        this.connection.onmessage = this.onmessage.bind(this);
    }
}


window.application = new Application();
