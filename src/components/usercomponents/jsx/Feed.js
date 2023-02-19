import React, { useEffect, useState } from 'react'
import '../css/Feed.css'
import Axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { URL_TWO } from '../../../variables'
import { SET_POSTS_LIST } from '../../../redux/types/types'
import { motion } from 'framer-motion'

function IndvPost({psts}){

    const [expandPost, setexpandPost] = useState(false)

    return(
        <div className="div_postsIndv">
            <motion.div onClick={() => { setexpandPost(!expandPost) }} id='div_img_container' style={{backgroundImage: `linear-gradient(transparent, black), url(${psts.preview})`}}>
                <div id='div_preview_labels_container'>
                    <p className='p_labels_post'>{psts.date}</p>
                    <p className='p_labels_post'>{psts.title}</p>
                </div>
            </motion.div>
            <motion.div
            animate={{
                height: expandPost? "auto" : "calc(0px - 50px)",
                paddingTop: expandPost? "30px" : "0px",
                paddingBottom: expandPost? "20px" : "0px"
            }}
            className='div_content_expand'>
                <p id='p_label_post_time'>Posted on {psts.time}</p>
                {psts.content.split("***").map((ps, i) => {
                    return(
                        <p key={i} className='p_content_post'>{ps}</p>
                    )
                })}
            </motion.div>
        </div>
    )
}

function Feed() {

  const postslist = useSelector(state => state.postslist)
  const dispatch = useDispatch()

  useEffect(() => {
    initPosts()
  }, [])

  const initPosts = () => {
    Axios.get(`${URL_TWO}/getPosts`, {
        headers:{
            "x-access-tokendriver": localStorage.getItem("tokendriver")
        }
    }).then((response) => {
        if(response.data.status){
            // console.log(response.data.result)
            dispatch({type: SET_POSTS_LIST, postslist: response.data.result})
        }
        else{
            console.log(response.data.message)
        }
    }).catch((err) => {
        console.log(err)
    })
  }

  return (
    <div id='div_feed_main'>
        <div id='div_header_feed'>
            <p id='p_header_feed_label'>Updates & Feed</p>
        </div>
        <div id='div_posts_feed'>
            {postslist.map((psts, i) => {
                return(
                    <IndvPost key={psts.postID} psts={psts} />
                )
            })}
        </div>
    </div>
  )
}

export default Feed