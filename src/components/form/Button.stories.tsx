import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'
import { useEffect, useState } from 'react'

const meta: Meta<typeof Button> = {
  title: 'Components/Form/Button',
  component: Button,
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    children: <>sumbit</>
  },
  render: (args) => {
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
      let timer: number
      if (isLoading) {
        timer = window.setTimeout(() => {
          setIsLoading(false)
        }, 2500)
      }
      return () => clearTimeout(timer)
    }, [isLoading])

    return (
      <>
        <Button
          {...args}
          isLoading={isLoading}
          onClick={() => {
            setIsLoading(true)
          }}
        ></Button>
        <span>{String(isLoading)}</span>
      </>
    )
  }
}
