export const trackShipment = async (shipmentId) => {
    const { data } = await axios.get(`/api/v1/shiprocket/track/${shipmentId}`);
    return data;
  };
  