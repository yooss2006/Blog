import { create } from "zustand";

export enum ViewType {
  Normal = "normal", //작성일 보기
  Date = "date", //기본 보기
}

type Props = {
  text: string;
  viewType: ViewType;
  onTextChange: (text: string) => void;
  onViewTypeChange: (viewType: ViewType) => void;
};

export const useSearch = create<Props>()((set) => ({
  text: "",
  viewType: ViewType.Normal,
  onTextChange: (text) => set({ text }),
  onViewTypeChange: (viewType) => set({ viewType }),
}));
