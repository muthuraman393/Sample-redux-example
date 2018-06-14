import React from 'react';
import { connect } from 'react-redux';
function Counter(props){
console.log('mapStateToProps',props)
	return(
	<div>
	<h1>I m a counter</h1>
	<p>Count:{props.count}</p>
	<button onClick={props.onIncrementClick}>increment</button>
	</div>
	)
}


function mapStateToProps(state){
console.log('mapStateToProps',state)
return {
	count:state.count
}
}
function mapDispatchToProps(dispatch){
return {
	onIncrementClick:()=>{
	console.log('clcikcing');
	const action = {'type':'INCREMENT'};
	dispatch(action);
	}
}
}
export default connect(mapStateToProps,mapDispatchToProps)(Counter);

