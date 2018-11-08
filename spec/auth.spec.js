const fetch = require('isomorphic-fetch');
const seedDB = require('../test/seed');
let cookie = '';

const url = path => `http://localhost:3000${path}`

describe('Validate Backend functionality', (done) => {

    it('should log out current logged in user', (done) => {
        header = new Headers();
        header.append('Content-Type', 'application/json');
        fetch(url('/login'), {
            method: 'POST',
            headers: header,
            body: JSON.stringify({username: "yuan", password: "2"}),
        }).then(res => {
            r = res.headers._headers['set-cookie'][0];
            return r;
            }).then((r) => {
                header = new Headers();
                header.append('Content-Type', 'application/json');
                header.append('cookie', r)
                fetch(url('/logout'), {
                    method: 'PUT',
                    headers: header,
                    body: JSON.stringify({})
            }).then(res => res.json())
            .then(res => {
                expect(res['status']).toBe('OK');
                done();
            })
        });
    })

	it('should login a user and return a cookie with a success msg', (done) => {
        header = new Headers();
        header.append('Content-Type', 'application/json');
        fetch(url('/login'), {
            method: 'POST',
            headers: header,
            body: JSON.stringify({username: 'yuan', password: '2'})
        })
        .then(res => {
            cookie = res.headers._headers['set-cookie'][0]
            return res
        })
        .then((res) => res.json())  
        .then((res) => {
            expect(res['username']).toBe('yuan')
            expect(res['result']).toBe('success')
            done();
        })
 	})

    it('should register new user', (done) => {
        header = new Headers();
        header.append('Content-Type', 'application/json');
        fetch(url('/register'), {
            method: 'POST',
            headers: header,
            body: JSON.stringify({username: "test", email: 'test@test.edu', phone: '123-456-7890', dob: '1998-2-10', zipcode: '12345', password: "2"}),
        }).then(res => res.json())
        .then(res => {
            expect(res.username).toBe('test');
            expect(res.result).toBe('success');
            done()
        })
    })

    it('should get logged in user headline', (done) =>  {
            header = new Headers();
            header.append('Content-Type', 'application/json');
            header.append('cookie', cookie)
            fetch(url('/headline'), {
                method: 'GET',
                headers: header,
        }).then(res => res.json())
        .then(res => {
            expect(res['headline']).toBe('Here is YuanHE');
            done();
        })
    })

    it('should update logged in user headline', (done) => {
            header = new Headers();
            header.append('Content-Type', 'application/json');
            header.append('cookie', cookie);
            fetch(url('/headline'), {
                method: 'PUT',
                headers: header,
                body: JSON.stringify({headline: "this is a test"})
        }).then(res => res.json())
        .then(res => {
            expect(res['username']).toBe('yuan')
            expect(res['headline']).toBe('this is a test');
            done();
        })
    })

    it('should return at least 5 articles if test user is logged in user', (done) => {
            header = new Headers();
            header.append('Content-Type', 'application/json');
            header.append('cookie', cookie)
            fetch(url('/articles'), {
                method: 'GET',
                headers: header,
        }).then(res => res.json())
        .then(res => {
            expect(res['articles'].length).toBe(5);
            done();
        })
    })

    it('should return articles of a specific author or specific post', () => {
            header = new Headers();
            header.append('Content-Type', 'application/json');
            header.append('cookie', cookie)
            fetch(url('/articles'), {
                method: 'GET',
                headers: header,
            }).then(res => res.json())
            .then(res => {
                const id = res.articles[0]._id;
                const text = res.articles[0].body
                header = new Headers();
                header.append('Content-Type', 'application/json');
                header.append('cookie', cookie)
                fetch(url('/articles/' + id), {
                    method: 'GET',
                    headers: header,
            }).then(res => res.json())
            .then(res => {
                expect(res.articles.body).toBe(text)
            })
        })
    })

    it('adding an article for logged in user returns list of articles with new article', (done) => {
            header = new Headers();
            header.append('Content-Type', 'application/json');
            header.append('cookie', cookie)
            fetch(url('/articles'), {
                method: 'GET',
                headers: header
        }).then(res => res.json())
        .then(res => {
            const length1 = res['articles'].length
            header = new Headers();
            header.append('Content-Type', 'application/json');
            header.append('cookie', cookie)
            fetch(url('/article'), {   
                method: 'POST',
                headers: header,
                body: JSON.stringify({text: "this is a test of adding post"})
            }).then(res => res.json())
            .then(res => {
                const length2 = res['articles'].length
                expect(length2 - length1).toBe(1)
                done()
            })  
        })
    });
});