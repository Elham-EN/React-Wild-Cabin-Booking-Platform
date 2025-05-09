import { Booking } from "../_types/Booking";
import { Cabin } from "../_types/Cabin";

export const dummyCabins: Cabin[] = [
  {
    id: "cabin-01",
    name: "Forest Retreat",
    maxCapacity: 2,
    regularPrice: 250,
    discount: 0,
    image:
      "https://gayavyzkiqxzxfdicgjv.supabase.co/storage/v1/object/public/cabin-images//0.09205053958958387-cabin-img-2.png",
    description:
      "A cozy cabin nestled among tall pines, perfect for a romantic getaway. Features a king-sized bed, fireplace, and private hot tub on the deck overlooking the woods.",
  },
  {
    id: "cabin-02",
    name: "Lakeside Lodge",
    maxCapacity: 6,
    regularPrice: 450,
    discount: 50,
    image:
      "https://gayavyzkiqxzxfdicgjv.supabase.co/storage/v1/object/public/cabin-images//0.1745587266851507-cabin-img-1.png",
    description:
      "Spacious family cabin with stunning lake views. Three bedrooms, two bathrooms, fully equipped kitchen, and private dock with complimentary kayaks.",
  },
  {
    id: "cabin-03",
    name: "Mountain Vista",
    maxCapacity: 4,
    regularPrice: 350,
    discount: 25,
    image:
      "https://gayavyzkiqxzxfdicgjv.supabase.co/storage/v1/object/public/cabin-images//0.1745587266851507-cabin-img-1.png",
    description:
      "Charming A-frame cabin with panoramic mountain views. Two bedrooms plus loft, stone fireplace, wraparound deck, and outdoor fire pit for evening s'mores.",
  },
  {
    id: "cabin-04",
    name: "Rustic Hideaway",
    maxCapacity: 8,
    regularPrice: 550,
    discount: 75,
    image:
      "https://gayavyzkiqxzxfdicgjv.supabase.co/storage/v1/object/public/cabin-images//0.1745587266851507-cabin-img-1.png",
    description:
      "Our largest and most secluded cabin, perfect for large families or groups. Four bedrooms, three bathrooms, game room with pool table, chef's kitchen, and private hiking trails.",
  },
];

export const dummyBookings: Booking[] = [
  {
    id: "booking-1",
    guestId: 123,
    created_at: "2025-04-15T14:30:00Z",
    startDate: "2025-05-12T14:00:00Z",
    endDate: "2025-05-15T10:00:00Z",
    numNights: 3,
    numGuests: 2,
    totalPrice: 750,
    status: "unconfirmed",
    cabins: {
      name: "Forest Retreat",
      image:
        "https://gayavyzkiqxzxfdicgjv.supabase.co/storage/v1/object/public/cabin-images//0.1745587266851507-cabin-img-1.png",
    },
  },
  {
    id: "booking-2",
    guestId: 456,
    created_at: "2025-04-18T09:15:00Z",
    startDate: "2025-04-28T15:00:00Z",
    endDate: "2025-05-05T11:00:00Z",
    numNights: 7,
    numGuests: 4,
    totalPrice: 2450,
    status: "checked-in",
    cabins: {
      name: "Lakeside Lodge",
      image:
        "https://gayavyzkiqxzxfdicgjv.supabase.co/storage/v1/object/public/cabin-images//0.1745587266851507-cabin-img-1.png",
    },
  },
  {
    id: "booking-3",
    guestId: 789,
    created_at: "2025-03-22T17:45:00Z",
    startDate: "2025-04-01T16:00:00Z",
    endDate: "2025-04-03T10:00:00Z",
    numNights: 2,
    numGuests: 6,
    totalPrice: 900,
    status: "checked-out",
    cabins: {
      name: "Mountain Vista",
      image:
        "https://gayavyzkiqxzxfdicgjv.supabase.co/storage/v1/object/public/cabin-images//0.1745587266851507-cabin-img-1.png",
    },
  },
  {
    id: "booking-4",
    guestId: 234,
    created_at: "2025-04-30T11:20:00Z",
    startDate: "2025-06-10T15:00:00Z",
    endDate: "2025-06-20T10:00:00Z",
    numNights: 10,
    numGuests: 8,
    totalPrice: 5500,
    status: "unconfirmed",
    cabins: {
      name: "Rustic Hideaway",
      image:
        "https://gayavyzkiqxzxfdicgjv.supabase.co/storage/v1/object/public/cabin-images//0.1745587266851507-cabin-img-1.png",
    },
  },
  {
    id: "booking-5",
    guestId: 567,
    created_at: "2025-04-05T08:30:00Z",
    startDate: "2025-05-01T14:00:00Z",
    endDate: "2025-05-04T11:00:00Z",
    numNights: 3,
    numGuests: 2,
    totalPrice: 1050,
    status: "checked-in",
    cabins: {
      name: "Forest Retreat",
      image:
        "https://gayavyzkiqxzxfdicgjv.supabase.co/storage/v1/object/public/cabin-images//0.1745587266851507-cabin-img-1.png",
    },
  },
];
