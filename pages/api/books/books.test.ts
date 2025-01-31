import {createMocks} from 'node-mocks-http'
import booksHandler from './index'

describe('/api/books', () => {
    it('returns a list of books', async () => {
        const {req, res} = createMocks({
            method: 'GET'
        })

        await booksHandler(req, res)

        expect(res._getStatusCode()).toBe(200)
        expect(JSON.parse(res._getData()))
        expect.arrayContaining([
            expect.objectContaining({
                id: expect.any(Number), 
                title: expect.any(String), 
                author: expect.any(String), 
                price: expect.any(Number),
                stock: expect.any(Number)
            })
        ])
    })
})