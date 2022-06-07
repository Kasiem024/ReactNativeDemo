'use strict';

// Importing the React Native modules
import React, { useState, useEffect } from 'react';
// useEffect is a hook, it is called when the component is rendered
// usestate is a hook, that allows you to use state in a functional component (like a class)

import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image,
    TextInput,
    Button,
    Pressable,
    FlatList,
    SectionList,
    ActivityIndicator,
} from 'react-native';

// Used to navigate between screens, and to pass data between screens
// since React Native doesn't have a built-in navigation system
// More info: https://reactnative.dev/docs/navigation
// More info: https://reactnavigation.org/docs/getting-started
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Defining the styles
const styles = StyleSheet.create({
    container: {
        flex: 1, // Makes the container take up the entire screen (height)
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        paddingTop: 50,
        margin: 50,
    },
    button: {
        alignItems: 'center',
        backgroundColor: 'lightblue',
        padding: 10,
        margin: 10
    },
    image: { width: 200, height: 200 },
    textInput: {
        borderColor: 'gray',
        borderWidth: 1,
        padding: 10,
        backgroundColor: 'white',
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
    sectionHeader: {
        padding: 10,
        fontSize: 14,
        fontWeight: 'bold',
        backgroundColor: 'rgba(247,247,247,1.0)',
    },
    btnNormal: {
        borderColor: 'blue',
        borderWidth: 1,
        borderRadius: 10,
        height: 30,
        width: 100,
    },
    btnPress: {
        borderColor: 'blue',
        borderWidth: 1,
        height: 30,
        width: 100,
    }
});


const Stack = createNativeStackNavigator();
// Returns object containing props: Navigator, Group and Screen

// Styles for the screens in the navigation app
// Can used as global styles for multiple screens
const screenStyles = { headerStyle: { backgroundColor: 'papayawhip' } }

// App that demonstrates the Navigation between screens/components/functions/pages
// Basically like a router file in NodeJS
// Each screen is a component
const NavigationDemo = () => {
    return (
        <NavigationContainer>
            {/* NavigationContainer:
            Component used to wrap whole app inside */}

            <Stack.Navigator initialRouteName="Home" screenOptions={screenStyles}>
                {/* initialRouteName is which component to render first (index)
                whatever is inside screenOptions applies to all screens inside the component */}

                <Stack.Group >
                    {/* Group:
                    Component used to group several screens, returned from createNativeStackNavigator,
                    screenOptions can be used here */}

                    <Stack.Screen
                        // Screen is similiar to a route in NodeJS
                        name="Home" // Name of the screen, Required
                        component={HomeScreen} // Component to render, Required
                        options={
                            // Options for the screen, Optional 
                            // More info: https://reactnavigation.org/docs/native-stack-navigator/
                            {
                                title: 'Welcome',
                            }
                        }
                    />

                    {componentArr.map((item) => (
                        <Stack.Screen key={item.key} name={item.key} component={item.component} />
                    ))}

                    <Stack.Screen name="NavigationParamsExample" component={NavigationParamsExample} />
                    <Stack.Screen name="CreatePostScreen" component={CreatePostScreen} />
                </Stack.Group>
            </Stack.Navigator>
        </NavigationContainer>
    );
};


const HomeScreen = ({ navigation, route }) => {
    // navigation is an object/prop that contains methods to navigate to other screens

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text>Home Screen</Text>

            {componentArr.map((item) => (
                <Pressable key={item.key} style={styles.button}
                    onPress={() => navigation.navigate(item.key)}>
                    <Text>
                        {item.key}
                    </Text>
                </Pressable>
            ))}

            <Pressable
                style={styles.button}
                onPress={() => navigation.navigate('NavigationParamsExample', {
                    itemId: 86,
                    otherParam: 'Random param',
                })}
            >
                <Text>NavigationParamsExample</Text>
            </Pressable>

            <Pressable
                style={styles.button}
                onPress={() => navigation.navigate('CreatePostScreen', {
                    post: route.params?.post
                })}
            >
                <Text>NavigationParamsExample</Text>
                <Text>Post: {route.params?.post}</Text>
                {/* If route.params.post exists show it */}
            </Pressable>
        </ScrollView>
    );
}

// App that shows the core react native components
const CoreComponentsApp = () => {
    return (
        /* ScrollView (div):
        A generic scrolling container that can contains multiple components and views
        bad for performance, generally used for small lists */
        <ScrollView>

            {/* Text (p):
            Displays, styles, and nests strings of text and even handles touch events */}
            <Text>Some text</Text>

            {/* View (div):
            A container that supports layout with flexbox, style, some touch handling, and accessibility controls */}
            <View>
                <Text>Some more text</Text>

                {/* Image (img):
                Displays different types of images */}
                <Image
                    // Images need a source and a style (width and height) to be displayed
                    source={{
                        uri: 'https://reactnative.dev/docs/assets/p_cat2.png',
                    }}
                    style={styles.image}
                />
            </View>

            {/* TextInput (input):
             Allows the user to enter text */}
            <TextInput
                style={styles.textInput}
                defaultValue='You can type in me'
            />
        </ScrollView>
    );
}

