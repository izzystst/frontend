import React, { Component } from 'react'
export default function CommonWordsList(props){
	console.log("these are the props in common CommonWordsList")
	console.log(props.commonWords)
	console.log(props.commonPosts)
		
	for(let i = 0; i < props.commonWords.length; i++){
		console.log(props.commonWords[i])
		console.log("these are the commonPosts")
		console.log(props.commonPosts[i])
		for(let j = 0; j < props.commonPosts.length; j++){

		}
	}
	// 	console.log("this is props i")
	// 	console.log(props[i])
	
	const commonWords = props.commonWords.map((commonWord, index)=>{
		const commonPosts = props.commonPosts[index].map((commonPost, index)=><div key={"post" + index} >{commonPost.text}</div>)
		console.log(props.commonPosts[index])
		return(
		<div key={index}>
		<p className="word">	{commonWord}</p>
		<li>{commonPosts}</li>
		</div>

			)

	// 	return(
	// 		{common}
	// 		)
		}

	)
	return(

		<React.Fragment>

		{commonWords}
		
		</React.Fragment>
		)

}