const fetch = require('isomorphic-fetch');

const url = path => `http://localhost:3000${path}`

describe('Validate Backend functionality', () => {

	it('should login a user and return a cookie with a success msg', (done) => {
        header = new Headers();
        header.append('Contend-Type', 'application/json');
        fetch(url('/login'), {
            method: 'POST',
            headers: header,
            body: JSON.stringify({username: 'yuan', password: '2'})
        })
        .then((res) => res.json())  
        .then((res) => {
            expect(res['username']).toBe('yuan')
            expect(res['result']).toBe('success')
            done();
        })
 	})

	// it('should log out current logged in user', (done) => {
    //     header = new Headers();
    //     header.append('Contend-Type', 'application/json');
    //     fetch(url('/login'), {
    //         method: 'POST',
    //         headers: header,
    //         body: JSON.stringify({username: "yuan", password: "2"})
    //     }).then(res => res.json())
    //     .then(() => {
    //         fetch(url('/logout'), {
    //             method: 'PUT',
    //             headers: header,
    //             body: JSON.stringify({})
    //     }).then(res => res.json())
    //     .then(res => {
    //         expect(res['status']).toBe('OK');
    //         done();
    //     })
    //  })
    // });

	// it('should return an article with a specified id', (done) => {
	// 	// call GET /articles first to find an id, perhaps one at random
	// 	// then call GET /articles/id with the chosen id
    //     // validate that only one article is returned
    //     header = new Headers();
    //     header.append('Contend-Type', 'application/json');
    //     fetch(url('/article/2'), {
    //         method: 'get',
    //         headers: header,
    //     }).then(res => res.json())
    //     .then(res => {
    //         expect(res['id']).toBe(2)
    //         done()
    //     })
	// })

	// it('should return nothing for an invalid id', (done) => {
	// 	// call GET /articles/id where id is not a valid article id
	// 	// confirm that you get no results
    //     header = new Headers();
    //     header.append('Contend-Type', 'application/json');
    //     fetch(url('/article/100'), {
    //         method: 'get',
    //         headers: header,
    //     }).then(res => res.json())
    //     .then(res => {
    //         expect(res).toBeNull();
    //         done();
    //     })
	// })

});