// App that counts the number of times the button is pressed
const CounterApp = () => {
    // Defining the function that will be called when the button is pressed,
    // and that will increment the count, defaulting to 0
    const [count, setCount] = useState(0);

    return (
        <View style={styles.container}>

            <Text>You clicked {count} times</Text>

            {/* When button is pressed setCount increments count */}
            <Button
                onPress={() => setCount(count + 1)}
                title='Click me!'
            />
        </View>
    );
};

// Child component of the CatCafeApp1
// Shows the cat's name and image
const Cat1 = (cat) => {
    return (
        <View style={styles.container}>
            <Text>Hello {cat.firstName} {cat.lastName}!</Text>
            <Image source={{ uri: cat.source }} style={styles.image}></Image>
        </View>
    );
}

// Parent component of Cat1
// Passes the cat's name and image uri to the child component
const CatCafeApp1 = () => {
    return (
        <View style={styles.container}>
            {/* Passing properties to Cat1 */}
            <Cat1 firstName='Big' lastName='Worth' source='https://reactnative.dev/docs/assets/p_cat1.png' />
            <Cat1 firstName='Small' lastName='Worth' source='https://reactnative.dev/docs/assets/p_cat1.png' />
        </View>
    );
}

/* Child component of CatCafeApp2
Shows the cat's name, its hunger
and a button that will change the cat's hunger */
const Cat2 = (cat) => {
    const [isHungry, setIsHungry] = useState(true);

    return (
        <View style={styles.container}>
            {/* If hungry is true will display "yes", otherwise "no" */}
            <Text>Hello {cat.firstName} {cat.lastName}! Are you hungry: {isHungry ? "yes" : "no"}</Text>

            {/* When button is pressed isHungry switches */}
            <Button
                onPress={() => {
                    isHungry ? setIsHungry(false) : setIsHungry(true);
                }}
                // Depending on if isHungry is true or false will display different text
                title={isHungry ? 'Pour me some milk, please!' : 'Thank you!'}
            />
        </View>
    );
}

// Parent component of Cat1
// Passes the cat's name to the child component
const CatCafeApp2 = () => {
    return (
        /* Using the JSX syntax, this is called a fragment,
        Some JSX elements need to be wrapped in an enclosing tag.
        Fragments can be used instead of <View> */
        <>
            <Cat2 firstName='Big' lastName='Worth' />
            <Cat2 firstName='Small' lastName='Worth' />
        </>
    );
}

const TextTranslatorApp = () => {
    const [text, setText] = useState('');

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.textInput}
                placeholder="Type here to translate!"
                onChangeText={(newText) => setText(newText)} // When text is changed, setText will update text
                defaultValue={text} />

            {/* For every word in the input writes "word" */}
            <Text>{text.split(' ').map((word) => word && 'word').join(' ')} </Text>
        </View>
    );
}

// App that shows a list of items using a FlatList
const FlatListBasicsApp = () => {
    return (
        <View style={styles.container}>
            {/* FlatList:
            Displays a scrolling list of changing, but similarly structured, data 
            Only renders what is shown on the screen, good for long lists 
            Requires data and renderItem */}
            <FlatList
                data={[
                    { key: 'Devin' },
                    { key: 'Dan' },
                    { key: 'Dominic' },
                    { key: 'Jackson' },
                    { key: 'James' },
                    { key: 'Joel' },
                    { key: 'John' },
                    { key: 'Jillian' },
                    { key: 'Jimmy' },
                    { key: 'Julie' },
                ]}
                // renderItem loops through the data and returns a formatted component to render
                // item is the current data in the loop
                renderItem={({ item }) => <Text style={styles.item}>{item.key}</Text>}
            />
        </View>
    );
}

// App that shows a list of items using a SectionList
const SectionListBasicsApp = () => {
    return (
        <View style={styles.container}>
            {/* SectionList:
            Similiar to FlatList, but displays sections instead of a list of items
            Requires sections and renderItem, renderSectionHeader is optional */}
            <SectionList
                sections={[
                    { title: 'D', data: ['Devin', 'Dan', 'Dominic'] },
                    { title: 'J', data: ['Jackson', 'James', 'Jillian', 'Jimmy', 'Joel', 'John', 'Julie'] },
                ]}
                renderItem={({ item }) => <Text style={styles.item}>{item}</Text>}
                renderSectionHeader={({ section }) => <Text style={styles.sectionHeader}>{section.title}</Text>}
                // keyExtractor is used to identify each item in the list
                keyExtractor={(item, index) => index}
            />
        </View>
    );
}

