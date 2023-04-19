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
            <motion.div
            animate={{
                borderBottomLeftRadius: expandPost? "0px" : "10px",
                borderBottomRightRadius: expandPost? "0px" : "10px"
            }}
            onClick={() => { setexpandPost(!expandPost) }} id='div_img_container' style={{backgroundImage: `linear-gradient(transparent, black), url(${psts.preview})`}}>
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

function IndvPostMini({psts, clickPost}){

    const [expandPost, setexpandPost] = useState(false)

    return(
        <div className="div_postsIndvMini" onClick={() => {
            clickPost(psts)
        }}>
            <div className='div_postIndvMini_divider'>
                <p id='p_postIndvMini_label_time'>{psts.date}</p>
                <p id='p_postIndvMini_label_title'>{psts.title}</p>
                <p id='p_postIndvMini_label_content'>{psts.content}</p>
            </div>
            <div className='div_postIndvMini_divider'>
                <img src={psts.preview} className='img_postIndvMini_preview'/>
            </div>
        </div>
    )
}

function Feed() {

  const postslist = useSelector(state => state.postslist)
  const dispatch = useDispatch()

  const defaultSelectedPost = {
    postID: "",
    title: "",
    preview: "",
    content: "",
    viewers: "",
    date: "",
    time: "",
  }
  const [selectedPost, setselectedPost] = useState(defaultSelectedPost)

  var defaultMapping = [1,2]

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
        <motion.div id='div_background_black_blur' animate={{
            display: selectedPost.postID != ""? "block" : "none"
        }}></motion.div>
        <motion.div id='div_post_details_window'
            animate={{
                top: selectedPost.postID != ""? "20%" : "100%"
            }}
            transition={{
                bounce: 0,
                duration: 0.2
            }}
        >
            <div id='div_overall_post_container'>
                <div id='div_draggable_bar_container'>
                    <div id='div_draggable_bar_hold' onClick={() => {
                        setselectedPost(defaultSelectedPost)
                    }}></div>
                </div>
                <div id='div_image_preview_holder'>
                    <img src={selectedPost.preview} id='img_preview_post_mini_ab'/>
                </div>
                <div id='div_post_title_holder_ab'>
                    <p id='p_post_title_ab'>{selectedPost.title}</p>
                    <p id='p_post_date_time_ab'>{selectedPost.date} {selectedPost.time}</p>
                    {selectedPost.content.split("***").map((ps, i) => {
                    return(
                        <p key={i} className='p_content_post_mini_ab'>{ps}</p>
                        )
                    })}
                </div>
            </div>
        </motion.div>
        <div id='div_header_feed'>
            {/* <p id='p_header_feed_label'>Updates & Feed</p> */}
        </div>
        <div id='div_posts_feed'>
            {postslist.length != 0? (
                postslist.map((psts, i) => {
                    if(i == 0){
                        return(
                            <IndvPost key={`${psts.postID}_${i}`} psts={psts} />
                        )
                    }
                })
            ) : (
                <div className="div_postsIndvSkeleton">     
                </div>
            )}
        </div>
        <div id='div_posts_feed'>
            <p id='p_label_other_updates'>Other Updates</p>
            {postslist.length != 0? (
                postslist.map((psts, i) => {
                    if(i > 0){
                        return(
                            <IndvPostMini key={psts.postID} psts={psts} clickPost={setselectedPost} />
                        )
                    }
                })
            ) : (
                defaultMapping.map((dm, i) => {
                    return(
                        <div className="div_postsIndvMiniSkeleton">
                        </div>
                    )
                })
            )}
        </div>
    </div>
  )
}

export default Feed