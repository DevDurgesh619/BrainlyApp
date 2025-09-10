import { BrowserRouter,Routes,Route } from 'react-router-dom'
import { Signup } from './Pages/Signup'
import { Signin } from './Pages/Signin'
import Dashboard from './Pages/Dashboard'

function App() {
  return(
    <BrowserRouter>
       <Routes>
         <Route path='/signup' element={<Signup/>}></Route>
         <Route path='/signin' element={<Signin/>}></Route>
         <Route path='/dashboard' element={<Dashboard/>}></Route>
       </Routes>
    </BrowserRouter>
    
    
  )
  // const [modalOpen,setModalOpen] = useState(false)
  // return(
  // <div>
  //   <Sidebar/>
  //   <div className=' p-4 ml-72 border-2 h-min-screen bg-gray-100 '>
  //   <CreateContentModal  open={modalOpen} onClose={()=>{
  //     setModalOpen(false)
  //   }}/>
  //     <div className='flex justify-end   gap-4 '>
  //       <Button startIcon={<ShareIcon size='md'/>} variants='primary' text='share brain' size='md'></Button> 
  //       <Button onClick={()=>{setModalOpen(true)}} startIcon={<PlusIcon size='md'/>} variants='secondary'
  //        text='Add Content' size='md' ></Button> 
      
  //     </div>
  //     <div className='flex gap-4 mt-4'>
  //        <Card type='twitter' link="https://twitter.com/username/status/807811447862468608" title='first tweet'/>
  //        <Card type='youtube' link="https://www.youtube.com/watch?v=b_LfX5k4cZY" title='First Youtube Video'/>
  //     </div>  
  //     </div>  
  // </div> 
    
  // )
}

export default App
