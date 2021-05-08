import { DevtoolsDetail } from './devtools-detail.type';

export type DevtoolsDetectorListener = (
  isOpen: boolean,
  detail?: DevtoolsDetail
) => void;
