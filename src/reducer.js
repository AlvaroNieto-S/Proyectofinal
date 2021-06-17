export const initialState ={
    basket: [],
    user: null,
    shippingData:{},
    paymentMessage: "",
    completeOrder: false,
}

export const actionTypes ={
    ADD_TO_BASKET: "ADD_TO_BASKET",
    SET_USER: "SET_USER",
    REMOVE_ITEM: "REMOVE_ITEM",
    EMPTY_BASKET: "EMPTY_BASKET",
    SET_SHIPPINGDATA: "SET_SHIPPINGDATA",
    SET_PAYMENTMESSAGE: "SET_PAYMENTMESSAGE",
    SET_COMPLETEORDER: "SET_COMPLETEORDER",
}

export const getBasketTotal = (basket) =>{
    return(basket?.reduce((acc , item) => item.price + acc, 0 ))
}

const reducer = (state, action) =>{
    console.log(action);
    switch(action.type){
        
        case "ADD_TO_BASKET":
        return{
            ...state,
            basket:[...state.basket, action.item],
        }
        case "REMOVE_ITEM":
        const index = state.basket.findIndex((basketItem => basketItem.id === action.id))
        let newBasket = [...state.basket];
        if (index >=0){
            newBasket.splice(index,1)
        }else{
            console.log("No se puede eliminar el item")
        }
        return{
            ...state,
            basket: newBasket,
        }
        case "SET_USER":
        return{
            ...state,
            user: action.user,
        }
        case "EMPTY_BASKET":
        return{
            ...state,
            basket: action.basket
        }
        case "SET_SHIPPINGDATA":
        return{
            ...state,
            shippingData: action.shippingData,
        }
        case "SET_PAYMENTMESSAGE":
        return{
            ...state,
            paymentMessage: action.paymentMessage, 
        }
        case "SET_COMPLETEORDER":
        return{
            ...state,
            completeOrder: action.completeOrder,
        }

        default: 
            return state;
    } 
}

export default reducer 