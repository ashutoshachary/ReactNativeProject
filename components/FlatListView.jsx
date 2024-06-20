import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, Alert, SafeAreaView } from 'react-native';

export default function FlatListComponent1() {
    const [isRefreshing, setisRefreshing] = useState(false);

    const data = [
        { id: 1, name: 'John' },
        { id: 2, name: 'Jane' },
        { id: 3, name: 'Mary' },
        { id: 4, name: 'Peter' },
        { id: 5, name: 'Lisa' },
        { id: 6, name: 'Kate' },
        { id: 7, name: 'Mary' },
        { id: 8, name: 'Peter' },
        { id: 9, name: 'Lisa' },
        { id: 10, name: 'Kate' },
        { id: 11, name: 'Mary' },
    ];

    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <Text style={styles.itemText}>{item.name}</Text>
        </View>
    );

    const onRefresh = () => {
        setisRefreshing(true);
        Alert.alert('List Refreshed', 'The list has been refreshed successfully.', [{ text: 'OK' }]);
        setTimeout(() => {
            setisRefreshing(false);
        }, 2000); // simulate a network request
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.headerText}>FlatListComponent1</Text>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
                extraData={isRefreshing}
                onRefresh={onRefresh}
                refreshing={isRefreshing}
                contentContainerStyle={styles.list}
                invrted={false}
                horizontal={false}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        paddingHorizontal: 10,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 10,
    },
    list: {
        paddingBottom: 20,
    },
    itemContainer: {
        backgroundColor: '#fff',
        padding: 15,
        marginVertical: 8,
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 1,
    },
    itemText: {
        fontSize: 18,
    },
});
