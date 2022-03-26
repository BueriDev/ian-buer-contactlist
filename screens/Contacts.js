import { getStateFromPath, Link, useNavigationContainerRef } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, Linking } from 'react-native';
import ContactListItem from '../components/ContactListItem';
import { fetchContacts } from '../utils/api';
import colors from '../utils/colors';
import { MaterialIcons } from '@expo/vector-icons';
import store from '../store';
import getURLParams from '../utils/getURLParams';

const keyExtractor = ({ phone }) => phone;

export default class Contacts extends React.Component {
    state = {
        contacts: store.getState().contacts,
        loading: store.getState().isFetchingContacts,
        error: store.getState().error
    };

    static options = ({ navigation: { toggleDrawer }}) => ({
        title: 'Contacts',
        headerLeft: () => (
            <MaterialIcons
                name="menu"
                size={24}
                style={{ color: colors.black, marginLeft: 10}}
                onPress={() => {
                    toggleDrawer();
                }}
            />
        )
    });

    async componentDidMount() {
        try {
            this.unsubscribe = store.onChange(() => {
                this.setState({
                    contacts: store.getState().contacts,
                    loading: store.getState().isFetchingContacts,
                    error: store.getState().error,
                });
            });

            const contacts = await fetchContacts();

            store.setState({ contacts, isFetchingContacts: false });

            this.linkremove = Linking.addEventListener('url', this.handleOpenUrl);

            const url = await Linking.getInitialURL();
            this.handleOpenUrl({ url });

        } catch (e) {
            this.setState({
                loading: false,
                error: true
            });
        }
    }

    componentWillUnmount() {
        if (this.linkremove) {
            this.linkremove();
        }
        this.unsubscribe();
    }

    handleOpenUrl(event) {
        const { navigation: { navigate }} = this.props;
        // console.log(this.props);

        const { url } = event;

        if (url == null) {
            return;
        }

        const params = getURLParams(url);


        if (params.name) {
            const queriedContact = store.getState().contacts.find(contact => {
                var contactName = contact.name.split(' ')[0].toLowerCase();
                var expectedName = params.name.toLowerCase();
                return (contactName === expectedName);
            })
            
            if (queriedContact !== undefined) {
                navigate('ProfileScreen', { contact: queriedContact });
            }
        }
    }

    renderContact = ({ item }) => {
        const { navigation: { navigate }} = this.props;
        const { id, name, avatar, phone } = item;
        return <ContactListItem name={name} avatar={avatar} phone={phone}
            onPress={() => {
                navigate('ProfileScreen', { contact: item })
            }}/>;
    }

    render() {
        const { contacts, loading, error } = this.state;

        const contactsSorted = contacts.sort((a, b) =>
        a.name.localeCompare(b.name));

        return (
            <View style={styles.container}>
                {loading && <ActivityIndicator size="large"/>}
                {error && <Text>Error...</Text>}
                {!loading && !error && (
                    <FlatList 
                        data={contactsSorted}
                        keyExtractor={keyExtractor}
                        renderItem={this.renderContact}
                    />
                )}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        justifyContent: 'center',
        flex: 1,
    }
})