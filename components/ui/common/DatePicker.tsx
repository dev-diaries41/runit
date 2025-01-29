import React, {Dispatch, SetStateAction, useState} from 'react';
import {View} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

interface DatePickerProps {
  mode: 'date' | 'time';
  visible: boolean;
  onClose: Dispatch<SetStateAction<boolean>>;
  onSelectedValueChanged?: (selectedDate: Date) => void;
}

const DatePicker = ({mode, visible, onClose, onSelectedValueChanged}: DatePickerProps) => {
  const [date, setDate] = useState(new Date());

  const handleOnChange = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || date;
    onClose(false);
    if (onSelectedValueChanged) {
      onSelectedValueChanged(currentDate);
    }
    setDate(currentDate);
  };

  return (
    <View style={{flex: 1}}>
      {visible ? (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={handleOnChange}
        />
      ) : null}
    </View>
  );
};

export default DatePicker;