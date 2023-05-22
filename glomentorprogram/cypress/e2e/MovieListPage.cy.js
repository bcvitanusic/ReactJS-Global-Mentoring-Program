context('MovieList', () => {
	beforeEach(() => {
		cy.visit('http://localhost:3000');
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
			expect(response.body.data).length.to.be.greaterThan(0);
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
	it('tests if search is located in url', () => {
		cy.request({
			method: 'GET',
			url: 'http://localhost:4000/movies?&searchBy=title',
			qs: {
				search: 'coco',
			},
		}).then((res) => {
			expect(res.body.data.length).to.equal(2);
		});
	});
	it('test get one movie', () => {
		cy.request({
			method: 'GET',
			url: 'http://localhost:4000/movies/354912',
		}).then((res) => {
			expect(res.body.title).to.equal('Coco');
		});
	});
	it('adds movie to database', () => {
		cy.request('POST', 'http://localhost:4000/movies', {
			title: 'Treci',
			overview: 'treci',
			vote_average: 5,
			runtime: 123,
			release_date: '2022-02-02',
			poster_path: 'https://ttt.ttt.ttt',
			genres: ['Comedy'],
		}).then((res) => {
			expect(res.body.title).to.equal('Treci');
		});
	});
	it('updates movie in database', () => {
		cy.request('PUT', 'http://localhost:4000/movies', {
			title: 'Treci Drugi',
			overview: 'treci',
			vote_average: 5,
			runtime: 123,
			release_date: '2022-02-02',
			poster_path: 'https://ttt.ttt.ttt',
			genres: ['Comedy'],
			id: 313369,
		}).then((res) => {
			expect(res.body.title).to.equal('Treci Drugi');
		});
	});
	it('checks if opens emtpy dialog', () => {
		cy.get('[aria-label="add-movie-button"]').click();
		cy.get('[data-testid="movie-form"]').should('be.visible');
		cy.get('#title').should('not.have.value');
		cy.get('#releaseDate').should('not.have.value');
		cy.get('#movieUrl').should('not.have.value');
		cy.get('#rating').should('not.have.value');
	});
	it('checks if opens edit dialog with movie info', () => {
		cy.visit('/424785');
		cy.url().should('include', '/424785');
		cy.get('[data-testid="movie-details"]').should('be.visible');
		cy.get('[aria-label=edit-movie]').click();
	});
});
