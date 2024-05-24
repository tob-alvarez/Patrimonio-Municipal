import Card from '../Estatuas/Card'
import Carrousel from "../Carousel/Carrousel"

const Home = () => {
  return (
    <>
        <div className='mb-5'>
            <Carrousel/>
            <div className="container my-5 text-center">
              <h1>Patrimonio Municipal</h1>
            </div>
            <div className="d-flex flex-wrap gap-5 justify-content-center">
              <Card/>
              <Card/>
              <Card/>
              <Card/>
              <Card/>
              <Card/>
              <Card/>
              <Card/>
            </div>
        </div>
    </>
  )
}

export default Home