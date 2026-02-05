import React from 'react'
import { useNavigate } from 'react-router'
import { useEffect,useState } from 'react'
import { useParams } from 'react-router'
import service from '../appwrite/config'
import PostForm from '../components/Post-Form/PostForm'
import  Container  from '../components'
function EditPosts() {
const [post,setpost]=useState(null)
const navigate = useNavigate()
const {slug}=useParams()
useEffect(()=>{
    if(slug){
       service.getPost(slug).then((post)=>{
        if(post){
            setpost(post)
        }
        else{
            navigate('/')
        }
       })
    }
},[slug,navigate])
  return post?(
    <div className='py-8'>
        <Container>
          <PostForm post={post}/>
        </Container>
        
    </div>
  ):null
}

export default EditPosts