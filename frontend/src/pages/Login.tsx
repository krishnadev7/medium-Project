import { Auth } from "../components/Auth"
import { Quote } from "../components/Quote"

function Login() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
        <div>
            <Auth type="login"/>
        </div>
        <div className="none lg:block">
        <Quote type="login"/>
        </div>
    </div>
  )
}

export default Login