import { useEffect, useState } from 'react'
import { useAuthContext } from '../context/AuthContext'
import ProductsPage from './ProductsPage'

const Home = () => {

  const {user, loading} = useAuthContext()
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
  const fetchProducts = async () => {
    if (!user) return;

    setIsLoading(true);
    try {
      const response = await fetch('/api/get-sample-products', {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const data = await response.json();

      const shuffle = (arr: any[]) => {
        const copy = [...arr];
        for (let i = copy.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [copy[i], copy[j]] = [copy[j], copy[i]];
        }
        return copy;
      };

      const high = data.filter((p: any) => p.similarity > 0.5);
      const medium = data.filter((p: any) => p.similarity > 0.09 && p.similarity <= 0.5);
      const low = data.filter((p: any) => p.similarity <= 0.09);

      const shuffledHigh = shuffle(high);
      const shuffledMedium = shuffle(medium);
      const shuffledLow = shuffle(low);
      const finalList = [...shuffledHigh, ...shuffledMedium, ...shuffledLow];
      setProducts(finalList);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  fetchProducts();
}, [user?.isLoggedin]);
  
  if(loading){
    return <div>Loading...</div>
  }


  if(user.isLoggedIn){
    return <div className="text-white">
      {/*{user?.photoURL ? (
                <img 
                  src={user.photoURL} 
                  alt="Profile" 
                  className="h-12 w-12 rounded-full"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-blue-500 flex items-center justify-center">
                  <User className="w-12 h-12 text-white" />
                </div>
              )}
      name: {user.displayName}<br/>
      id: {user.userId}<br/>
      email: {user.email}<br/>
      gender: {user.gender}<br/>
      dob: {user.dob}<br/>
      joined: {user.createdAt}*/}
      <ProductsPage products={products} isLoading={isLoading}/>
    </div>
  }
  
  return <div className="dark:text-white m-2">Login first</div>

}

export default Home
