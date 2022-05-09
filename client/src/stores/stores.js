import { writable, readable } from "svelte/store";

export const user = writable(null);

export const session = writable(null);

export const selectedGame = writable(null);
