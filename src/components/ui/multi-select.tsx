import Select, {
  ActionMeta,
  MultiValue,
  Options,
  components
} from 'react-select'
import { PiCaretDownFill } from 'react-icons/pi'

interface Props {
  options: Options<{ value: string; label: string }>
  placeholder: string
  onChange: (
    newValue: MultiValue<{ value: string; label: string }>,
    actionMeta: ActionMeta<{ value: string; label: string }>
  ) => void
}

export default function MultiSelect({ options, placeholder, onChange }: Props) {
  return (
    <Select
      onChange={onChange}
      placeholder={placeholder}
      components={{
        IndicatorSeparator: () => null,
        DropdownIndicator
        // Control: ControlComponent
      }}
      styles={{
        control: (base) => ({
          ...base,
          border: '2px solid',
          boxShadow: 'none'
        })
      }}
      classNames={{
        container: () => 'w-full',
        control: (state) =>
          state.isFocused ? '!border-theme !border-[2px]' : '!border-theme '
      }}
      isClearable={false}
      closeMenuOnSelect={false}
      options={options}
      isMulti
    />
  )
}

const DropdownIndicator = (props: any) => {
  return (
    components.DropdownIndicator && (
      <components.DropdownIndicator {...props}>
        <PiCaretDownFill />
      </components.DropdownIndicator>
    )
  )
}
