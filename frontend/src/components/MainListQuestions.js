import React, { useEffect } from 'react'
import { Button, Form } from 'react-bootstrap'

import { useState } from 'react'
import Loader from './Loader';
import Message from './Message';
const MainListQuestions = () => {
    const [questions,setQuestions]=useState([]);
    const[loading,setLoading]=useState(false);
    const[input,setInput]=useState('');
    const[error,setError]=useState('');
    const pages=[]
    const PerPagePages=3
    const [pageNumber,setPageNumber]=useState(0)
    const[totalLength,setTotalLength]=useState(0)
    const [startIndex,setStartIndex]=useState(0)
    const [endIndex,setEndIndex]=useState(3)




    useEffect(()=>{
        setLoading(true);
        setPageNumber(0)
        fetch('http://localhost:8000/search/query/catche')
        .then(res=>res.json())
        .then(res=> {
            if(res.status){
            setQuestions(res.data)
            setTotalLength(res.data.length)
            }
            setLoading(false)
            setInput('')

        })
        console.log("call cache")
    
    },[]);
   
//fetch(`http://localhost:8000/search/query/${input}`)

    const submitHandler=(e)=>{
        if(input){
            e.preventDefault()
            console.log("siubmited")
            setLoading(true)
            setQuestions([])

            fetch(`http://localhost:8000/search/query/?key=${input}`)
            .then(res=>res.json())
            .then(res=>{
                if(res.status){
                    setQuestions(res.data)
                    setTotalLength(res.data.length)
                }
                setLoading(false)
                setInput(res.questionAsked)
            })

        }
        else{
            setError("Search Input Cannot Be Empty")
            
        }
        
  

    }

    const totalPages=totalLength/PerPagePages
    for(let i=0;i<Math.floor(totalPages);i++){
         pages.push(i)
    }
    const handlePages=(pageNum)=>{
        setPageNumber(pageNum)
        setStartIndex(PerPagePages*pageNum)
        setEndIndex(PerPagePages*pageNum+PerPagePages)

    }


  return (
    <div>
         
        <div>
            <Form onSubmit={submitHandler}>
                <Form.Control
                placeholder='Search Your Query Here...'
                type='text'
                name='input'
                value={input}
                onChange={(e)=>setInput(e.target.value)}
                className='mr-sm-2 ml-sm-5'
            >
            </Form.Control>
            <br></br>
            <Button
                type='submit'
                variant='success'
                className='p-2'>Search
            </Button>

            </Form>

        </div>
        
        {
            loading?<Loader/>:
            error?<Message variant='danger'>{error}</Message>:
            <div>
                <ul className="list-group ">
                    <hr></hr>
                    {
                            questions.slice(startIndex,endIndex).map((question, index) => (
                        
                                <li key={index} className="list-group">
                                    <div className="d-flex">
                                        <div>
                                            <strong className="m-1">{question["score"]}</strong>
                                            <p className="m-1">votes</p>
                                            <strong className="m-1">{question["answer_count"]}</strong>
                                            <p className="m-1">answers</p>
                                            <p className="m-1"><strong>{question['view_count']}</strong> views</p>
                                        </div>
                                        <div>
                                            <h4 ><a href={question["link"]} target="_blank">{question["title"]}</a></h4>
                                            <div className='d-flex'>
                                                {
                                                    question["tags"].map((tag, index) => (
                                                        <div>
                                                        <Button variant="secondary" style={{ marginLeft: "20%" }}>{tag}</Button>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))
                    }

                </ul>
            </div>
        }


        <div className='d-flex' style={{ marginLeft: "20%" }}>
            {
                pages.map((pageNum, index) => (
                    <div>
                   
                    <Button onClick={(e)=> handlePages(pageNum)} variant="outline-dark" style={{ marginLeft: "20%" }}>{pageNum}</Button>
                    </div>
                ))
            }
        </div>

        </div>

    


  )
}

export default MainListQuestions
