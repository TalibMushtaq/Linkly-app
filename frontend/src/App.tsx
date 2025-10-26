import { Button } from './components/ui/Button'
import './App.css'
import { PlusIcon } from './assets/icons/plusicon'


function App() {

  return (
    <>
      <Button startIcon={<PlusIcon />} variant='Primary' text='Share' size='lg' onClick={()=>{}}/>
      <Button variant='Secondary' text='Share' size='md' onClick={()=>{}}/>
      <Button variant='Primary' text = 'Share' size='sm' onClick={()=>{}} />
    </>
  )
}

export default App
