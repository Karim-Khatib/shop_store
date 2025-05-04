import React, { createContext } from 'react'
import supabase from '../supabase/supabase_provider';
import { useLoading } from '../components/LoadingDialog';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { AuthStatus } from '../supabase/user_auth_service';
const AuthContext = createContext()
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    return React.useContext(AuthContext)
}
export default function AuthProvider(prop) {

    const lodingDialoge = useLoading()
    const { enqueueSnackbar } = useSnackbar();
    const [authState, setAuthState] = React.useState({
        state: AuthStatus.Init,
    });
    const navigate = useNavigate();
    React.useEffect(() => {
        const localAppUser = localStorage.getItem('user');
        if (localAppUser) {
            setAuthState({ state: AuthStatus.Auth, currentUser: JSON.parse(localAppUser) })
        } else {
            const {data} = supabase.auth.getUser();
            if(data){
                const currenctSpabaseUser = data.user;
              
                    if (currenctSpabaseUser) {
                        const appUser = {
                            id: currenctSpabaseUser.id,
                            email: currenctSpabaseUser.email,
                            firstName: currenctSpabaseUser.user_metadata.firstName,
                            lastName: currenctSpabaseUser.user_metadata.lastName,
                            gender: currenctSpabaseUser.user_metadata.gender,
                        }
                        localStorage.setItem('user', JSON.stringify(appUser));
                        setAuthState({ state: AuthStatus.Auth, currentUser: appUser })
                        return;
                    }   
                
            }
            
            setAuthState({ state: AuthStatus.NotAuth })
        }
    }, [])

    async function signUpByEmailAndPassword(user) {
        lodingDialoge.showDialog("جاري إنشاء حساب جديد");
        try {
            if (!user.email || !user.password) {
                return;
            }
            const { error, data } = await supabase.auth.signUp({
                email: user.email, password: user.password,
                options: {
                    data: {
                        firstName: user.firstName,
                        lastName: user.lastName,
                        gender: user.gender,
                    }
                }

            })
            if (error) {
                enqueueSnackbar(error.message || "خطأ غير معروف", {
                    variant: 'error',
                    persist: false,

                    anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'center'
                    }

                },


                );
            }
            if (data) {
                enqueueSnackbar('تم إنشاء الحساب ', { variant: 'success',    persist: false,
                })
                console.log(data);
                const supabaseUser = data.user;
                const appUser = {
                    id: supabaseUser.id,
                    email: supabaseUser.email,
                    firstName: supabaseUser.user_metadata.firstName,
                    lastName: supabaseUser.user_metadata.lastName,
                    gender: supabaseUser.user_metadata.gender,
                }
                setAuthState({ state: "SginUp", currentUser: appUser })
                navigate("/login");


            }
        } catch (e) {
            console.log(e);
        } finally {
            lodingDialoge.closeDialog();
        }
    }
    const loginViaEmailAndPassword = async (email, password) => {
        lodingDialoge.showDialog("جاري تسجيل الدخول");
        try {
            if (!email || !password) {
                return;
            }
            const { error, data } = await supabase.auth.signInWithPassword({
                email: email, password: password,
            })
            if (error) {
                enqueueSnackbar(error.message || "خطأ غير معروف", {
                    variant: 'error',
                })
            }
            if (data.user) {
                const supabaseUser = data.user;
                console.log(supabaseUser);

                const appUser = {
                    id: supabaseUser.id,
                    email: supabaseUser.email,
                    firstName: supabaseUser.user_metadata.firstName,
                    lastName: supabaseUser.user_metadata.lastName,
                    gender: supabaseUser.user_metadata.gender,
                }
                setAuthState({ state: "SginIn", currentUser: appUser })
                navigate("/");
                enqueueSnackbar('تم تسجيل الدخول بنجاح', { variant: 'success', anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'center'
                },    persist: false,
                })
                localStorage.setItem('user', JSON.stringify(appUser));

            }
        }
        catch (e) {
            enqueueSnackbar(e.message || "خطأ غير معروف", {
                variant: 'error',
            })
        } finally {
            lodingDialoge.closeDialog();
        }
    }
    const logout = async () => {
        lodingDialoge.showDialog("جاري تسجيل الخروج");
        try {
            await supabase.auth.signOut();
            setAuthState({ state: "NotAuth" })
            localStorage.removeItem('user');
            navigate("/login");
            enqueueSnackbar('تم تسجيل الخروج بنجاح', { variant: 'success', })
        } catch (e) {
            enqueueSnackbar(e.message || "خطأ غير معروف", {
                variant: 'error',
            })
        } finally {
            lodingDialoge.closeDialog();
        }
    }
    return (
        <AuthContext.Provider value={{ authState, signUpByEmailAndPassword, loginViaEmailAndPassword, logout }}>
            {prop.children}
        </AuthContext.Provider>
    )
}
