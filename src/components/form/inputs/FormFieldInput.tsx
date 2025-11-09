import type { HTMLInputTypeAttribute } from 'react'
import type {
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from 'react-hook-form'

import { cn } from '@/utils/cn'

type ComponentProps<T extends FieldValues> = {
  label: Path<T>
  defaultValue?: string | number
  register: UseFormRegister<T>
  inputConfig: RegisterOptions<T>
  type?: HTMLInputTypeAttribute
  className?: string
  price?: boolean
}

function FormFieldInput<T extends FieldValues>({
  label,
  defaultValue,
  register,
  inputConfig,
  type = 'text',
  price,
}: ComponentProps<T>) {
  return (
    <div className='relative flex flex-col gap-1'>
      <label htmlFor={label} className='capitalize'>
        {label}
      </label>
      <input
        className={cn(
          'rounded-lg border-2 border-gray-400 px-2 py-1',
          price && 'pl-7'
        )}
        id={label}
        type={type}
        autoComplete='off'
        defaultValue={defaultValue}
        {...register(label, inputConfig)}
      />
      {price && <span className='absolute top-8.5 left-2'>Rp</span>}
    </div>
  )
}

export default FormFieldInput
