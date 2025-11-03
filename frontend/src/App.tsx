import './App.css';
import { CreateContentForm } from './components/ui/CreatContentForm';
import { Card } from './components/ui/Card'
import { useState } from 'react';

function App() {
  const [showForm, setShowForm] = useState<boolean>(true);
  return (
    <div>
      <CreateContentForm isOpen={showForm} onClose={() => setShowForm(false)} />
      <div className="p-6 space-y-6 flex gap-3">

      <Card
          title="The 7 Silent Killers of Success"
          link="https://www.youtube.com/watch?v=l4Sc2QwQ-nc"
          type="youtube"
      />


        <Card
          title="Elon's tweet about AI"
          link="https://x.com/elonmusk/status/1683920951807971329"
          type="X"
        />
      </div>
    </div>
  );
}

export default App
