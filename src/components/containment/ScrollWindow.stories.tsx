import type { Meta, StoryObj } from '@storybook/react'
import { ScrollWindow } from './ScrollWindow'

const meta: Meta<typeof ScrollWindow> = {
  title: 'Components/Containment/ScrollWindow',
  component: ScrollWindow,
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: { style: {} },
  render: () => {
    return (
      <ScrollWindow>
        <div>
          <h2>Lorem Ipsum</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
            nec nibh in enim dignissim feugiat sed nec est. Fusce fringilla
            sapien et tempor suscipit. Suspendisse placerat sagittis faucibus.
            Proin scelerisque augue lacus, vel interdum risus luctus eget.
            Mauris faucibus semper diam, vitae rutrum arcu tempus ut. Integer
            vitae lacus neque. Morbi ut lectus quam. Fusce eleifend vitae lectus
            at venenatis. Pellentesque habitant morbi tristique senectus et
            netus et malesuada fames ac turpis egestas. Nam eu iaculis massa.
            Praesent iaculis dictum tellus vel gravida. Proin bibendum vulputate
            pellentesque. Quisque commodo, ante a ultricies hendrerit, libero
            lectus eleifend massa, mollis fermentum turpis ipsum in nisl. Nunc
            dignissim vestibulum nulla vitae eleifend.
          </p>
          <p>
            Cras nec felis nisi. Sed imperdiet cursus mattis. Morbi eget nulla
            quis nunc dictum gravida. Sed blandit quam non risus molestie
            tincidunt. Cras accumsan nec arcu at iaculis. Aenean maximus nisi
            bibendum ex finibus feugiat. Vivamus cursus, purus non molestie
            euismod, dolor est dignissim risus, euismod pretium arcu felis a
            nibh. Vestibulum sollicitudin ac arcu id fermentum. Nullam accumsan,
            lorem sit amet venenatis aliquet, felis quam scelerisque nibh, quis
            lacinia nisi tortor eu risus. Ut porttitor consequat mauris.
          </p>
          <p>
            In sed enim sit amet augue elementum tincidunt. In volutpat augue
            nec eros venenatis, vitae vulputate tellus aliquet. Suspendisse at
            porta risus. Pellentesque id malesuada diam. Pellentesque tristique
            laoreet nibh, at dignissim sem. Vivamus facilisis id elit in
            egestas. Curabitur posuere odio sed blandit semper. Proin congue mi
            at mi convallis porttitor. Fusce vulputate mauris neque, ac interdum
            tellus posuere volutpat. Sed dapibus magna ac bibendum elementum.
            Nunc at luctus lectus, sit amet rhoncus elit.
          </p>
          <p>
            Suspendisse varius sapien ligula, vitae bibendum libero suscipit
            eget. Ut facilisis vitae erat eget faucibus. Aenean eu ligula quis
            ante aliquet semper. Donec ut varius dolor, at fermentum libero.
            Morbi a libero felis. In rutrum, massa at molestie blandit, nunc
            risus elementum ex, vel hendrerit lectus ante eu tortor. Morbi sem
            purus, porta tempor fermentum ut, lacinia vel diam. Sed non molestie
            ligula. Pellentesque elit nisi, sodales id lobortis nec, euismod a
            justo. Duis molestie eros ut pharetra bibendum. Integer scelerisque
            ultrices feugiat. Nunc eget diam mattis, tempor sem non, tristique
            mi. Etiam rutrum, ipsum vel vehicula tempus, arcu dolor scelerisque
            dui, et blandit ante sem vel quam. Duis quis risus placerat, iaculis
            erat sit amet, aliquet nibh. Suspendisse potenti.
          </p>
          <p>
            Nunc quis purus non ante feugiat facilisis. Phasellus mattis posuere
            rutrum. Aenean egestas ligula in lectus vestibulum maximus. Maecenas
            non venenatis massa. Vivamus sit amet tincidunt mauris. Pellentesque
            sit amet ligula a dui interdum dapibus eu at urna. Aenean sed
            suscipit nisi. Curabitur rutrum, justo vel scelerisque consequat,
            urna mauris feugiat enim, eget mollis lorem mauris vitae lorem.
            Suspendisse potenti. Duis accumsan ante et euismod congue.
          </p>
        </div>
      </ScrollWindow>
    )
  }
}
