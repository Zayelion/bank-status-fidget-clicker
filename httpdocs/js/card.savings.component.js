class SavingsComponent extends React.Component {
    constructor(id) {
        super();
        this.id = id;
    }

    render() {
        const element = React.createElement;
        return element('div', { className: 'card mb-2 shadow-sm', id: this.id },
            element('div', { className: 'card-body' },
                element('h5', { className: 'card-title', id: 'card-title' }, 'Savings Acount Balance'),
                element('ph5', { className: 'card-text', id: 'card-text' }, 'card text')
            )
        );
    }
}