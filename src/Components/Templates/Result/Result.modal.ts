import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { DateData } from "react-native-calendars";

export type ResultItem = {
  id: string;
  subject: string;
  topic: string;
  marks: string;
  bgColor: string;
};

type RootStackParamList = {
  Result: undefined;
  ResultDetails: { item: ResultItem };
};

export type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Result'>;

type CustomMarking = {
  selected?: boolean;
  customStyles?: {
    container?: object;
    text?: object;
  };
};

export type DayComponentProps = {
  date?: DateData;
  state?: 'selected' | 'disabled' | 'today' | '';
  marking?: CustomMarking;
  setSelectedDate: (dateString: string) => void;
  setCalendarVisible: (visible: boolean) => void;
};