import { INITIAL_PRODUCTS } from '../data/products';

export async function generateAIChatResponse(userText: string, language: 'bn' | 'en'): Promise<string> {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  // Try real Gemini API if VITE_GEMINI_API_KEY is available
  if (apiKey && apiKey.trim() !== '') {
    try {
      const storeContext = `
You are AmarDokan AI Shopping Assistant (আমারদোকান এআই শপিং অ্যাসিস্ট্যান্ট), a helpful, friendly Bangladeshi e-commerce guide.
Available Products in Store:
${INITIAL_PRODUCTS.map(
  (p) =>
    `- Name: ${p.nameBn} (${p.nameEn}), Price: ৳${p.price} (Original: ৳${p.originalPrice}), Origin: ${p.origin}, Description: ${p.descriptionBn}`
).join('\n')}

Store Policies:
- Cash on Delivery available across Bangladesh (সারাদেশে ক্যাশ অন ডেলিভারি).
- Delivery fee: Dhaka ৳60, Outside Dhaka ৳120. Delivery time: 2-3 days.
- Return Policy: 7-day easy return if product is damaged or unauthentic.
- Quality: 100% authentic GI certified, AI-verified directly from local artisans & weavers.

User language: ${language === 'bn' ? 'Bengali (বাংলা)' : 'English'}.
Keep responses polite, helpful, concise, and accurate based on store info.
`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [
              {
                role: 'user',
                parts: [
                  { text: storeContext },
                  { text: `Customer asked: ${userText}` },
                ],
              },
            ],
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        const candidateText =
          data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (candidateText && candidateText.trim() !== '') {
          return candidateText.trim();
        }
      }
    } catch (err) {
      console.warn('Gemini API call failed, switching to local smart AI engine:', err);
    }
  }

  // Local Smart AI Response Engine (Never Fails)
  return getLocalSmartResponse(userText, language);
}

