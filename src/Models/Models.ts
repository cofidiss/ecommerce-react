import type { ReactNode } from "react";


export type AppContextType = {
  loading: boolean;
  startLoading: () => void;
  stopLoading: () => void;
  setModal1State: (modalProps: Omit<CustomModalProps, 'onClose'>) => void; // Method to set modal state
  setModal2State: (modalProps: Omit<CustomModalProps, 'onClose'>) => void; // Method to set modal state
  refreshNavbar: () => void;
  setIsLoggedIn: (param: boolean) => void;
  userRoles: UserRole[];
  setUserRoles: React.Dispatch<React.SetStateAction<UserRole[]>>;
  isLoggedIn: boolean;
  globalCss: globalCss;

}

export type CustomModalProps= {
  isOpen: boolean;
  title?: string;
  message?: string;
  okButtonText?: string;
  okButtonClick?: () => void;
  leftButtonText?: string;
  leftButtonClick?: () => void;
  rightButtonText?: string;
  rightButtonClick?: () => void;
  children?: ReactNode;
}
export enum UserRole {
  read,
  write,
  delete
}

export type globalCss = {
  componentBackgroundColor: string;
};

