import React from 'react'
import Header from './Header/Header'
import FeaturedProducts from './featured-products/FeaturedProducts'
import TechnologyFeatures from './technology-features/TechnologyFeatures'
import Membership from './membership/Membership'
import Newsletter from './newsletter/Newsletter'
import Footer from '../../components/Footer/Footer'

function AllHome() {
  return (
    <div>
        <Header/>
        <FeaturedProducts />
        <TechnologyFeatures />
        <Membership />
        <Newsletter />
        <Footer />
    </div>
  )
}

export default AllHome