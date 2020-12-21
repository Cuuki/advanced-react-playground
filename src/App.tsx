import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from 'react-router-dom';
import ErrorBoundaryExample from './examples/error-boundary';
import CompoundComponentsExample from "./examples/compound-components";
import ControlPropsExample from "./examples/control-props";
import HigherOrderComponentsExample from "./examples/higher-order-components";
import ProviderPatternExample from "./examples/provider-pattern";
import RenderPropsExample from "./examples/render-props";
import StateInitializerExample from "./examples/state-initializer";
import StateReducerExample from "./examples/state-reducer";

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
      <nav className="flex mb-4 pb-4 border-b border-gray-300 whitespace-nowrap overflow-x-auto">
        <NavItem path="/">Home</NavItem>
        <NavItem path="/examples/error-boundary">Error Boundary</NavItem>
        <NavItem path="/examples/compound-components">Compound Components</NavItem>
        <NavItem path="/examples/control-props">Controls Props</NavItem>
        <NavItem path="/examples/higher-order-components">Higher Order Components</NavItem>
        <NavItem path="/examples/provider-pattern">Provider Pattern</NavItem>
        <NavItem path="/examples/render-props">Render Props</NavItem>
        <NavItem path="/examples/state-initializer">State Initializer</NavItem>
        <NavItem path="/examples/state-reducer">State Reducer</NavItem>
      </nav>

      <Switch>
        <Route path="/examples/error-boundary">
          <ErrorBoundaryExample />
        </Route>
        <Route path="/examples/compound-components">
          <CompoundComponentsExample />
        </Route>
        <Route path="/examples/control-props">
          <ControlPropsExample />
        </Route>
        <Route path="/examples/higher-order-components">
          <HigherOrderComponentsExample />
        </Route>
        <Route path="/examples/provider-pattern">
          <ProviderPatternExample />
        </Route>
        <Route path="/examples/render-props">
          <RenderPropsExample />
        </Route>
        <Route path="/examples/state-initializer">
          <StateInitializerExample />
        </Route>
        <Route path="/examples/state-reducer">
          <StateReducerExample />
        </Route>
        <Route path="/">Navigate between examples</Route>
      </Switch>
    </Router>
  </main>
);

export default App;
