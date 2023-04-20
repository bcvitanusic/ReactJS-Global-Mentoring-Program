context('MovieList', () => {
	it('loads', () => {
		cy.visit('/');
	});
	it('loads list of movies', () => {
		it('gets a list of movies', () => {
			cy.request(
				'GET',
				'http://localhost:4000/movies?sortBy=release_date&sortOrder=desc'
			).then((response) => {
				expect(response.status).to.eq(200);
				expect(response.body.data).length.to.be.greaterThan(1);
			});
		});
	});
	it('returns search results', () => {
		cy.request(
			'GET',
			'http://localhost:4000/movies?search=coco&searchBy=title'
		).then((response) => {
			expect(response.status).to.eq(200);
			expect(response.body.data).length.to.be.greaterThan(1);
		});
	});
	it('sorts by genre: comedy', () => {
		cy.request(
			'GET',
			'http://localhost:4000/movies?searchBy=title&filter=comedy'
		).then((response) => {
			expect(response.status).to.eq(200);
			expect(response.body.data).length.to.be.greaterThan(1);
		});
	});
});
