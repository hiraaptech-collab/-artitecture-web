import ImagePage from '../components/imagery/ImagePage'
import SelectedWork from '../components/home/SelectedWork'

export default function Portfolio() {
  return <ImagePage title="Portfolio" description="Our selected projects." collection="portfolio">
    <div className="image-page-work home"><SelectedWork /></div>
  </ImagePage>
}

