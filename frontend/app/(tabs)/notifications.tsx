import { Text, View, StyleSheet, FlatList } from 'react-native';
import NotificationCard from '@/components/NotificationCard';

export default function Notifications() {
  const notificationData = [
    {
      id: 1,
      label: 'Daily Lifestyle Tips',
      desc: 'Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet, ipsum dolor',
      type: 'message',
    },
    {
      id: 2,
      label: 'Appointment Reminder',
      desc: 'You have an appointment tomorrow at 10 AM.',
      type: 'appointment',
    },
    {
      id: 3,
      label: 'Medication Reminder',
      desc: 'Don\'t forget to take your medication today.',
      type: 'medication',
    },
    {
      id: 4,
      label: 'New App Update',
      desc: 'Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet, ipsum dolor',
      // No type
    },
    {
      id: 5,
      label: 'Daily Sleep Tips',
      desc: 'Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet, ipsum dolor',
      type: 'message',
    },
    {
      id: 6,
      label: 'Appointment Reminder',
      desc: 'You have an appointment today at 11 AM.',
      type: 'appointment',
    },
    {
      id: 7,
      label: 'Daily Eating Tips',
      desc: 'Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet, ipsum dolor',
      type: 'message',
    },
    {
      id: 8,
      label: 'Daily Fitness Tips',
      desc: 'Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet, ipsum dolor',
      type: 'message',
    },
  ];

  const getColorForType = (type: string | undefined) => {
    switch (type) {
      case 'appointment':
        return '#7043CF';
      case 'medication':
        return '#FEC62F';
      case 'message':
        return '#29C9FB';
      default:
        return '#A8A8A8'; 
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Notifications</Text>
      </View>
      <View style={styles.notifContainer}>
        <FlatList
          data={notificationData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <NotificationCard
              label={item.label}
              desc={item.desc}
              colour={getColorForType(item.type)} 
            />
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    height: 100,
    width: '100%',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: 22,
    fontFamily: 'Raleway-Bold',
    color: '#432C81',
  },
  headerText: {
    fontSize: 22,
    fontFamily: 'Raleway-Bold',
    color: '#432C81',
  },
  notifContainer: {
    flex: 1,
  },
});
