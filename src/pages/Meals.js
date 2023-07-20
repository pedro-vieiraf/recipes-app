import CategoryButtons from '../Components/Category Buttons/CategoryButtons';
import Footer from '../Components/Footer/Footer';
import Header from '../Components/Header/Header';
import Recipes from '../Components/Recipes/Recipes';

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
