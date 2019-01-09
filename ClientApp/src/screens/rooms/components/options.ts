interface ISelectOptions {
  key: string;
  text: string;
  value: string;
}

export const floorOptions: ISelectOptions[] = [
  { key: '0', text: 'Ground Floor', value: '0' },
  { key: '1', text: 'First', value: '1' },
  { key: '2', text: 'Second', value: '2' },
  { key: '3', text: 'Third', value: '3' },
]

export const roomTypeOptions: ISelectOptions[] = [
  { key: '0', text: 'Group', value: '0' },
  { key: '1', text: 'Conference', value: '1' },
  { key: '2', text: 'Lecture', value: '2' },
  { key: '3', text: 'Single Desk', value: '3' },
]