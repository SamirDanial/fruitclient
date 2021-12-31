import React, { useEffect } from "react";
import { authActions } from "./store/auth";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ApolloClient, createHttpLink, ApolloProvider, InMemoryCache } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import {
  Navbar,
  Login,
  Register,
  CustomerProfile,
  EditProfile,
  CreateProfile,
  Home,
  Products,
  About,
  Contact,
  Footer,
  ProductDetails,
  Cart,
  AdminPanel,
  CategoryManagement,
  CreateCategory,
  EditCategory,
  CustomerManagement,
  DelieveryManagement,
  EmployeeManagement,
  InventoryManagement,
  ProductManagement,
  SaleManagement,
  VendorManagement
} from "./components";
import ProtectedRoutes from "./protectedRoutes";
import AdminRoutes from "./adminRoutes";
import "./App.css";

const httpLink = createHttpLink({
  uri: 'http://localhost:5000/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const authToken = JSON.parse(localStorage.getItem('User')) || '';
  const token = authToken !== '' ? authToken.token : '';
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      'x-auth-token': token
      // authorization: token ? `Bearer ${token}` : "",
    }
  }
});



const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

function App() {
  const isAuth = useSelector((state) => state.auth.authenticated);
  const isAdminRole = useSelector((state) => state.auth.roleName) === "Admin" ? true : false;
  const dispatch = useDispatch();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("User"));
    if (user) {
      dispatch(
        authActions.authenticate({
          _id: user._id,
          username: user.username,
          token: user.token,
          roleName: user.roleName,
          authState: user.authState,
        })
      );
    }
  }, [dispatch]);

  return (
    <>
    <ApolloProvider client={client}>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/product_detail" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route element={<ProtectedRoutes isAuthen={isAuth} />}>
              <Route path="/userprofile" element={<CustomerProfile />} />
              <Route path="/editProfile" element={<EditProfile />} />
              <Route path="/createProfile" element={<CreateProfile />} />
            </Route>

            <Route element={<AdminRoutes isAdminMan={isAdminRole} />}>
              <Route path="/adminPanel" element={<AdminPanel />} />
              <Route path="/categoryManagement" element={<CategoryManagement />} />
              <Route path="/createCategory" element={<CreateCategory />} />
              <Route path="/editCategory/:id" element={<EditCategory />} />
              <Route path="/CustomerManagement" element={<CustomerManagement />} />
              <Route path="/delieveryManagement" element={<DelieveryManagement />} />
              <Route path="/employeeManagement" element={<EmployeeManagement />} />
              <Route path="/inventoryManagement" element={<InventoryManagement />} />
              <Route path="/productManagement" element={<ProductManagement />} />
              <Route path="/saleManagement" element={<SaleManagement />} />
              <Route path="/vendorManagement" element={<VendorManagement />} />
            </Route>
          </Routes>
        </Router>
      <Footer />
    </ApolloProvider>
    </>
  );
}

export default App;
