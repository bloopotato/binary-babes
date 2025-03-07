import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Agenda } from 'react-native-calendars';

interface Day {
  dateString: string;
  timestamp: number;
}

interface Event {
  id: number;
  type: string;
  name: string;
  time: string;
}

interface ScheduleData {
  [key: string]: Event[];
}

const convertTimeToMinutes = (timeString: string): number => {
  const [time, period] = timeString.split(' ');
  let [hours, minutes] = time.split(':').map(Number);

  if (period === 'PM' && hours !== 12) hours += 12;
  if (period === 'AM' && hours === 12) hours = 0;

  return hours * 60 + minutes;
};

const getTodayDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const Appointments = () => {
  const scheduleData: ScheduleData = {
    "2025-03-10": [
      { id: 1, type: "Appointment", name: "Doctor Visit", time: "7:00 AM" },
      { id: 2, type: "Medication", name: "Painkiller", time: "6:00 AM" }
    ],
    "2025-03-17": [
      { id: 1, type: "Appointment", name: "Hospital Checkup", time: "10:00 AM" },
      { id: 2, type: "Appointment", name: "Doctor Visit", time: "11:00 AM" },
      { id: 3, type: "Medication", name: "Vitamin D", time: "8:00 AM" },
      { id: 4, type: "Medication", name: "Vitamin D", time: "8:00 PM" }
    ],
    "2025-03-12": [{ id: 3, type: "Medication", name: "Painkiller", time: "9:00 AM" }],
    "2025-03-15": [{ id: 4, type: "Appointment", name: "Dentist", time: "11:30 AM" }],
  };

  // Sort events by time for each day
  const sortedItems: ScheduleData = Object.keys(scheduleData).reduce((acc, date) => {
    acc[date] = scheduleData[date].sort((a, b) => convertTimeToMinutes(a.time) - convertTimeToMinutes(b.time));
    return acc;
  }, {} as ScheduleData);

  const todayDate = getTodayDate();
  const [selectedDate, setSelectedDate] = useState(todayDate); 
  const startDate = "2025-01-01"; // Earliest date scrollable
  const endDate = "2025-12-31"; // Last to scroll to
  const allDates = [];
  let currentDate = startDate;

  while (currentDate <= endDate) {
    allDates.push(currentDate);
    currentDate = new Date(new Date(currentDate).setDate(new Date(currentDate).getDate() + 1)).toISOString().split('T')[0];
  }

  allDates.forEach((date) => {
    if (!sortedItems[date]) {
      sortedItems[date] = [];
    }
  });

  const onDayPress = useCallback((day: Day) => {
    setSelectedDate(day.dateString);
  }, []);

  return (
    <View style={styles.container}>
      <Agenda
        items={sortedItems}
        selected={selectedDate}
        onDayPress={onDayPress} 
        showClosingKnob
        renderItem={(item: Event) => (
          <View style={[styles.item, item.type === 'Appointment' ? styles.appointment : styles.medication]}>
            <Text style={styles.itemText}>
              {item.time} - {item.name}
            </Text>
          </View>
        )}
        renderEmptyDate={() => <View></View>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#FFF' 
  },
  item: { 
    padding: 20, 
    borderRadius: 5, 
    marginVertical: 5, 
    marginHorizontal: 10 
  },
  appointment: { 
    backgroundColor: '#56428F' 
  }, 
  medication: { 
    backgroundColor: '#7B6BA8' 
  }, 
  itemText: { 
    fontSize: 14,
    fontFamily: 'Raleway',
    fontWeight: 'bold',
    color: '#EDECF4'
  },
});

export default Appointments;
