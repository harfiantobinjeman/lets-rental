import {
    atom
  } from 'recoil';
  

export const dataKeranjangStore = atom({
    key: 'dataKeranjangStore', // unique ID (with respect to other atoms/selectors)
    default: [], // default value (aka initial value)
});