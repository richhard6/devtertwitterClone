const admin = require('firebase-admin')

const serviceAdminCredentials = JSON.parse(
  process.env.FIREBASE_ADMIN_CREDENTIALS
)

try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAdminCredentials),
  })
} catch (e) {
  console.log(e)
}

export const firestore = admin.firestore()
