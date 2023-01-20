import 'module-alias/register'

import { MongoHelper } from '@/external/repositories/mongodb/helper'

MongoHelper.connect('mongodb://localhost')
  .then(async () => {
    const app = (await import('./config/app')).default
    app.listen(process.env.PORT || 5000, () => {
      console.log('Server running at http://localhost:5000')
    })
  })
  .catch(console.error)
