import app from '@/main/config/app'
import request from 'supertest'

describe('Body parser middleware', () => {
  test('should parse body as json', async () => {
    app.post('/test_body_parser', (request, response) => {
      response.send(request.body)
    })

    await request(app)
      .post('/test_body_parser')
      .send({ name: 'Fulano' })
      .expect({ name: 'Fulano' })
  })
})
