interface OrderItem {
  type: '40foot' | '20foot';
  quantity: number;
  biofuel: boolean;
}

const PRICE_LIST = {
  '40foot': 9000,
  '20foot': 5000,
} as const;

const BIOFUEL_FEE_PER_CONTAINER = 5;

/**
 * Calculate the best discount for a given order.
 * Returns an object describing which discount is better and the resulting final price.
 */
export function calculateBestDiscount(order: OrderItem[]): {
  discountType: 'biofuel' | 'free20foot' | 'none';
  discountAmount: number;
  finalPrice: number;
} {
  // 1. Calculate base price and biofuel fee
  let baseTotal = 0;
  let totalContainers = 0;
  let hasBiofuel = false;
  let total40foot = 0;
  let total20foot = 0;

  for (const item of order) {
    const unitPrice = PRICE_LIST[item.type];
    const itemBase = unitPrice * item.quantity;
    baseTotal += itemBase;

    if (item.biofuel) {
      hasBiofuel = true;
      baseTotal += BIOFUEL_FEE_PER_CONTAINER * item.quantity;
    }

    totalContainers += item.quantity;
    if (item.type === '40foot') {
      total40foot += item.quantity;
    } else {
      total20foot += item.quantity;
    }
  }

  // 2. Calculate discount (1): 1% of total if at least one biofuel item
  const discountBiofuel = hasBiofuel ? baseTotal * 0.01 : 0;
  const priceAfterBiofuelDiscount = baseTotal - discountBiofuel;

  // 3. Calculate discount (2): free 20foot container for every 2 x 40foot containers
  const free20footUnits = Math.floor(total40foot / 2);
  // We can give at most the number of 20foot containers actually ordered
  const applicableFree20foot = Math.min(free20footUnits, total20foot);
  const discountFree20foot = applicableFree20foot * PRICE_LIST['20foot'];
  const priceAfterFree20footDiscount = baseTotal - discountFree20foot;

  // 4. Determine which discount is better (higher discount amount)
  let discountType: 'biofuel' | 'free20foot' | 'none';
  let discountAmount: number;
  let finalPrice: number;

  if (discountBiofuel > discountFree20foot) {
    discountType = 'biofuel';
    discountAmount = discountBiofuel;
    finalPrice = priceAfterBiofuelDiscount;
  } else if (discountFree20foot > discountBiofuel) {
    discountType = 'free20foot';
    discountAmount = discountFree20foot;
    finalPrice = priceAfterFree20footDiscount;
  } else {
    // Equal discounts or both zero
    if (discountBiofuel > 0) {
      // Both equal and positive, arbitrarily choose biofuel
      discountType = 'biofuel';
    } else {
      discountType = 'none';
    }
    discountAmount = Math.max(discountBiofuel, discountFree20foot);
    finalPrice = baseTotal - discountAmount;
  }

  return {
    discountType,
    discountAmount,
    finalPrice,
  };
}
