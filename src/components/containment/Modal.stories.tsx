import type { Meta, StoryObj } from '@storybook/react'
import { Modal } from './Modal'
import { useState } from 'react'

const meta: Meta<typeof Modal> = {
  title: 'Components/Containment/Modal',
  component: Modal,
  tags: ['autodocs'],
  render: (args) => {
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
        <Modal {...args} visible={isVisible}>
          <h2>Hello, world! sup?</h2>
          <p>
            Eu fugiat irure quis dolore dolore exercitation culpa aute magna
            cillum labore excepteur esse. Minim do dolor do officia duis aliqua
            magna non exercitation. Nostrud consectetur anim irure do dolor
            pariatur non in ea magna ipsum. Sunt reprehenderit anim officia
            Lorem qui minim aliqua mollit cupidatat. Sit in ea aliquip sunt anim
            ea irure commodo. Sunt minim veniam eu aliquip labore esse.
          </p>

          <p>
            Consectetur nostrud cupidatat incididunt aliqua est exercitation
            anim culpa aliqua non nulla veniam esse magna. Minim nulla non
            mollit commodo. Labore Lorem consectetur sit culpa nulla nulla quis
            quis non. Enim commodo Lorem nostrud labore eu in duis elit tempor.
            Labore cillum incididunt sint ut ipsum officia laborum quis. In
            consequat exercitation excepteur adipisicing. Irure aute labore
            dolor Lorem reprehenderit.
          </p>
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

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: { title: 'Notice!' }
}

export const NoTitle: Story = {}
