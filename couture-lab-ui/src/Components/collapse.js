import { Collapse, useDisclosure } from '@chakra-ui/react'

export default function CollapseEx() {
    const { isOpen, onToggle } = useDisclosure()
  
    return (
      <>
        <button onClick={onToggle}>Click Me</button>
        <Collapse in={isOpen} animateOpacity>
          <h1>ayo</h1>
        </Collapse>
      </>
    )
  }