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

import ListPage from "./pages/Blog/ListPage.jsx";
import Layout from "./components/Layout.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import ProductList from "./pages/Product/List.jsx";
import ProductDetail from "./pages/Product/Detail.jsx";
import UserList from "./pages/User/List.jsx";
import FavouriteList from "./pages/Favourite/List.jsx";
import { AuthProvider } from "./context/Auth.context.jsx";
import { ThemeWrapper } from "./context/theme.context.jsx";

function App() {
  return (
    <AuthProvider>
      <ThemeWrapper>
        <Router>
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route element={<Layout />}>
              <Route element={<ProtectedRoute />}>
                <Route path="/product">
                  <Route index element={<Navigate to="/product/list" />} />
                  <Route path="list" element={<ProductList />} />
                  <Route path=":id" element={<ProductDetail />} />
                </Route>
                <Route path="/user">
                  <Route index element={<Navigate to="/user/list" />} />
                  <Route path="list" element={<UserList />} />
                </Route>
                <Route path="/blogs" element={<Outlet />}>
                  <Route index element={<ListPage />} />
                </Route>
                <Route path="/favourite">
                  <Route index element={<Navigate to="/favourite/list" />} />
                  <Route path="list" element={<FavouriteList />} />
                </Route>
              </Route>
            </Route>
          </Routes>
        </Router>
      </ThemeWrapper>
    </AuthProvider>
  );
}

export default App;
