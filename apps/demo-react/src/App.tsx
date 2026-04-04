import { SearchNow } from '@search-now/react-wrapper';
import { customerSearchConfig } from './customer-search-config';

function App() {
  const handleResultSelect = (event: CustomEvent) => {
    console.log('Selected search result in react app:', event.detail);
  };

  return (
    <div>
      <header>
        <h1>Search Now Demo</h1>
        <p>Stencil Web Components with React Integration</p>
      </header>
      <main>
        <SearchNow
          config={customerSearchConfig}
          onResultSelect={handleResultSelect}
        />
      </main>
      <footer style={{ marginTop: '2rem', textAlign: 'center', position: 'absolute', bottom: 0 }}>
        <p>Kosala Yapa</p>
      </footer>
    </div>
  );
}

export default App;
