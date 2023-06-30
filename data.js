export const generateOrderId = () => {
  const min = 1000000000;
  const max = 9999999999;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const couriers = [
  "G4S Kenya",
  "DHL Kenya",
  "Sendy",
  "Posta Kenya",
  "Aramex Kenya",
];

export const facilities = [
  { name: "Kenyatta National Hospital, Nairobi", phone: "+254114357926" },
  {
    name: "Moi Teaching and Referral Hospital, Eldoret",
    phone: "+254114357926",
  },
  {
    name: "Coast Provincial General Hospital, Mombasa",
    phone: "+254114357926",
  },
  { name: "Kisumu County Hospital, Kisumu", phone: "+254114357926" },
  { name: "Moi County Referral Hospital, Voi", phone: "+254114357926" },
  { name: "Nyeri County Referral Hospital, Nyeri", phone: "+254114357926" },
];
export const getUserNextOrderDate = (days) => {
  const time = days * 24 * 60 * 60 * 1000;
  const next_date = new Date().getTime() + time;
  return next_date;
};
