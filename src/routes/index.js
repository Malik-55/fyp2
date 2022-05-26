import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Splash } from '../screens/splash/Splash';
import { Login } from '../screens/login/Login';
import { Signup } from '../screens/signup/Signup';
import { ForgetPassword } from '../screens/forgotPassword/ForgetPassword';
import { BottomTab } from '../screens/parkingOwner/bottomTab/BottomTab';
import { CustomerBottomTab } from '../screens/customer/bottomTab/CustomerTab';
import { AdminBottomTab } from '../screens/admin/adminTab/AdminTab';



const Stack = createNativeStackNavigator();
function App() {

    useEffect(() => {
        return () => {
        }
    }, [])

    return (
        <Stack.Navigator headerMode={'none'} initialRouteName={'Splash'}>
            <Stack.Screen
                name="Splash"
                component={Splash}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="Login"
                component={Login}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="Signup"
                component={Signup}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="ForgetPassword"
                component={ForgetPassword}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="BottomTab"
                component={BottomTab}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="CustomerBottomTab"
                component={CustomerBottomTab}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="AdminBottomTab"
                component={AdminBottomTab}
                options={{
                    headerShown: false,
                }}
            />
            
        </Stack.Navigator>
    );
}

export default App;
