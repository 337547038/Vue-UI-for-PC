interface TreeList {
  id: string
  label: string
  open?: boolean
  children?: any
  tid?: string
  lazy?: boolean
  hasChild?: boolean
  checked?: boolean
  someChecked?: boolean
}

export {TreeList}
