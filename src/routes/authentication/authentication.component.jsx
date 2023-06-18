import { signInWithGooglePopup, createUserDocRefFromAuth } from "../../utils/firebase.utils";
import SignUp from "../../components/sign-up-form/sign-up-form.component";
import SignIn from "../../components/sign-in-form/sign-in-form.component";

const Authentication = () => {
    return (
        <div className="sign-in">
            <SignIn></SignIn>
            <SignUp></SignUp>
        </div>
    )
}

export default Authentication;