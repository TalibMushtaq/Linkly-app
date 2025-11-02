import { Button } from './components/ui/Button'
import './App.css'
import { PlusIcon } from './assets/icons/plusicon'
import { ShareIcon } from './assets/icons/shareIcon'
import { Card } from './components/ui/Card'

function App() {

  return (
    <div>
      <Button startIcon={<PlusIcon size='md' />} endIcon={ <ShareIcon size='md' />} variant='Primary' text='Share' size='lg' onClick={()=>{}}/>
      <Button variant='Secondary' text='Share' size='md' onClick={()=>{}}/>
      <Button variant='Primary' text = 'Share' size='sm' onClick={()=>{}} />

      <div className="p-6 space-y-6 flex gap-3">
      {/* YouTube Example */}
      <Card
          title="The 7 Silent Killers of Success"
          link="https://www.youtube.com/watch?v=l4Sc2QwQ-nc"
          type="youtube"
      />

      {/* Tweet Example */}
        <Card
          title="Elon’s tweet about AI"
          link="https://x.com/elonmusk/status/1683920951807971329"
          type="X"
        />
      </div>
    </div>
  );
}

export default App
