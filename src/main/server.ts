import app from '@/main/config/app'
import 'module-alias/register'

app.listen(5000, () => {
  console.log('Server running at http://localhost:5000')
})
