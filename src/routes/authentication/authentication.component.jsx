import { signInWithGooglePopup, createUserDocRefFromAuth } from "../../utils/firebase.utils";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";

const Authentication = () => {
    const logInGoogle = async () => {
        const { user } = await signInWithGooglePopup();
        await createUserDocRefFromAuth(user);
    }
    return (
        <div className="sign-in">
            <h2>I am sign in page</h2>
            <button onClick={logInGoogle}> Sign in with Google pop up</button>
            <SignUpForm></SignUpForm>
        </div>
    )
}

export default Authentication;