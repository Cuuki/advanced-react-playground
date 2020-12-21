import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from 'react-router-dom';
import Index from './examples/error-boundary';

const NavItem: React.FC<{path: string}> = ({path, children}) => (
  <NavLink
    to={path}
    exact
    className="px-4 py-2 rounded-md cursor-pointer hover:bg-green-100 hover:text-green-700 focus:text-green-700"
    activeClassName="bg-green-100 text-green-700">
    {children}
  </NavLink>
);

const App = () => (
  <main className="mx-auto my-5 py-4 px-3 max-w-screen-md w-full text-base text-gray-500 rounded-xl shadow-lg bg-white">
    <Router>
      <nav className="flex space-x-2 mb-4 pb-4 border-b border-gray-300">
        <NavItem path="/">Home</NavItem>
        <NavItem path="/examples/error-boundary">Error Boundary</NavItem>
      </nav>

      <Switch>
        <Route path="/examples/error-boundary">
          <Index />
        </Route>
        <Route path="/">Navigate between examples</Route>
      </Switch>
    </Router>
  </main>
);

export default App;
