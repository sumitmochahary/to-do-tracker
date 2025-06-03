import { BrowserRouter as Router } from "react-router";
import AppRoutes from "./routes/AppRoutes.jsx";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./components/ErrorFallback.jsx";

function App() {

  return (
    <Router>
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onError={(error, info) => {
          console.error("Caught by Error Boundary:", error)
          console.error("Component Stack Tarck:", info?.componentStack)
        }}
        onReset={() => window.location.reload()}
      >
        <AppRoutes />
      </ErrorBoundary>
    </Router>
  )
}

export default App