import { useState, useEffect } from 'react';
import './index.css'
const Home = (props)=>{
    const[todoList,setTodoList] = useState([])
    const[todo, settodo]= useState('')
    const[editable, setEditable]=useState(false)

    useEffect(() => {
        let storedNames = JSON.parse(localStorage.getItem("todoList"));
        storedNames != null ?
        setTodoList([...storedNames]):
        localStorage.setItem("todoList", JSON.stringify(storedNames));
        },[]);

    useEffect(() => {
        localStorage.setItem("todoList", JSON.stringify(todoList));
        },[todoList]);


    const setTodo = (e) =>{
        e.preventDefault()
        let value = e.target.value;
        let id=todo.id
        if(value !== ''){
        settodo({value,id})
        }
    }


    
    const submit =(e,id)=>{
        e.preventDefault()
        if(todo !== ""){
            if(editable===true){
                console.log(todo.value);
                console.log(todo)
                let newList = [...todoList]
                newList[todo.id]=todo.value
                console.log(newList)
                setTodoList([...newList])
                setEditable(false)

            }
            else{
                console.log(todoList)
                setTodoList([...todoList,todo.value])
            }
            
            settodo({value:''})
            }
    }
    

    const removeTodo = (e,index)=>{
        let newData=todoList
        newData.splice(index,1)
        setTodoList([...newData])
    }

    const editTodo = (data)=>{
        console.log(data.item)
        setEditable(true)
        let value = data.item;
        let id = data.idx;
        settodo({value,id})
    }
    
    return(
        <div>
            <form onSubmit={submit}>
            <input type='text'  name='name' value={todo.value} onChange={setTodo} required></input>
            </form>
            {   
                todoList.map((item,idx)=>{
                    return (
                        <div key={idx} className='todos'>
                            <p >{item}</p>
                            <span className='icons'>
                                <i class="fas fa-times-circle fa-lg" onClick={(e)=>removeTodo(e,idx)} />
                                <i class="fas fa-edit fa-lg" onClick={(e)=>editTodo({item,idx})}></i>
                            </span>
                        </div>
                    )
                })
            }
            
        </div>
    )
}

export default Home;