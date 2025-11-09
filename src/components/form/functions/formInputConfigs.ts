export const formInputConfig = {
  name: { required: true },
  price: {
    required: true,
    maxLength: 7,
    min: 0,
    valueAsNumber: true,
  },
  qty: {
    required: true,
    maxLength: 3,
    min: 0,
    valueAsNumber: true,
  },
}
