import { writable, derived } from "svelte/store";

const localStoreContents =
  JSON.parse(localStorage.getItem("localstoreContents")) || [];

export const cartContents = writable(localStoreContents);

export const totalPrice = writable(0);

localStoreContents.forEach((item) => {
  totalPrice.update((price) => (price += item.price));
});

export const itemsInCart = writable(localStoreContents.length);

cartContents.subscribe((value) => {
  if (value !== null) {
    localStorage.setItem("localstoreContents", JSON.stringify(value));
  }
});
