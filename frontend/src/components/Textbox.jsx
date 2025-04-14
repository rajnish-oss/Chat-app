import React from 'react'
import clsx from 'clsx'

const Textbox = (
    ({label,name,className,type,placeholder,register,error}) => {
        return(
            <div className="">
                {label && (
                    <label htmlFor={name} className='text-gray-200' >{name}</label>
                )}
            <div className="!mb-6">
                <input
                 type={type}
                 name={name}
                 className={clsx("p-2 rounded-md bg-blue-100 h-7 w-84",className)}
                 {...register}
                 aria-invalid={error?"true":"false"}
                 placeholder={placeholder}
                  />
            </div>
            {error && (
                <span className='text-red-600'>
                    {error}
                </span>
            )}
            </div>
        )
    }
)

export default Textbox