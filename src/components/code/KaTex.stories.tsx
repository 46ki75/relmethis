import type { Meta, StoryObj } from '@storybook/react'
import { KaTex } from './KaTex'

const meta: Meta<typeof KaTex> = {
  title: 'Components/Code/KaTex',
  component: KaTex,
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: { expression: 'c = pmsqrt{a^2 + b^2}', display: true, isDark: false }
}

export const Error: Story = {
  args: {
    expression: 'c = \\',
    display: true,
    isDark: false,
    throwOnError: true
  }
}

export const Inline: Story = {
  render: () => (
    <p>
      Inline math example:
      <KaTex expression='c = pmsqrt{a^2 + b^2}' display={false} />
    </p>
  )
}

export const Dark: Story = {
  args: { expression: 'E = mc^2', display: true, isDark: true }
}

export const Complex: Story = {
  args: {
    expression:
      'i\\hbar \\frac{\\partial}{\\partial t} \\Psi(\\mathbf{r}, t) = \\left( -\\frac{\\hbar^2}{2m} \\nabla^2 + V(\\mathbf{r}, t) \\right) \\Psi(\\mathbf{r}, t)',
    display: true
  }
}
