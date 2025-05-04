import React  from 'react'
import FooterComponent from '../components/FooterComponent'
import ProducsListCompnonent from '../products/components/ProducsListCompnonent'
import ProductProvider from '../products/providers/ProductProvider'

export default function HomeComponent() {
  
  
  return (<>
    <ProducsListCompnonent/>

    <FooterComponent/>
  </>
    
  )
}
