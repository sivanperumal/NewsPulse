import "./App.css";
import SignIn from "./pages/Authentication/SignIn.jsx";
import SignUp from "./pages/Authentication/SignUp.jsx";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/Auth.context.jsx";
import ListPage from "./pages/Blog/ListPage.jsx";
import Layout from "./components/Layout.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import ProductList from "./pages/Product/List.jsx";
import UserList from "./pages/User/List.jsx";
function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route element={<Layout />}>
            <Route element={<ProtectedRoute />}>
              <Route path="/product">
                <Route index element={<Navigate to="/product/list" />} />
                <Route path="list" element={<ProductList />} />
              </Route>
              <Route path="/user">
                <Route index element={<Navigate to="/user/list" />} />
                <Route path="list" element={<UserList />} />
              </Route>
              <Route path="/blogs" element={<Outlet />}>
                <Route index element={<ListPage />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
