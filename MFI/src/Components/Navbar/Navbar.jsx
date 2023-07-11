import { Link } from "react-router-dom"
import "./navbar.css"
import Content from '../../Content.json'


export default function Navbar() {
  return (
    <>
            <nav className="navbar navbar-expand-lg m-1 transparent justify-content-center" id="navbar-balize">
                <div className="container row">
                    <div className="collapse navbar-collapse " id="navbarNav">
                        <div className="col-md-2" id="img" >
                            <img src="./images/logo-light.png" className="img-fluid" alt="" />
                        </div>
                        {/* <div className="col-md-9 row"> */}
                            <ul className="navbar-nav m-auto col-md-8 ">
                                <li className="nav-item ">
                                    <Link to="/home" className="btn btn-lg btn-light d-flex justify-content-center" id="link" >
                                    {Content["ENG"]["Navbar"]["HeadCount"]}
                                    </Link>
                                </li>

                                <li className="nav-item  ">
                                    <Link to="/add" className="btn btn-lg btn-light d-flex justify-content-center" id="link" >
                                    {Content["ENG"]["Navbar"]["Add"]}
                                    </Link>
                                </li>

                                <li className="nav-item  ">
                                    <Link to="/filter" className="btn btn-lg btn-light d-flex justify-content-center" id="link" >
                                    {Content["ENG"]["Navbar"]["Filter"]}
                                    </Link>
                                </li>

                                <li className="nav-item  ">
                                    <Link to="/find" className="btn btn-lg btn-light d-flex justify-content-center" id="link" >
                                    {Content["ENG"]["Navbar"]["Find"]}
                                    </Link >
                                </li>

                            </ul>
                        </div>
                    </div>
                {/* </div> */}
            </nav>
    </>
  )
}
