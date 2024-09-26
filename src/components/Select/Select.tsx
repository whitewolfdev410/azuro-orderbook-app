import Icons from '@/icons'
import { SelectProps } from './props'

export default function Select({
  options,
  value,
  onSelect,
}: Readonly<SelectProps>) {
  return (
    <div className="relative inline-block w-46">
      <select
        value={value ?? options[0]}
        className="text-white block appearance-none w-full bg-[#FFFFFF0D] border-gray-300 hover:border-gray-500 px-4 py-2 pr-8 rounded-3xl shadow leading-tight focus:outline-none focus:shadow-outline"
        onChange={(e) => onSelect(e.target.value)}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <Icons name="dropdown" color="#FFFFFF" />
      </div>
    </div>
  )
}
