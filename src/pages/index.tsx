import React, { Suspense } from "react"
import { Canvas } from "@react-three/fiber"
import { Box, OrbitControls, CameraShake, Center } from "@react-three/drei"

import Layout from "../components/Layout"




// markup
const IndexPage = () => {


  return (
    <Layout withCanvas={false}>
      <h1 style={{
        textAlign: 'center',
        margin: 0
      }} >select one of the page on the left</h1>        
    </Layout>
  )
}

export default IndexPage
