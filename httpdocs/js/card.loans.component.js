class LoanComponent extends React.Component {
    constructor(data, id) {
        super();
        this.id = id;
        this.accountNumber = data.accountNumber
        this.balance = data.balance;
    }

    render() {
        const element = React.createElement;
        return element('div', { className: 'card mb-2 shadow-sm', id: this.id },
            element('div', { className: 'card-body' },
                element('h5', { className: 'card-title', id: 'card-title' }, 'Total Loans'),
                element('p', { className: 'card-text', id: 'card-text' }, `Account Number: ${this.accountNumber}`),
                element('p', { className: 'card-text bold', id: 'card-text' }, `Balance: ${this.balance}`)
            )
        );
    }
}