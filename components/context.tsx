import {createContext} from "react";

type SetValueBool = (_value: boolean) => void;
type SetValueNumber = (_value: number) => void;
type SetValueString = (_value: string) => void;
type SetValueAny = (_value: (oldArray: any) => any[]) => void;


type ContextType = {
    breakP:boolean
    setBreakP: SetValueBool;
    setCollapse: SetValueBool;
};

export const Context = createContext<ContextType>({
    setBreakP:() => {},
    setCollapse:() => {},
    breakP: false,
})