function getLocalSmartResponse(input: string, language: 'bn' | 'en'): string {
  const query = input.toLowerCase().trim();

  // Greetings
  if (
    query.includes('hi') ||
    query.includes('hello') ||
    query.includes('সালাম') ||
    query.includes('কেমন') ||
    query.includes('হাই') ||
    query.includes('হ্যালো')
  ) {
    return language === 'bn'
      ? 'ওয়ালাইকুম আসসালাম! আমারদোকান এআই অ্যাসিস্ট্যান্টে আপনাকে স্বাগতম। আপনি আজ কী ধরণের দেশি খাঁটি পণ্য খুঁজছেন? (যেমন: ঢাকাই জামদানি, পাঞ্জাবি, সুন্দরবনের মধু বা সিল্ক)'
      : 'Hello! Welcome to AmarDokan AI Assistant. What kind of authentic local Bangladeshi products are you looking for today?';
  }

  // Jamdani
  if (
    query.includes('জামদানি') ||
    query.includes('jamdani') ||
    query.includes('শাড়ি') ||
    query.includes('saree')
  ) {
    const p = INITIAL_PRODUCTS.find((item) => item.id.includes('jamdani'));
    const origPrice = p?.originalPrice ? p.originalPrice.toLocaleString('bn-BD') : '';
    const priceStr = p?.price ? p.price.toLocaleString('bn-BD') : '';
    return language === 'bn'
      ? `আমাদের শপে আছে "${p?.nameBn}"। এটি রূপগঞ্জের ঐতিহ্যবাহী তাঁতিদের ১০০ কাউন্ট সুতার বোনা আসল জিআই সার্টিফাইড জামদানি। বর্তমান ছাড়ের মূল্য ৳${priceStr}${origPrice ? ` (আগের মূল্য ৳${origPrice})` : ''}। ক্যাশ অন ডেলিভারিতে নিতে পারবেন!`
      : `We have "${p?.nameEn}". 100-count thread woven by weavers of Rupganj. Current discounted price: ৳${p?.price}. Cash on delivery available!`;
  }

  // Panjabi
  if (
    query.includes('পাঞ্জাবি') ||
    query.includes('panjabi') ||
    query.includes('পঞ্জাবি')
  ) {
    return language === 'bn'
      ? 'আমাদের কাছে দুটি প্রিমিয়াম পাঞ্জাবি কালেকশন রয়েছে:\n১. প্রিমিয়াম প্রিমিয়ার কটন এমব্রয়ডারি পাঞ্জাবি (৳৩,২০০)\n২. রাজশাহী সিল্ক রয়্যাল এক্সক্লুসিভ পাঞ্জাবি (৳৬,৮০০)\nউভয়টিতেই M, L, XL সাইজ রয়েছে।'
      : 'We have 2 premium Panjabi collections:\n1. Premium Embroidery Cotton Panjabi (৳3,200)\n2. Rajshahi Pure Silk Royal Panjabi (৳6,800). Sizes M, L, XL available.';
  }

  // Honey / Madhu
  if (
    query.includes('মধু') ||
    query.includes('honey') ||
    query.includes('সুন্দরবন')
  ) {
    const p = INITIAL_PRODUCTS.find((item) => item.id.includes('honey'));
    return language === 'bn'
      ? `আমাদের কাছে আছে "${p?.nameBn}"। সুন্দরবনের গভীর থেকে মোয়ালদের সংগৃহীত ১০০% অর্গানিক ভেজালমুক্ত মধু। ৫০০ গ্রাম পেকের মূল্য ৳${p?.price}। এআই ল্যাব টেস্টে ১০০% খাঁটি প্রমাণিত।`
      : `We offer "${p?.nameEn}". 100% raw honeycomb honey from Sundarbans (500g) for ৳${p?.price}. AI certified pure!`;
  }

  // Tea / Cha
  if (
    query.includes('চা') ||
    query.includes('tea') ||
    query.includes('শ্রীমঙ্গল')
  ) {
    const p = INITIAL_PRODUCTS.find((item) => item.id.includes('tea'));
    return language === 'bn'
      ? `শ্রীমঙ্গলের অর্থোডক্স ব্ল্যাক চা (৫০ গ্রাম) পাচ্ছেন মাত্র ৳${p?.price} টাকায়। তাজা দুটি পাতা একটি কুঁড়ির সুবাসিত স্বাদ!`
      : `Sreemangal Premium Fresh Orthodox Tea (500g) available for ৳${p?.price}!`;
  }

  // Nakshi Kantha
  if (
    query.includes('কাঁথা') ||
    query.includes('kantha') ||
    query.includes('নকশী')
  ) {
    const p = INITIAL_PRODUCTS.find((item) => item.id.includes('kantha'));
    return language === 'bn'
      ? `যশোরের পল্লী নারীদের হাতে সেলাই করা "কিং সাইজ নকশী কাঁথা" (৭.৫ x ৮.৫ ফুট) পাচ্ছেন ৳${p?.price} টাকায়। দ্বিগুণ সুতির আরামদায়ক ফিনিশিং।`
      : `Hand-embroidered King Size Nakshi Kantha from Jessore available for ৳${p?.price}.`;
  }

  // Leather / Wallet
  if (
    query.includes('লেদার') ||
    query.includes('leather') ||
    query.includes('মানিব্যাগ') ||
    query.includes('wallet') ||
    query.includes('চামড়া')
  ) {
    const p = INITIAL_PRODUCTS.find((item) => item.id.includes('leather'));
    return language === 'bn'
      ? `হাজারীবাগের ১০০% আসল কাউ লেদারের আরএফআইডি প্রটেক্টেড হ্যান্ডক্রাফটেড ওয়ালেট পাচ্ছেন মাত্র ৳${p?.price} টাকায়।`
      : `Handcrafted 100% Genuine Full Grain Cow Leather Wallet with RFID protection for ৳${p?.price}.`;
  }

  // Delivery / Shipping / Charge
  if (
    query.includes('ডেলিভারি') ||
    query.includes('delivery') ||
    query.includes('ক্যাশ অন') ||
    query.includes('charge') ||
    query.includes('ভাড়া') ||
    query.includes('শিপিং')
  ) {
    return language === 'bn'
      ? 'আমাদের ডেলিভারি সংক্রান্ত তথ্য:\n- ঢাকার ভেতরে ডেলিভারি চার্জ: ৳৬০ (২৪-৪৮ ঘণ্টার মধ্যে)\n- ঢাকার বাইরে ডেলিভারি চার্জ: ৳১২০ (২-৩ দিনের মধ্যে)\n- সুবিধা: পণ্য হাতে পেয়ে চেক করে সম্পূর্ণ ক্যাশ অন ডেলিভারিতে মূল্য পরিশোধ করতে পারবেন।'
      : 'Delivery Information:\n- Inside Dhaka: ৳60 (24-48 hrs)\n- Outside Dhaka: ৳120 (2-3 days)\n- Cash on Delivery available with parcel verification before payment.';
  }

  // Price / Discount / Offers
  if (
    query.includes('দাম') ||
    query.includes('price') ||
    query.includes('ছাড়') ||
    query.includes('discount') ||
    query.includes('অফার')
  ) {
    return language === 'bn'
      ? 'আমারদোকানে সকল ঐতিহ্যবাহী পণ্যে ১৫% থেকে ২৫% পর্যন্ত বিশেষ মূল্যছাড় চলছে! বিস্তারিত দেখতে যেকোনো পণ্যে ক্লিক করুন বা শপিং কার্ট থেকে সরাসরি অর্ডার করুন।'
      : 'AmarDokan offers 15% to 25% special discounts on all authentic Bangladeshi heritage products! Check out the home grid for current prices.';
  }

  // Return policy / Genuine verification
  if (
    query.includes('রিটার্ন') ||
    query.includes('return') ||
    query.includes('আসল') ||
    query.includes('খাঁটি') ||
    query.includes('কোয়ালিটি')
  ) {
    return language === 'bn'
      ? 'আমাদের অঙ্গীকার:\n১. ১০০% আসল ও এআই ভেরিফাইড কারিগর পণ্য।\n২. পণ্য পছন্দ না হলে বা কোনো সমস্যা থাকলে ৭ দিনের মধ্যে সহজ রিটার্ন ও রিফান্ড সুবিধা পাবেন।'
      : 'Our Promise:\n1. 100% authentic & AI-verified artisan products.\n2. 7-day easy return and refund policy if unsatisfied.';
  }

  // Default fallback
  return language === 'bn'
    ? `ধন্যবাদ আপনার অনুসন্ধানের জন্য! আমাদের ওয়েবসাইটে সকল পণ্য ১০০% খাঁটি বাংলাদেশি ঐতিহ্যবাহী পণ্য। আপনি চাইলে ঢাকাই জামদানি, কটন বা সিল্ক পাঞ্জাবি, সুন্দরবনের মধু, শ্রীমঙ্গলের চা বা লেদার গুডস সম্পর্কে জানতে পারেন। নির্দিষ্ট কোনো পণ্য অর্ডার করতে "কার্টে যোগ করুন" বাটনে ক্লিক করুন।`
    : `Thank you for reaching out! All products on AmarDokan are 100% authentic Bangladeshi crafts. Feel free to ask about Jamdani sarees, Panjabi, Sundarban Honey, Sreemangal Tea, Nakshi Kantha or Leather Goods.`;
}
