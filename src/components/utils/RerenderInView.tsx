import React from 'react'
import { useInView } from 'react-intersection-observer'

export const RerenderInView = ({
  element
}: {
  element: React.ReactNode
}): JSX.Element => {
  const { ref, inView } = useInView({
    threshold: 0
  })

  return <div ref={ref}>{inView && element}</div>
}
