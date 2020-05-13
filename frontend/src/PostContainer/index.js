import React, { Component } from 'react'
// import { Form, Button, Label, Segment }
import NewPostForm from "../NewPostForm"
import PostList from "../PostList"
import MapRender from "../MapRender"
import UsersPosts from "../UsersPosts"
import CommonWordsList from "../CommonWordsList"
export default class PostContainer extends Component {
	constructor(props){
		super(props)
		this.state={
			posts:[],
			currentUsersPosts:[]
		}
	}


	  async componentDidMount() {
			await this.getPosts()
			// this.getUsersPosts(1)
	}

	createPost = async (postToAdd)=>{
		console.log("this is the post you are trying to add", postToAdd)
		try{
			const url = process.env.REACT_APP_API_URL + "/api/v1/posts/"
			const createPostResponse = await fetch (url, {
				credentials: "include",
				method: "POST",
				headers: {
					'Content-Type': 'application/json'
				}, 
				body: JSON.stringify(postToAdd)
			})
			const createPostJson = await createPostResponse.json()
			console.log("this is the create post json")
			console.log(createPostJson)
			if(createPostResponse.status === 201){
				this.setState({
				posts: [...this.state.posts, createPostJson.data]
				})
			}
		}catch(err){
			console.log(err)
		}
	}
	getPosts = async () =>{
		try{
			const url = process.env.REACT_APP_API_URL + "/api/v1/posts/"
			const postsResponse = await fetch(url, {
				credentials: "include"
			})
			const postJson = await postsResponse.json()
			console.log("this is post json")
			console.log(postJson)
			const usersPosts = postJson.data.filter((post)=>{
				return post.user.id === this.props.loggedInUserId
			})
			console.log("this is the users posts after using filter!")
			console.log(usersPosts)
			console.log("this is the posts json")
			console.log(postJson)
			this.setState({
				posts: postJson.data,
				currentUsersPosts:usersPosts
			})
		}catch(err){
			console.log(err)
		}

	}
	// getUsersPosts = async (id)=>{
	// 	try{
	// 		const url = process.env.REACT_APP_API_URL + "/api/v1/posts/users/" + id + "/" 
	// 		const usersPostsResponse = await fetch(url, {
	// 			credentials: "include"
	// 		})
	// 		const userPostsJson = await usersPostsResponse.json()
	// 		this.setState({
	// 			currentUsersPosts: userPostsJson.data
	// 		})
	// 		console.log(this.state)
	// 	}catch(err){
	// 		console.log(err)
	// 	}
	// }
	render(){
		return(
			<React.Fragment>
			{this.props.renderNewPost === true
				&&
				<div>
				<NewPostForm createPost={this.createPost} />
				</div>
			}
			{this.props.renderUsersPosts === true
				&&
				<div>
				<UsersPosts posts={this.state.currentUsersPosts}/>
				</div>

			}
			{this.props.renderAllPosts === true
				&&
				<div>
				<PostList posts={this.state.posts}/>
				</div>
			}
			{this.props.renderMap === true
				&&
				<div>
				<MapRender posts={this.state.posts}/>
				</div>
			}
			{this.props.renderCommonWords === true
				&&
				<div>
				<CommonWordsList />
				</div>

			}
			</React.Fragment>
			)
	}

}