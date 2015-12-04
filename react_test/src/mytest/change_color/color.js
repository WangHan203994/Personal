/**
 * Author : ginko
 * Date : 15/12/2
 * Description :
 */
let LinkButton = React.createClass({
    handleClick( e ){
        this.props.onLinkClick( e );
    },
    render(){
        return(
            <a
                href = "#"
                style = {{ color : this.props.color }}
                onClick = { this.handleClick }
            >
                Click here
            </a>
        );
    }
});

let ColorChange = React.createClass({
    getInitialState(){
        return {
            color : 'red'
        }
    },
    handleLinkClick( e ){
        e.preventDefault();
        this.setState({
            color : this.refs.colorInputText.value
        })
    },
    render(){
        return(
            <div>
                <input
                    type = 'text'
                    placeholder = { this.state.color }
                    ref = 'colorInputText'
                />
                <LinkButton
                    color = { this.state.color }
                    onLinkClick = { this.handleLinkClick }
                />
            </div>
        );
    }
});

ReactDOM.render(
    <ColorChange/>,
    document.getElementById('container')
);