import bgImage from '../assets/bg.jpg'; // Correct import statement
import Products from './Products'; // Adjust path if needed

export default function Home() {
  return (
    <div className = 'hero'>
    <div className = 'card bg-dark text-white border-0'>
    <img src       = {bgImage} className = 'card-img' alt = 'Background' height = '670px' />
    <div className = 'card-img-overlay d-flex flex-column justify-content-center'>
    <div className = 'container'>
    <h5  className = 'card-title display-3 fw-bolder mb-0 text-gray '>NEW SEASON ARRIVAL</h5>
    <p   className = 'card-text lead fs-2'>CHECK OUT ALL THE TRENDS</p>
          </div>
        </div>
      </div>
      <Products />
    </div>
  );
}

