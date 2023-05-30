import Counter from './Counter';

describe('<Counter>', () => {
	it('checks if correct value displays as a prop', () => {
		cy.mount(<Counter num={5} />);
		cy.get('p').should('have.text', '5');
	});

	it('checks if increments value', () => {
		cy.mount(<Counter num={5} />);
		cy.get('button').contains('Increment').click();
		cy.get('p').should('have.text', '6');
	});

	it('checks if decrements value', () => {
		cy.mount(<Counter num={5} />);
		cy.get('button').contains('Decrement').click();
		cy.get('p').should('have.text', '4');
	});
});
