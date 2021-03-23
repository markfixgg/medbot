import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

const Header = ({headerLinks})=>{
    return (
        <div className="wrapper">
        <header className="header">
            <div className="content">
                <div className="logo">
                    <div className="textLogo">
                    <p className="medText">MED</p>
                    <div className="horizantalLine"></div>
                    <p className="botText">BOT</p>
                    </div>
                    <div className="verticalLine"></div>
                </div>
                <div className="navigation">
                    {
                        headerLinks.map((item, id) => {return <Link className="link active unselectable" to={item.title == "Register" ? "" : item.title} key={id}> {item.title} </Link> })
                    }
                </div>
            </div>
        </header>
        </div>
    )
}

export default Header