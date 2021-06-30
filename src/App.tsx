import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { AuthContextProvider } from './contexts/AuthContext'

import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";
import { Room } from "./pages/Room";
import { AdminRoomsList } from "./pages/AdminRoomsList";
import { AdminRoom } from "./pages/AdminRoom";
import { Page404 } from "./pages/Page404";

function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/rooms/new" component={NewRoom} />
          <Route path="/rooms/:id" component={Room} />

          <Route path="/admin/rooms/all" exact component={AdminRoomsList} />
          <Route path="/admin/rooms/:id" component={AdminRoom} />

          <Route path="*" component={Page404} />
        </Switch>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;
