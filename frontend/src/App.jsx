import { useState } from 'react'
import { lazy,Suspense } from 'react'
import {Navigate,useLocation,Routes,Route,Outlet} from 'react-router'
import styled from 'styled-components'
import { useDispatch,useSelector } from 'react-redux'

const CreateUser = lazy(()=>import('./pages/CreateUser'))
const Chat = lazy(()=>import('./pages/Chat'))
const Sidebar = lazy(()=>import('./components/Sidebar'))
const MessageArea = lazy(()=>import('./pages/MessageArea'))

function Layout(){
  const user = useSelector((state)=>state.auth.user)
  const location = useLocation()
  const[selectedChatId,setSelectedChatId] = useState("")

  return user ? (
    <div className="h-screen w-screen bg-[#050C1A] flex items-center">
      <aside>
        <Sidebar selectedChatId={selectedChatId} setSelectedChatId={setSelectedChatId} />
      </aside>

      <main>
        <MessageArea selectedChatId={selectedChatId} setSelectedChatId={setSelectedChatId}/>
        <Outlet/>
      </main>
    </div>
  ):<Navigate to="/createUser" state={{from:location}} replace/>
}

function App() {
 return(
  <>
   <Suspense fallback={<Load>
    <div className="dot-container">
      <div className="dot"></div>
      <div className="dot"></div>
      <div className="dot"></div>
    </div></Load>} >
     <Routes>
        <Route element={<Layout/>} >
          <Route path='/' element={<Navigate to={"/chat"}/>} />
           <Route path='/chat' element={<Chat/>} />
        </Route>
        <Route path='/createUser' element={<CreateUser/>}/>
     </Routes>
   </Suspense>
  </>
 )
}

const Load = styled.div`
     .dot-container{
        display: flex;
        align-items: center;
        border: 1px;
        height: 2rem;
        width: fit-content;
    }
    .dot{
        height: 1rem;
        width: 1rem;
        border-radius: 100%;
        animation:pulse 1.2s ease-in-out infinite;
        margin: 3px;
    }
    @keyframes pulse {
        0%{
            background-color: #0000ff52;
        }
        50%{
            background-color: blue;
        }
        0%{
            background-color: #0000ff52;
        }
    }

    .dot:nth-child(1){
        animation-delay:0.2s ;
    }
    .dot:nth-child(2){
        animation-delay:0.4s ;
    }
    .dot:nth-child(3){
        animation-delay:0.6s ;
    }
    .dot:nth-child(1){
        animation-delay:0.8 ;
    }
`

export default App
