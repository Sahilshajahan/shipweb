function Header(props) {
    return (
        <div>
            <h1> Hello i am Header by {props.data} <small><i>in header.js file and this is imported in app.js</i></small></h1>
        </div>
    )
}

export default Header