// App that demonstrates the use of Fetch API, useEffect and ActivityIndicator
const NetoworkingDemo = () => {

    const [isLoading, setLoading] = useState(true); // Used for ActivityIndicator
    const [data, setData] = useState([]);

    const getMovies = async () => {

        return await fetch('https://reactnative.dev/movies.json')
            // fetch on mobile works differently than in the browser
            // also different depending on iOS or Android
            // all this for security reasons
            // more info: https://reactnative.dev/docs/network
            .then((response) => response.json())
            .then((json) => {
                setData(json.movies);
            }).catch((error) => {
                console.error(error);
            }).finally(() => {
                setLoading(false);
            });
    }

    useEffect(() => {
        // useEffect is a lifecycle method that runs after the component mounts
        // useEffect is used to run code after the component mounts
        // Similar to componentDidMount and componentDidUpdate in React or window.onload in the browser
        getMovies();
    }, []);

    return (
        <View style={styles.container}>
            {isLoading ? <ActivityIndicator /> : (
                // ActivityIndicator is a component that shows a spinning wheel
                // Used to show that the app is loading, can have CSS styling
                <FlatList
                    data={data}
                    keyExtractor={({ id }, index) => id}
                    renderItem={({ item }) => (
                        <Text>{item.title}, {item.releaseYear}</Text>
                    )}
                />
            )}
        </View>
    );
}

// Component for the NavigationExample screen
// Shows different ways to navigate to other screens
const NavigationExample = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text>NavigationExample Screen</Text>
            <Pressable
                style={styles.button}
                onPress={() => navigation.navigate('Home')}
            // navigate is a method that takes a screen name and navigates to it
            // takes into account the current screen and the screens in the stack
            // the 'stack' is the list of screens that are currently rendered (history)
            >
                <Text>Go to Home (navigate)</Text>
            </Pressable>
            <Pressable
                style={styles.button}
                onPress={() => navigation.push('Home')}
            // push is a method that takes a screen name and navigates to it
            // does not take into account the screens in the stack
            // push adds a new screen/route to the stack
            // basically a new 'Home' screen is rendered instead of going BACK to Home
            >
                <Text>Go to Home (push)</Text>
            </Pressable>
            <Pressable
                style={styles.button}
                onPress={() => navigation.push('NavigationExample')}
            >
                <Text>Go to NavigationExample again (push)</Text>
            </Pressable>
            <Pressable
                style={styles.button}
                onPress={() => navigation.goBack()}
            // goBack is a method that takes you back to the previous screen
            // same as back button on the top left of the screen
            >
                <Text>Go back (goBack)</Text>
            </Pressable>
            <Pressable
                style={styles.button}
                onPress={() => navigation.popToTop()}
            // popToTop is a method that takes you back to the first screen in the stack
            >
                <Text>Go back to first screen in stack (popToTop)</Text>
            </Pressable>
        </View>
    );
}

// Component for the NavigationParamsExample screen
// Shows how to get params from the previous screen
// and set params for the next screen
const NavigationParamsExample = ({ route, navigation }) => {

    const { itemId, otherParam } = route.params;
    // Destructuring params from route object
    // More info: https://reactnavigation.org/docs/params/

    return (
        <View style={styles.container}>
            <Text>NavigationParamsExample Screen</Text>
            <Text>itemId: {JSON.stringify(itemId)}</Text>
            <Text>otherParam: {JSON.stringify(otherParam)}</Text>
            <Pressable
                style={styles.button}
                onPress={() =>
                    navigation.push('NavigationParamsExample', {
                        itemId: Math.floor(Math.random() * 100),
                    })}
            >
                <Text>Go to NavigationExample again</Text>
            </Pressable>
        </View>
    );
}

// Component for the CreatePostScreen screen
// Shows how to create a param and pass it to another screen
const CreatePostScreen = ({ navigation, route }) => {
    const [postText, setPostText] = React.useState('');

    return (
        <>
            <TextInput
                multiline
                placeholder="Write some text"
                style={styles.textInput}
                defaultValue={route.params?.post}
                onChangeText={setPostText}
            />
            <Button
                title="Done"
                onPress={() => {
                    // Pass and merge params back to home screen
                    navigation.navigate({
                        name: 'Home',
                        params: { post: postText },
                    });
                }}
            />
        </>
    );
}

// Array of components to render in the stack
const componentArr = [
    { key: 'CoreComponentsApp', component: CoreComponentsApp },
    { key: 'CounterApp', component: CounterApp },
    { key: 'CatCafeApp1', component: CatCafeApp1 },
    { key: 'CatCafeApp2', component: CatCafeApp2 },
    { key: 'TextTranslatorApp', component: TextTranslatorApp },
    { key: 'FlatListBasicsApp', component: FlatListBasicsApp },
    { key: 'SectionListBasicsApp', component: SectionListBasicsApp },
    { key: 'NetoworkingDemo', component: NetoworkingDemo },
    { key: 'NavigationExample', component: NavigationExample },
];

export default NavigationDemo;