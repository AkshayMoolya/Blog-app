import { Route, Routes } from "react-router-dom";

import Layout from "./components/Layout";
import LoginPage from "./Pages/LoginPage";
import Register from "./Pages/Register";
import { UserContextProvider } from "./UserContext";
import CreatePost from "./Pages/CreatePost";
import IndexPage from "./Pages/IndexPage";
import PostPage from "./Pages/PostPage";
import EditPage from "./Pages/EditPage";

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/post/:id" element={<PostPage />} />
          <Route path="/edit/:id" element={<EditPage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
