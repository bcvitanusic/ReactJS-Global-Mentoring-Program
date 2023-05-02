import MovieListPage from './MovieListPage';
describe('template spec', () => {
	it('passes', () => {
		cy.mount(<MovieListPage />);
	});
});
