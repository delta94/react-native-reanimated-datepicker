import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, Platform, Button, Text } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import BottomSheet from "./components/bottomSheet";
import HOC from "./components/refsHoc";
import moment from "moment";

const FORMATS = {
  date: "YYYY-MM-DD",
  datetime: "YYYY-MM-DD HH:mm",
  time: "HH:mm",
};

class index extends Component {
  getDate(date = this.props.date) {
    const { mode, minDate, maxDate, format = FORMATS[mode] } = this.props;
    if (!date) {
      let now = new Date();
      if (minDate) {
        let _minDate = this.getDate(minDate);
        if (now < _minDate) {
          return _minDate;
        }
      }
      if (maxDate) {
        let _maxDate = this.getDate(maxDate);
        if (now > _maxDate) {
          return _maxDate;
        }
      }
      return now;
    }
    if (date instanceof Date) {
      return date;
    }
    return moment(date, format).toDate();
  }

  render() {
    const {
      mode,
      minDate,
      maxDate,
      minuteInterval,
      timeZoneOffsetInMinutes,
      display,
      is24Hour,
      handleDateChanged,
      date,
      cancelBtnText,
      handleCancelBtnPress,
      confirmBtnText,
      handleConfirmButtonPress,
      iosBottomSheetCustomHeader,
      iosBottomSheetContainerStyles,
      iosBottomSheetHeaderStyles,
      iosBottomSheetContentStyles,
      forwardRef,
      iosBottomSheetInitialPosition,
      iosBottomSheetSnapPoints,
      iosBottomSheetBackdrop,
      iosBottomSheetBackDropDismissByPress,
    } = this.props;
    return Platform.OS === "ios" ? (
      <BottomSheet
        bottomSheerColor="#FFFFFF"
        ref={forwardRef}
        initialPosition={
          iosBottomSheetInitialPosition ? iosBottomSheetInitialPosition : 0
        }
        snapPoints={
          iosBottomSheetSnapPoints ? iosBottomSheetSnapPoints : ["40%", 0]
        }
        isBackDrop={iosBottomSheetBackdrop ? iosBottomSheetBackdrop : true}
        isBackDropDismissByPress={
          iosBottomSheetBackDropDismissByPress
            ? iosBottomSheetBackDropDismissByPress
            : false
        }
        isRoundBorderWithTipHeader={false}
        containerStyle={{
          backgroundColor: "#fff",
          ...iosBottomSheetContainerStyles,
        }}
        headerStyle={{ ...iosBottomSheetHeaderStyles }}
        bodyStyle={{
          flex: 1,
          backgroundColor: "rgba(226, 226, 226, 0.7)",
          ...iosBottomSheetContentStyles,
        }}
        header={
          iosBottomSheetCustomHeader ? (
            iosBottomSheetCustomHeader
          ) : (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}>
              <Button
                onPress={handleCancelBtnPress}
                title={cancelBtnText ? cancelBtnText : "Cancel"}
              />
              <Button
                onPress={handleConfirmButtonPress}
                title={confirmBtnText ? confirmBtnText : "Done"}
              />
            </View>
          )
        }
        body={
          <DateTimePicker
            value={date}
            is24Hour={is24Hour === undefined ? false : is24Hour}
            display={display ? display : "default"}
            onChange={handleDateChanged}
            date={date}
            mode={mode ? mode : "date"}
            minimumDate={minDate && this.getDate(minDate)}
            maximumDate={maxDate && this.getDate(maxDate)}
            minuteInterval={minuteInterval ? minuteInterval : null}
            timeZoneOffsetInMinutes={
              timeZoneOffsetInMinutes ? timeZoneOffsetInMinutes : null
            }
          />
        }
      />
    ) : (
      <View>
        <Text>You can render Android version here</Text>
      </View>
    );
  }
}

index.propTypes = {
  date: PropTypes.object.isRequired || PropTypes.string.isRequired,
  handleDateChanged: PropTypes.func.isRequired,
  handleCancelBtnPress: PropTypes.func.isRequired,
  handleConfirmButtonPress: PropTypes.func.isRequired,
  mode: PropTypes.string,
  display: PropTypes.string,
  cancelBtnText: PropTypes.string,
  confirmBtnText: PropTypes.string,
  minDate: PropTypes.object,
  maxDate: PropTypes.object,
  minuteInterval: PropTypes.number,
  timeZoneOffsetInMinutes: PropTypes.number,
  is24Hour: PropTypes.bool,
  iosBottomSheetContainerStyles: PropTypes.object,
  iosBottomSheetHeaderStyles: PropTypes.object,
  iosBottomSheetContentStyles: PropTypes.object,
  iosBottomSheetInitialPosition: PropTypes.string,
  iosBottomSheetSnapPoints: PropTypes.array,
  iosBottomSheetBackdrop: PropTypes.bool,
  iosBottomSheetBackDropDismissByPress: PropTypes.bool,
  iosBottomSheetCustomHeader: PropTypes.node,
};

export default HOC(index);
