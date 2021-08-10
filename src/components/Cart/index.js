import React, { useRef } from "react";
import { faShoppingCart, faTimes } from "@fortawesome/free-solid-svg-icons";

import useOnClickOutside from "../../hooks/useOnClickOutside";

import {
  Wrapper,
  Icon,
  CartCount,
  CartSideBar,
  EmptyCart,
  SideBarHeader,
  Card,
  CardBody,
  CardImage,
  CardTitle,
  CardRemove,
  CardRow,
  ClearButton,
} from "./Styles";

export default function Cart({
  isToggle,
  setToggle,
  carts,
  removeProductFromCart,
  clearCart,
}) {
  const $sideBarRef = useRef();

  // # handle the onclick outside
  useOnClickOutside($sideBarRef, () => setToggle(false));

  console.log(carts);

  return (
    <>
      <Wrapper onClick={() => setToggle(true)}>
        <Icon icon={faShoppingCart} />
        <CartCount>{carts.length}</CartCount>
      </Wrapper>

      <CartSideBar ref={$sideBarRef} className={isToggle ? "expand" : "shrink"}>
        <SideBarHeader>Carrito de Compras </SideBarHeader>
        {carts.length === 0 ? (
          <EmptyCart>Carrito vacío </EmptyCart>
        ) : (
          carts.map(({ product, quantity }) => (
            <Card key={product.id}>
              <CardImage src={product.imageURL} />
              <CardBody>
                <CardRow>
                  <CardTitle>{product.title}</CardTitle>
                  <CardRemove
                    icon={faTimes}
                    onClick={() => removeProductFromCart(product.id)}
                  />
                </CardRow>
                <CardRow>
                  <CardTitle>
                    Cantidad Total ({quantity}) - S/{product.price * quantity}
                  </CardTitle>
                </CardRow>
              </CardBody>
            </Card>
          ))
        )}

        {carts.length !== 0 && (
          <ClearButton onClick={() => clearCart()}>Limpiar Carrito</ClearButton>
        )}
         {carts.length !== 0 && (
        <button style={{
          display:'block',
          justifyContent:'center',
          backgroundColor:'#1a508b',
          color:'white',
          margin:'0 auto',
          marginTop:'50px',
          backgroundSize:'100vw',
          border:'none',

        }}> Comprar </button>)}
      </CartSideBar>
    </>
  );
}
