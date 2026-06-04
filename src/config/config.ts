
function required(name: string): string {
      const value = import.meta.env[name]
      if (!value) {
            throw new Error(`Missing env: ${name}`)
      }
      return value
}

const appConfig = {
      baseUrl: required('VITE_BASE_URL'),
      backendBaseUrl: required('VITE_BACKEND_BASE_URL'),
      backendPort: {
            auth: parseInt(required('VITE_BACKEND_AUTH_PORT')),
            incomeExpense: parseInt(required('VITE_BACKEND_INEX_PORT')),
            category: parseInt(required('VITE_BACKEND_CATEGORY_PORT')),
            user: parseInt(required('VITE_BACKEND_USER_PORT')),
            analytic: parseInt(required('VITE_BACKEND_ANALYTIC_PORT')),
      },
      firebase: {
            apiKey: required('VITE_FIREBASE_API_KEY'),
            authDomain: required('VITE_FIREBASE_AUTH_DOMAIN'),
            projectId: required('VITE_FIREBASE_PROJECT_ID'),
            storageBucket: required('VITE_FIREBASE_STORAGE_BUCKET'),
            messagingSenderId: required('VITE_FIREBASE_MESSAGING_SENDER_ID'),
            appId: required('VITE_FIREBASE_APP_ID'),
            measurementId: required('VITE_FIREBASE_MEASUREMENT_ID')
      },
}

export default appConfig