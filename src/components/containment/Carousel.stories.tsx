import type { Meta, StoryObj } from '@storybook/react'
import { Carousel } from './Carousel'
import { ReactNode } from 'react'
import { CodeBlock } from '../code/CodeBlock'
import { ImageWithModal } from '../image/ImageWithModal'

const meta: Meta<typeof Carousel> = {
  title: 'Components/Containment/Carousel',
  component: Carousel,
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof meta>

const contentTemplate = (children: ReactNode, height?: string) => (
  <div
    style={{
      display: 'flex',
      boxSizing: 'border-box',
      justifyContent: 'center',
      alignItems: 'center',
      height: height ?? '15rem',
      width: '100%',
      border: 'solid 1px gray'
    }}
  >
    <span>{children}</span>
  </div>
)

export const Primary: Story = {
  args: {
    children: ['Page 1', 'Page 2', 'Page 3', 'Page 4'].map((c) =>
      contentTemplate(c)
    )
  }
}

export const DifferentSizes: Story = {
  args: {
    children: [
      ...['Page 1', 'Page 2', 'Page 3', 'Page 4'].map((c, i) =>
        contentTemplate(c, `${10 * i + 5}rem`)
      )
    ],
    autoResize: true
  }
}

const rustCode = `
fn main() {
    let numbers = vec![1, 2, 3, 4, 5];
    let sum: i32 = numbers.iter().sum();
    println!("Sum: {}", sum);

    let doubled: Vec<i32> = numbers.iter().map(|x| x * 2).collect();
    println!("Doubled: {:?}", doubled);

    for num in &numbers {
        println!("Number: {}", num);
    }
}
`

const javaCode = `
import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        int[] numbers = {1, 2, 3, 4, 5};
        int sum = Arrays.stream(numbers).sum();
        System.out.println("Sum: " + sum);

        int[] doubled = Arrays.stream(numbers).map(n -> n * 2).toArray();
        System.out.println("Doubled: " + Arrays.toString(doubled));

        for (int num : numbers) {
            System.out.println("Number: " + num);
        }
    }
}
`

const goCode = `
package main

import "fmt"

func main() {
    numbers := []int{1, 2, 3, 4, 5}
    sum := 0
    for _, num := range numbers {
        sum += num
    }
    fmt.Println("Sum:", sum)

    doubled := make([]int, len(numbers))
    for i, num := range numbers {
        doubled[i] = num * 2
    }
    fmt.Println("Doubled:", doubled)
}
`

export const Code: Story = {
  args: {
    children: [
      <div style={{ margin: 'auto 0.25rem' }}>
        <CodeBlock code={rustCode} language='rust' />
      </div>,
      <div style={{ margin: 'auto 0.25rem' }}>
        <CodeBlock code={javaCode} language='java' />
      </div>,
      <div style={{ margin: 'auto 0.25rem' }}>
        <CodeBlock code={goCode} language='go' />
      </div>
    ],
    autoResize: true
  }
}

const src =
  'https://images.unsplash.com/photo-1556983703-27576e5afa24?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb'

export const Image: Story = {
  args: {
    children: [
      <ImageWithModal src={src} />,
      <ImageWithModal src={src} />,
      <ImageWithModal src={src} />
    ],
    autoResize: true
  }
}
