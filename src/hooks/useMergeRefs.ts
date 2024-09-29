'use client'

export const useMergeRefs = <T>(
  ...refs: React.Ref<T>[]
): React.RefCallback<T> => {
  return (value: T) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(value)
      } else if (ref) {
        // eslint-disable-next-line no-extra-semi
        ;(ref as React.MutableRefObject<T | null>).current = value
      }
    })
  }
}
