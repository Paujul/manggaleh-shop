// import classNames from 'classnames';
import clsx from 'clsx'
import { type ComponentPropsWithoutRef, type FC, memo } from 'react'

// import styles from './globals.css'

type SkeletonProps = ComponentPropsWithoutRef<'div'>

const Skeleton: FC<SkeletonProps> = ({ className, ...rest }) => {
  return (
    <div
      className={clsx('animate-shimmer bg-[#f6f7f8]', className)}
      style={{
        backgroundImage:
          'linear-gradient(to right, #f6f7f8 0%, #edeef1 20%, #f6f7f8 40%, #f6f7f8 100%)',
        backgroundSize: '700px 100%',
        backgroundRepeat: 'no-repeat',
      }}
      {...rest}
    />
  )
}

export default memo(Skeleton)
