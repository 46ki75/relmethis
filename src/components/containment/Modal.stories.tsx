import type { Meta, StoryObj } from '@storybook/react'
import { Modal } from './Modal'
import { useState } from 'react'

const meta: Meta<typeof Modal> = {
  title: 'Components/Containment/Modal',
  component: Modal,
  tags: ['autodocs'],
  args: { isDark: false }
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: { style: {} },
  render: () => {
    const [isVisible, setIsVisible] = useState(false)

    return (
      <>
        <button
          onClick={() => {
            setIsVisible(true)
          }}
        >
          open
        </button>
        <button
          onClick={() => {
            setIsVisible(false)
          }}
        >
          close
        </button>
        <Modal visible={isVisible}>
          <div>Hello, world! sup?</div>
          <button
            onClick={() => {
              setIsVisible(false)
            }}
          >
            close
          </button>
        </Modal>
      </>
    )
  }
}
