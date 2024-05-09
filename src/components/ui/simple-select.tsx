import Select, {
  ActionMeta,
  Options,
  SingleValue,
  components
} from 'react-select'
import { PiCaretDownFill } from 'react-icons/pi'

interface Props {
  options: Options<{ value: string; label: string }>
  placeholder?: string
  defaultValue: { value: string; label: string } | null
  onChange: (
    newValue: SingleValue<{ value: string; label: string }>,
    actionMeta: ActionMeta<{ value: string; label: string }>
  ) => void
}

export default function SimpleSelect({
  options,
  defaultValue,
  placeholder,
  onChange
}: Props) {
  return (
    <Select
      onChange={onChange}
      defaultValue={defaultValue}
      placeholder={placeholder}
      isSearchable={false}
      components={{
        IndicatorSeparator: () => null,
        DropdownIndicator
      }}
      noOptionsMessage={() => <></>}
      styles={{
        control: (base) => ({
          ...base,
          border: '2px solid',
          boxShadow: 'none'
        }),
        noOptionsMessage: () => ({
          background: 'transparent',
          height: '64px'
        }),

        menu: (base) => ({
          ...base,
          border: 'none',
          boxShadow: 'none',
          margin: '0'
        }),
        menuList: () => ({
          background: 'transparent',
          border: 'none'
        })
      }}
      classNames={{
        container: () => 'w-full',
        control: () => '!border-0 outline-0 !bg-transparent',
        menu: () => '!border-0'
      }}
      isClearable={false}
      closeMenuOnSelect={true}
      options={options}
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
