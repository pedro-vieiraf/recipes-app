import CategoryButtons from '../Components/CategoryButtons';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import Recipes from '../Components/Recipes';

function Meals() {
  return (
    <div>
      <Header />
      <CategoryButtons />
      <Recipes />
      <Footer />
    </div>
  );
}

export default Meals;
