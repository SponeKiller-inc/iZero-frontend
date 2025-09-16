import { RouterProvider  } from 'react-router-dom';

import routing from './routes/AppRoute';

function App() {

    return (
      <div className='App'>
          <RouterProvider router={routing}/>
      </div>
    );
}

export default App
