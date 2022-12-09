import { Link } from "react-router-dom";
import { useGlobalState } from "../context/GlobalState";

function NavBar(props) {
    const [state, dispatch] = useGlobalState();
    // if (state.currentUser){
    //     console.log(state.currentUser.user_id)
    // } else if (!state.currentUser) {
    //     // let user = 1
    //     console.log('no user')
    // }

    return (
        <nav>
            <ul style={{ display: "flex", flexFlow: "row nowrap", justifyContent: "space-evenly", listStyle: 'none' }}>
                <li>
                    <Link to="/">Home</Link>
                </li>
                {
                    !state.currentUser && (
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                    )
                }
                {
                    !state.currentUser && (
                        <li>
                            <Link to="/register">Register</Link>
                        </li>
                    )
                }
                {
                    state.currentUser && (
                        <li>
                            <Link to="/profile">Profile</Link>
                        </li>
                    )
                }
            </ul>
        </nav>
    );
}

export default NavBar;