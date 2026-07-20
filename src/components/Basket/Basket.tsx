import { useContext, useEffect, useState, type FC } from "react";
import { useNavigate } from "react-router-dom";
import { BasketItem } from "../../Models/Models";
import styles from "./Basket.module.css";
import AppContext from "../../Contexts/AppContext";


const Basket: FC = ( ) => {
  const [basketItems, setBasketItems] = useState<BasketItem[]>([]);
  const baseUrl = import.meta.env.VITE_APP_BASE_URL;
  const { startLoading, stopLoading, setModal1State } = useContext(AppContext);
  const navigate = useNavigate();
  const getBasket = async () => {
    try {
      startLoading();
      const response = await fetch(`${baseUrl}/api/basket/getBasket`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setBasketItems(data);
      } else {
        console.error(`Error: ${response.status}`);
      }
    } catch (error) {
      setModal1State({
        isOpen: true,
        title: 'Error',
        message: 'Failed to fetch basket. Please try again later.',
        okButtonText: 'OK',
        okButtonClick: () => setModal1State({ isOpen: false }),
      }); 
      console.error('Failed to fetch basket:', error);
    } finally {
      stopLoading();
    }
  };
  const deleteItem = (prodcutId : number) => {
    startLoading();
  
    fetch(`${baseUrl}/api/basket/delete/${prodcutId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
        } else {
          return response.text().then(() => setModal1State({
            isOpen: true,
            title: 'Error',
            message: 'Failed to delete item from basket. Please try again later.',
            okButtonText: 'OK',
            okButtonClick: () => setModal1State({ isOpen: false }),
          }));
        }
      })
      .catch(() => {
        setModal1State({
          isOpen: true,
          title: 'Error',
          message: 'Failed to delete item from basket. Please try again later.',
          okButtonText: 'OK',
          okButtonClick: () => setModal1State({ isOpen: false }),
        });
      })
      .finally(() => {
        getBasket();
        stopLoading();
      });
  };
useEffect(() => {
  getBasket();
}, []);

const handleOrder = () => {
 startLoading();
  fetch(`${baseUrl}/api/order/createOrder`, {
      method: 'POST'
    })
      .then((response) => {
        if (response.ok) {
          setModal1State({
            isOpen: true,
            title: 'Success',
            message: 'Order created successfully!',
            okButtonText: 'OK',
            okButtonClick: () => {
              setModal1State({ isOpen: false });
              navigate('/orders'); 
            },
          });
        } else {
          return response.text().then((errorText) => setModal1State({
            isOpen: true,
            title: 'Error',
            message: errorText || 'Failed to create order. Please try again later.',
            okButtonText: 'OK',
            okButtonClick: () => setModal1State({ isOpen: false }),
          }));
        }
      })
      .catch(() => {
        setModal1State({
          isOpen: true,
          title: 'Error',
          message: 'Failed to create order. Please try again later.',
          okButtonText: 'OK',
          okButtonClick: () => setModal1State({ isOpen: false }),
        });
      })
      .finally(() => {
          stopLoading();
      });
};

  if (!basketItems?.length) {
    return (
      <div className={styles.basketEmpty}>
        Sepetinizde ürün bulunmuyor.
      </div>
    );
  }

  return (
    <div className={styles.basketWrapper}>
      <table className={styles.basketTable}>
        <thead>
          <tr>
            <th className={styles.headerCell}></th>
            <th className={styles.headerCell}>Product ID</th>
            <th className={styles.headerCell}>Quantity</th>
            <th className={styles.headerCell}>Total Price</th>
          </tr>
        </thead>
        <tbody>
          {basketItems.map((item) => (
            <tr key={String(item.productId)}>
              <td className={styles.cell}>
                <button
                  type="button"
                  onClick={() => deleteItem(item.productId)}
                  className={styles.deleteButton}
                >
                  Sil
                </button>
              </td>
              <td className={styles.cell}>{item.productId}</td>
              <td className={styles.cell}>{item.quantity}</td>
              <td className={styles.cell}>
                {item.totalPrice.toLocaleString("tr-TR", {
                  style: "currency",
                  currency: "TRY",
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        type="button"
        onClick={handleOrder}
        className={styles.orderButton}
      >
        Order
      </button>
    </div>
  );
};

export default Basket;
