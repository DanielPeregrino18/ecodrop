import React, { useRef, useEffect } from 'react'
import { animate, useMotionValue, useTransform } from "motion/react";
import { useInView } from "framer-motion";
import * as motion from "motion/react-client"

function Contador({ num,  duracion }) {
    const ref = useRef(null)
    const isInView = useInView(ref)
    const count = useMotionValue(0)
    const rounded = useTransform(() => Math.round(count.get()))
    useEffect(() => {
        if (isInView) {
          const controls = animate(count, num, { duration: duracion })
          return () => controls.stop()
        }
      }, [isInView])
  return (
    <motion.pre ref={ref} className='inline text-8xl'>
        {rounded}
    </motion.pre>
  )
}

export default Contador