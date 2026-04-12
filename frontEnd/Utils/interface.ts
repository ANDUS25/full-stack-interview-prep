interface SubjectDataInterface {
  answer: string;
  createdAt: string;
  note: string;
  question: string;
  subject: string;
  updatedAt: string;
  __v: number;
  _id: string;
}

interface DeleteModalInterface {
  data: string;
  value: boolean;
}

interface CustomModalProps {
  header: string;
  visible: boolean;
  onPressNo?: () => void;
  onPressYes?: () => void;
  onPress?: () => void;
  showMultipleButtons: boolean;
  title?: string;
}

interface SubjectRenderItemInterface {
  index: number;
  item: SubjectDataInterface;
}

export type {
  SubjectDataInterface,
  DeleteModalInterface,
  CustomModalProps,
  SubjectRenderItemInterface,
};
