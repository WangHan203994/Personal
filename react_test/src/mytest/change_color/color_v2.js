/**
 * Author : ginko
 * Date : 15/12/2
 * Description :
 */

let ColorChange = React.createClass({
    getInitialState(){
        return {
            color : 'red'
        }
    },
    handleClick( e ){
        e.preventDefault();

        this.setState({
            color : this.refs.colorInputText.value
        });
    },
    render(){
        return(
            <div>
                <input
                    type = 'text'
                    placeholder = { this.state.color }
                    ref = 'colorInputText'
                />
                <a
                    href = "#"
                    style = {{ color : this.state.color }}
                    onClick = { this.handleClick }
                >
                    Click here
                </a>
            </div>
        );
    }
});

ReactDOM.render(
    <ColorChange/>,
    document.getElementById('container')
);

//function timeout( duration = 0){
//    return new Promise(function( resolve , reject ){
//        console.log( duration );
//        setTimeout( resolve , duration );
//    });
//}
//
//let pro = timeout( 1000 ).then(function(){
//    return timeout(2000);
//}).then(function() {
//    alert(1);
//});

new Promise( ( resolve , reject ) => {
    setTimeout( () => {
        console.log('time end')
    } , 1000 );
}).then( () => {
    alert(1);
});