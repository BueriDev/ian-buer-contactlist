import { NavigationContainer, useNavigationContainerRef, useNavigationState } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from "@react-navigation/drawer";

import Contacts from "./screens/Contacts";
import Profile from './screens/Profile';
import Favorites from "./screens/Favorites";
import User from "./screens/User";
import Options from "./screens/Options";
import colors from "./utils/colors";
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialIcons } from '@expo/vector-icons';
import { get } from "react-native/Libraries/Utilities/PixelRatio";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const getDrawerItemIcon = icon => ({focused, color, size}) => (
    <MaterialIcons name={icon} size={22} style={{ color: color}} />
);

function ContactsScreens() {
    return (
        <Stack.Navigator
            initialRouteName="ContactsScreen">
            <Stack.Screen
                name="ContactsScreen"
                component={Contacts}
                options={Contacts.options}
            ></Stack.Screen>
            <Stack.Screen
                name="ProfileScreen"
                component={Profile}
                options={Profile.options}
            ></Stack.Screen>
        </Stack.Navigator>
    );
}

function FavoritesScreens() { 
    return (
        <Stack.Navigator initialRouteName="FavoritesScreen">
            <Stack.Screen
                name="FavoritesScreen"
                component={Favorites}
                options={Favorites.options}>
            </Stack.Screen>
            <Stack.Screen
                name="ProfileScreen"
                component={Profile}
                options={Profile.options}
            ></Stack.Screen>
        </Stack.Navigator>
    )
}

function UserScreens() {
    return (
        <Stack.Navigator initialRouteName="UserScreen">
            <Stack.Screen
                name="UserScreen"
                component={User}
                options={User.options}
            ></Stack.Screen>
            <Stack.Screen
                name="Options"
                component={Options}
                options={Options.options}
            ></Stack.Screen>
        </Stack.Navigator>
    )
}

export default function AppNavigator() {
    const navigationRef = useNavigationContainerRef();

    return (
        <NavigationContainer ref={navigationRef}>
            <Drawer.Navigator 
                initialRouteName="Contacts"
                tabBarPosition='bottom'
                screenOptions={{
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarActiveTintColor: colors.blue,
                    tabBarInactiveTintColor: colors.greyDark
                }}>
                <Drawer.Screen
                    name="Contacts"
                    component={ContactsScreens}
                    options={{
                        drawerIcon: getDrawerItemIcon('list')
                    }}
                ></Drawer.Screen>
                <Drawer.Screen
                    name="Favorites"
                    component={FavoritesScreens}
                    options={{
                        drawerIcon: getDrawerItemIcon('star')
                    }}
                ></Drawer.Screen>
                <Drawer.Screen
                    name="Me"
                    component={UserScreens}
                    options={{
                        drawerIcon: getDrawerItemIcon('person')
                    }}
                ></Drawer.Screen>
            </Drawer.Navigator>
        </NavigationContainer>
    )
}