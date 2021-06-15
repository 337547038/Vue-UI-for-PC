export interface AnyPropName {
    [propName: string]: any
}

export interface VoidFun {
    (d?: any): void
}
// radio/checkbox/select
export interface FormControlOption {
    label:string
    value:[string|number]
    disabled?:boolean
    _disabled?:boolean
}
