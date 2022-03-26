import React from 'react';
import { StyleSheet, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import DetailListItem from '../components/DetailListItem';
import colors from '../utils/colors';
import { DEFAULT_ICON_COLOR } from '@expo/vector-icons/build/createIconSet';

export default class Options extends React.Component {
    static options = ( { navigation: { goBack }}) => ({
        title: 'Options',
        headerLeft: () => (
            <MaterialIcons
                name="close"
                size={24}
                style={{color : colors.black, marginLeft: 10}}
                onPress={() => {
                    goBack();
                }}
            />
        )
    });

    render() {
        return (
            <View style={styles.container}>
                <DetailListItem title="Update Profile"/>
                <DetailListItem title="Change Language"/>
                <DetailListItem title="Sign Out"/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    }
});