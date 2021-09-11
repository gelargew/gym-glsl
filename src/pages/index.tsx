import React, { Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import { Box, OrbitControls, CameraShake, Center } from "@react-three/drei"
import Dragun from "../components/Dragun"
import Layout from "../components/Layout"




// markup
const IndexPage = () => {


  return (
    <Layout>
      
          <Dragun />
        
    </Layout>
  )
}

export default IndexPage
