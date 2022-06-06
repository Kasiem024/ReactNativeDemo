'use strict';

// Importing the React Native modules
import React, { Component, useState, useEffect } from 'react';
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
    FlatList,
    SectionList,
    ActivityIndicator,
} from 'react-native';

// Defining the styles
const styles = StyleSheet.create({
    container: {
        flex: 1, // Makes the container take up the entire screen (height)
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        paddingTop: 50,
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10,
        marginBottom: 10
    },
    image: { width: 200, height: 200 },
    textInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1
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

const FlexExampleApp = () => {
    return (
        <View style={[{
            flex: 1,
            padding: 20,
            flexDirection: "row",
        }]}>
            <View style={{ flex: 1, backgroundColor: "red" }} />
            <View style={{ flex: 2, backgroundColor: "darkorange" }} />
            <View style={{ flex: 3, backgroundColor: "green" }} />
        </View>
    );
};

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
                // When text is changed, setText will update text
                onChangeText={(newText) => setText(newText)}
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

export default NetoworkingDemo;