import React, { useContext, useEffect, useRef, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

/* ---------- Marker icon fix ---------- */
const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

/* Helper component: recenters the map when `center` changes */
function MapAutoCenter({ center, zoom = 13 }) {
  const map = useMap();
  useEffect(() => {
    if (center && map) {
      map.setView(center, zoom, { animate: true });
    }
  }, [center, map, zoom]);
  return null;
}

/* Component that lets a user set the location by clicking the map */
function LocationMarker({ location, setLocation, setLocationStatus }) {
  useMapEvents({
    click(e) {
      setLocation({ lat: e.latlng.lat, lng: e.latlng.lng });
      setLocationStatus("Location set by map pin");
    },
  });

  return location && location.lat && location.lng ? (
    <Marker position={[location.lat, location.lng]} icon={markerIcon} />
  ) : null;
}

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItem, url, user } = useContext(StoreContext);
  const [phone, setPhone] = useState(user?.phone || "");
  const [name, setName] = useState(user?.name || "");
  const [addressNote, setAddressNote] = useState("");
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [locationStatus, setLocationStatus] = useState("");
  const [placing, setPlacing] = useState(false);

  const navigate = useNavigate();
  const mapRef = useRef(null);

  // redirect if not logged in or cart empty
  useEffect(() => {
    if (!token) {
      navigate("/cart");
    } else if (getTotalCartAmount() === 0) {
      navigate("/cart");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  // geolocation helper
  const getLocation = () => {
    if (!navigator.geolocation) {
      setLocationStatus("Geolocation is not supported by your browser");
      return;
    }

    setLocationStatus("Locating...");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setLocation(coords);
        setLocationStatus("Location captured (GPS)");
      },
      (err) => {
        console.warn("Geolocation error:", err);
        setLocationStatus("Unable to retrieve your location");
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  // build order items from context
  const buildOrderItems = () => {
    const orderItems = [];
    food_list.forEach((item) => {
      const qty = cartItem[item._id] || 0;
      if (qty > 0) {
        orderItems.push({
          _id: item._id,
          name: item.name,
          price: item.price,
          quantity: qty,
        });
      }
    });
    return orderItems;
  };

  const deliveryFee = getTotalCartAmount() === 0 ? 0 : 2;
  const subtotal = getTotalCartAmount();
  const totalAmount = Number((subtotal + deliveryFee).toFixed(2));

  // validation helper
  const isValidPhone = (p) => /^[0-9]{7,15}$/.test(p.replace(/\s+/g, ""));

  const placeOrder = async (e) => {
    e.preventDefault();
    if (placing) return;
    if (!user) {
      alert("Please login and try again.");
      return;
    }
    if (!name.trim()) {
      alert("Please enter your name.");
      return;
    }
    if (!phone.trim() || !isValidPhone(phone)) {
      alert("Please enter a valid phone number.");
      return;
    }
    if (!location?.lat || !location?.lng) {
      alert("Please set your delivery location (Use GPS or tap the map).");
      return;
    }

    const orderItems = buildOrderItems();
    if (orderItems.length === 0) {
      alert("No items in cart.");
      return;
    }

    const orderData = {
      address: {
        name: name.trim(),
        phone: phone.trim(),
        note: addressNote.trim(),
      },
      items: orderItems,
      amount: totalAmount,
      location,
    };

    try {
      setPlacing(true);
      const response = await axios.post(`${url}/api/order/place`, orderData, {
        headers: { token },
      });

      if (response.data.success) {
        const razorpayOrder = response.data.order;
        const options = {
          key: "rzp_test_pWyJxe1HjSj9xU", // replace with your key
          amount: razorpayOrder.amount,
          currency: "INR",
          name: "Aero Drop",
          description: "Order Payment",
          order_id: razorpayOrder.id,
          handler: function () {
            window.location.href = response.data.frontendRedirect.success;
          },
          prefill: {
            name,
            contact: phone,
          },
          theme: { color: "#111" },
          modal: {
            ondismiss: function () {
              window.location.href = response.data.frontendRedirect.cancel;
            },
          },
        };

        if (typeof window.Razorpay === "undefined") {
          // fallback: server returned URLs to redirect
          if (response.data.frontendRedirect && response.data.frontendRedirect.success) {
            window.location.href = response.data.frontendRedirect.success;
            return;
          }
          throw new Error("Razorpay not available");
        }

        const rzp = new window.Razorpay(options);
        rzp.open();
        rzp.on("payment.failed", function (resp) {
          alert("Payment failed: " + (resp?.error?.description || "Try again"));
        });
      } else {
        alert(response.data.message || "Failed to place order");
      }
    } catch (err) {
      console.error("Place order error:", err);
      alert("Something went wrong while placing the order.");
    } finally {
      setPlacing(false);
    }
  };

  // map initial center (India) or selected location
  const mapCenter = location.lat && location.lng ? [location.lat, location.lng] : [20.5937, 78.9629];

  const items = buildOrderItems();

  return (
    <form
      onSubmit={placeOrder}
      className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-black dark:to-neutral-900 py-12"
    >
      <div className="max-w-6xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Delivery card */}
        <div className="mt-6 md:mt-12 rounded-xl border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-black dark:text-white mb-3">Delivery information</h2>

          <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-3">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full name"
              className="flex-1 p-2 border rounded-md bg-transparent border-gray-200 dark:border-neutral-700 text-black dark:text-white"
            />
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone (digits only)"
              className="w-full sm:w-40 p-2 border rounded-md bg-transparent border-gray-200 dark:border-neutral-700 text-black dark:text-white"
              inputMode="tel"
            />
          </div>

          <textarea
            value={addressNote}
            onChange={(e) => setAddressNote(e.target.value)}
            placeholder="Address note (flat, landmark etc.) — optional"
            className="w-full p-2 border rounded-md bg-transparent border-gray-200 dark:border-neutral-700 text-black dark:text-white mb-3"
            rows={3}
          />

          <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-3">
            <button
              type="button"
              onClick={getLocation}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-black text-white dark:bg-white dark:text-black font-medium hover:opacity-95 transition"
            >
              Use my location
            </button>

            <button
              type="button"
              onClick={() => {
                setLocation({ lat: null, lng: null });
                setLocationStatus("");
              }}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-md border border-gray-200 dark:border-neutral-700 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-neutral-800 transition"
            >
              Clear pin
            </button>
          </div>

          {locationStatus && (
            <p
              className={`text-sm mb-3 ${
                locationStatus.toLowerCase().includes("unable") || locationStatus.toLowerCase().includes("not supported")
                  ? "text-red-500"
                  : "text-green-500"
              }`}
            >
              {locationStatus}
            </p>
          )}

          {/* Map */}
          <div className="rounded-md overflow-hidden border border-gray-100 dark:border-neutral-800 mb-3" style={{ height: 280 }}>
            <MapContainer
              center={mapCenter}
              zoom={location.lat && location.lng ? 15 : 5}
              style={{ height: "100%", width: "100%" }}
              whenCreated={(map) => {
                mapRef.current = map;
              }}
              scrollWheelZoom={false}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <MapAutoCenter center={mapCenter} zoom={location.lat && location.lng ? 15 : 5} />
              <LocationMarker location={location} setLocation={setLocation} setLocationStatus={setLocationStatus} />
            </MapContainer>
          </div>

          <p className="text-xs text-gray-500 dark:text-gray-400">
            Tap on the map to drop a pin, or use <em>Use my location</em> to capture GPS coordinates. Make sure the pin is accurate for delivery.
          </p>
        </div>

        {/* Summary card */}
        <aside className="mt-6 md:mt-12">
          <div
            className="rounded-xl border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 p-5 shadow-sm sticky top-28"
            // Safari support for backdrop if you later make this glassy
            style={{ WebkitBackdropFilter: "blur(6px)", backdropFilter: "blur(6px)" }}
          >
            <h3 className="text-lg font-semibold text-black dark:text-white mb-4">Order summary</h3>

            {items.length === 0 ? (
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">No items in cart</p>
            ) : (
              <ul className="space-y-3 max-h-64 overflow-y-auto mb-4">
                {items.map((it) => (
                  <li key={it._id} className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={`${url}/images/${(food_list.find(f => f._id === it._id) || {}).image}`}
                        alt={it.name}
                        className="h-12 w-12 object-cover rounded-md border border-gray-100 dark:border-neutral-800"
                      />
                      <div className="min-w-0">
                        <div className="text-sm font-medium text-black dark:text-white truncate">{it.name}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">Qty {it.quantity}</div>
                      </div>
                    </div>
                    <div className="text-sm font-medium text-black dark:text-white">₹{(it.price * it.quantity).toFixed(2)}</div>
                  </li>
                ))}
              </ul>
            )}

            <div className="border-t border-gray-100 dark:border-neutral-800 pt-3 text-sm text-gray-700 dark:text-gray-300">
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Delivery</span>
                <span>₹{deliveryFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold text-black dark:text-white text-lg mt-2">
                <span>Total</span>
                <span>₹{totalAmount.toFixed(2)}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={placing || !name || !isValidPhone(phone) || !location?.lat}
              className={`mt-5 w-full rounded-lg py-3 font-medium transition
                ${placing || !name || !isValidPhone(phone) || !location?.lat
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
                }
              `}
            >
              {placing ? "Placing order..." : "Proceed to payment"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/cart")}
              className="mt-3 w-full rounded-lg py-2 text-sm border border-gray-200 dark:border-neutral-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-neutral-800 transition"
            >
              Back to cart
            </button>
          </div>
        </aside>
      </div>
    </form>
  );
};

export default PlaceOrder;
