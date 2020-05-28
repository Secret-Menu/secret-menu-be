require('dotenv').config();
const chance = require('chance').Chance();
const User = require('../lib/models/User/User');
const Restaurant = require('../lib/models/Restaurant/Restaurant');
const Offering = require('../lib/models/Offering/Offering');
const Poll = require('../lib/models/Poll/Poll');

module.exports = async() => {

  const owner = await User.create({
    firstName: 'Megan',
    lastName: 'Nelson',
    email: 'megan@alchemycodelab.com',
    role: 'Restaurant',
    password: 'admin'
  });

  const restaurant = await Restaurant.create({
    owner: owner._id,
    restaurantName: 'Alchemy Food Lab',
    phoneNumber: '(503) 455-4575',
    category: 'American (New)',
    quadrant: 'NW',
    address: {
      streetAddress: '30 NW 10th Ave',
      city: 'Portland',
      state: 'OR', 
      zipcode: 97209
    },
    lat: 45.523431,
    lng: -122.6814322,
    description: 'We serve hot appetizers and even hotter applications.',
    imageUrl: 'https://user-images.strikinglycdn.com/res/hrscywv4p/image/upload/c_limit,fl_lossy,h_300,w_300,f_auto,q_auto/983693/axmqlpjyo3zmeszdr9qt.png',
    websiteUrl: 'https://www.alchemycodelab.com/',
    email: 'megan@alchemycodelab.com'
  });

  const businessDishes = [
    {
      dishName: 'Shiitake & Hoisin Beef Burgers Kit',
      imageUrl: 'https://media.blueapron.com/recipes/24132/square_newsletter_images/1588081894-34-0037-8708/0722_2PRE08_Burger_3331_Square_Web_hi_res.jpg?quality=80&width=600',
      description: 'We’re giving these Asian-style burgers layers of umami (or savory) flavor in two ways: we’re mixing bites of earthy shiitake mushrooms into the juicy beef patties, then serving them atop a savory spread of sweet white miso and mayo. They’re delightfully balanced by a simple side of sautéed broccoli, finished with a touch of bright vinegar and crunchy sesame seeds.',
      numRemaining: 20,
      servingSize: 2,
      price: 4000,
      dietaryRestriction: 'None',
      pickUpDate: chance.date({ year: 2020 })
    },
    {
      dishName: 'Fettuccine Pasta & Mushrooms Kit',
      imageUrl: 'https://media.blueapron.com/recipes/24136/square_newsletter_images/1588082187-35-0032-0029/0406_2PV2_Fettucine_Mushroom_Pasta__158_SQ_Web_hi_res.jpg?quality=80&width=600',
      description: 'For this simple, quick-cooking pasta dish, you’ll make a flavorful tomato sauce using aromatic onion, roasted almonds, and garlic—plus a bit of red pepper flakes for a kick of heat.',
      numRemaining: 33,
      servingSize: 2,
      price: 2300,
      dietaryRestriction: 'Dairy Free',
      pickUpDate: chance.date({ year: 2020 })
    },
    {
      dishName: 'One-Pan Vegetable Udon Kit',
      imageUrl: 'https://media.blueapron.com/recipes/24137/square_newsletter_images/1588082660-34-0040-3069/0429_2PV2_Udon_342_Square_Web_hi_res.jpg?quality=80&width=600',
      description: 'These quick-cooking noodles and vegetables come together in one pan with a delicious sauce that features the bold flavors of earthy cumin and tingly Sichuan peppercorn. It’s all garnished with crunchy roasted peanuts tossed with togarashi—a vibrant, complex blend that highlights dried orange peel, paprika, and sesame seeds.',
      numRemaining: 7,
      servingSize: 1,
      price: 2000,
      dietaryRestriction: 'Vegan',
      pickUpDate: chance.date({ year: 2020 })
    },
    {
      dishName: 'Roasted Cauliflower Salad Kit',
      imageUrl: 'https://media.blueapron.com/recipes/24020/square_newsletter_images/1588082490-34-0037-7103/0101_2PV3_Roasted_Cauliflower-Kale-Salad_97243_SQ_hi_res.jpg?quality=80&width=600',
      description: 'We’re bringing roasted cauliflower and sautéed kale together with cheesy toasted breadcrumbs and a briny caper-studded brown butter sauce. Served on top, soft-boiled eggs add extra richness to the dish.',
      numRemaining: 14,
      servingSize: 4,
      price: 3500,
      dietaryRestriction: 'Gluten Free',
      pickUpDate: chance.date({ year: 2020 })
    },
    {
      dishName: 'Hot Honey Butter-Glazed Chicken Kit',
      imageUrl: 'https://media.blueapron.com/recipes/24131/square_newsletter_images/1588082064-34-0042-0531/0603_2PP_Chicken_0543_Square_Web_hi_res.jpg?quality=80&width=600',
      description: 'To accompany our irresistibly spicy-sweet glazed chicken, we’re whipping up a vibrant, seasonal side of verdant peas and juicy tomatoes sautéed with just a touch of garlic and olive oil. An additional side of smooth mashed potatoes completes the dish on a hearty note and helps to soak up the flavorful glaze.',
      numRemaining: 4,
      servingSize: 2,
      price: 3490,
      dietaryRestriction: 'None',
      pickUpDate: chance.date({ year: 2020 })
    },
    {
      dishName: 'BBQ Turkey Burgers Kit',
      imageUrl: 'https://media.blueapron.com/recipes/24223/square_newsletter_images/1590109435-35-0055-6896/0323_FP6_BBQ-Turkey-Burgers_86_SQ_Web_hi_res.jpg?quality=80&width=600',
      description: 'To give the classic burger a deliciously rich, rustic twist, we’re using ground turkey and a blend of smoky spices to make the patties, then layering them with barbecue sauce, tangy pickled onion, and monterey jack cheese.',
      numRemaining: 0,
      servingSize: 2,
      price: 2500,
      dietaryRestriction: 'None',
      pickUpDate: chance.date({ year: 2020 })
    },
    {
      dishName: 'Pine Nut and Goat Cheese-Crusted Chicken Kit',
      imageUrl: 'https://homechef.imgix.net/https%3A%2F%2Fasset.homechef.com%2Fuploads%2Fmeal%2Fplated%2F9596%2F614593.002.01PineNutAndGoatCheese-CrustedChicken_Ecomm2_1_of_1_.jpg?ixlib=rails-1.1.0&w=850&auto=format&s=ad190142395169f52f554d7d6ae1f939',
      description: 'Cheesy… it\'s the saccharine moments at the end of old sitcoms, where lessons were learned and hugs exchanged. Cheesy is the greeting card your Aunt sent you for graduation. Cheesy is Dad jokes. Cheesy is also this delectable dinner, with a cauliflower gratin made of creamy cream cheese and nutty, salty Parmesan. Cheesy is also this chicken, crusted in the light tang of gorgeous goat cheese. Cheesy… it\'s what\'s for dinner.',
      numRemaining: 1,
      servingSize: 2,
      price: 3200,
      dietaryRestriction: 'None',
      pickUpDate: chance.date({ year: 2020 })
    },
    {
      dishName: 'Gemelli and Ricotta Meatballs Kit',
      imageUrl: 'https://homechef.imgix.net/https%3A%2F%2Fasset.homechef.com%2Fuploads%2Fmeal%2Fplated%2F9716%2F003150.002.01GemelliandRicottaMeatballs_Ecomm_1_of_1_.jpg?ixlib=rails-1.1.0&w=850&auto=format&s=b4377279aff6c2bb975e764792d2cb52',
      description: 'Why are there so many memes about garlic bread? One does not simply ignore that it reigns supreme in the world of bread. We go beast mode on ours by adding pungent pecorino cheese and serving it with meatballs enhanced with light and creamy ricotta cheese. Kick your normal pasta and meatballs recipe to the curb, there\'s a new sheriff in town.',
      numRemaining: 39,
      servingSize: 4,
      price: 2000,
      dietaryRestriction: 'None',
      pickUpDate: chance.date({ year: 2020 })
    },
    {
      dishName: 'Salmon and Quinoa Bowl Kit',
      imageUrl: 'https://cdn.sunbasket.com/16ec0454-a767-4dda-8df0-fcd987b1d263.jpg',
      description: 'Clean eating is easy when good-for-you ingredients are arranged in such an appealing way. These stunning bowls also come together quickly.',
      numRemaining: 9,
      servingSize: 3,
      price: 4500,
      dietaryRestriction: 'None',
      pickUpDate: chance.date({ year: 2020 })
    },
    {
      dishName: 'Beef Chili Kit',
      imageUrl: 'https://homechef.imgix.net/https%3A%2F%2Fasset.homechef.com%2Fuploads%2Fmeal%2Fplated%2F9716%2F003150.002.01GemelliandRicottaMeatballs_Ecomm_1_of_1_.jpg?ixlib=rails-1.1.0&w=850&auto=format&s=b4377279aff6c2bb975e764792d2cb52',
      description: 'The secret to great chili? Building layers of flavor from start to finish. Mexican chocolate lends earthy sweetness, jalapeño peppers bring the heat, and a dollop of Greek yogurt cools everything off.',
      numRemaining: 3,
      servingSize: 4,
      price: 3000,
      dietaryRestriction: 'None',
      pickUpDate: chance.date({ year: 2020 })
    },
    {
      dishName: 'Birthday Cake Cocktail Kit',
      imageUrl: 'https://www.cocktailcourier.com/wp-content/uploads/2020/01/birthday-cocktail-stars-vert-scaled-800x1200.jpg',
      description: 'It’s time to have your cake and drink it too! 🎂We took the fun flavor of vanilla cake and added boozy vodka for a delicious birthday treat. Top your cocktail with rainbow sprinkles and a birthday candle, of course! Now make a wish!',
      numRemaining: 20,
      servingSize: 12,
      price: 1000,
      dietaryRestriction: 'None',
      pickUpDate: chance.date({ year: 2020 })
    },
    {
      dishName: 'Sea Monster Mai Tai Kit',
      imageUrl: 'https://www.cocktailcourier.com/wp-content/uploads/2020/05/kraken-rum-mai-tai-800x1200.jpg',
      description: 'Made from a unique Caribbean Black Spiced Rum and infused with the darkness of the depths, Kraken Rum Original favors the bold. Pairing the cinnamon, nutmeg and vanilla notes of Kraken Original with spicy ginger, bright lime and rich almond, The Sea Monster Mai Tai is the perfect above sea level beverage.',
      numRemaining: 0,
      servingSize: 4,
      price: 8000,
      dietaryRestriction: 'None',
      pickUpDate: chance.date({ year: 2020 })
    },
  ];

  await Offering.create(businessDishes.map(offering => ({
    dishName: offering.dishName,
    imageUrl: offering.imageUrl,
    description: offering.description,
    numRemaining: offering.numRemaining,
    servingSize: offering.servingSize,
    price: offering.price,
    restaurant: restaurant._id,
    dietaryRestriction: offering.dietaryRestriction,
    pickUpDate: offering.pickUpDate
  })));

  const businessPolls = [
    {
      name: 'Red Dawn',
      end: '2020-07-23T12:00:00.500Z',
      status: 'open',
      offering1Name: 'Dorje`s Moscow Mule Kit',
      offering1Votes: 73,
      offering1ImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Moscow_Mule_at_Rye%2C_San_Francisco.jpg/1920px-Moscow_Mule_at_Rye%2C_San_Francisco.jpg',
      offering1Description: 'From the motherland.',
      offering2Name: 'Chelsea`s Manhattan Kit',
      offering2Votes: 42,
      offering2ImageUrl: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/manhattan-cocktail-garnished-with-brandied-cherry-royalty-free-image-1581689329.jpg?crop=0.670xw:1.00xh;0.120xw,0&resize=768:*',
      offering2Description: 'An American staple.'
    },
    {
      name: 'What\'s the Color of Your Energy?',
      end: '2020-06-21T12:00:00.500Z',
      status: 'open',
      offering1Name: 'Mikey\'s All-Mixed-Up Salad Kit',
      offering1Votes: 311,
      offering1ImageUrl: 'https://www.lecremedelacrumb.com/wp-content/uploads/2019/01/best-simple-green-salad-3.jpg',
      offering1Description: 'Three hundred and eleven reasons to choose this one.',
      offering2Name: 'Cody\'s Famous Beef Stew Kit',
      offering2Votes: 42,
      offering2ImageUrl: 'https://s23209.pcdn.co/wp-content/uploads/2020/03/Best-Ever-Beef-StewIMG_1367.jpg',
      offering2Description: 'A stew that that\'ll make you \'React\'.'
    },
    {
      name: 'It\'s Burger Time!',
      end: '2020-02-14T12:00:00.500Z',
      status: 'closed',
      offering1Name: 'Will\'s Old Fashioned Turkey Burger Kit',
      offering1Votes: 522,
      offering1ImageUrl: 'https://www.cookingclassy.com/wp-content/uploads/2019/05/turkey-burger-12-768x1152.jpg',
      offering1Description: 'A sturdy burger.',
      offering2Name: 'Dakota\'s Blue Cheese Burger Kit',
      offering2Votes: 632,
      offering2ImageUrl: 'https://hips.hearstapps.com/del.h-cdn.co/assets/17/16/1600x1194/gallery-1492695774-blue-cheese-burger.jpg?resize=768:*',
      offering2Description: 'To die for.'
    },
    {
      name: 'We All Scream',
      end: '2020-09-25T12:00:00.500Z',
      status: 'open',
      offering1Name: 'Anastasia`s Orange Sherbert Kit',
      offering1Votes: 0,
      offering1ImageUrl: 'https://www.thespruceeats.com/thmb/Yv-nSj-L_5TcijdCyKPznNYRnRU=/960x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/GettyImages-175656681-5a9b2b4c0e23d90037575303.jpg',
      offering1Description: 'The best ice cream you\'ll ever taste!',
      offering2Name: 'Jose`s Rocky Road Kit',
      offering2Votes: 0,
      offering2ImageUrl: 'https://barefeetinthekitchen.com/wp-content/uploads/2015/08/rocky-road-ice-cream-9.jpg',
      offering2Description: 'No, this is the best ice cream you\'ll ever taste!'
    },
    {
      name: 'We All Scream',
      end: '2020-09-25T12:00:00.500Z',
      status: 'open',
      offering1Name: 'Anastasia`s Orange Sherbert Kit',
      offering1Votes: 0,
      offering1ImageUrl: 'https://www.lecremedelacrumb.com/wp-content/uploads/2019/01/best-simple-green-salad-3.jpg',
      offering1Description: 'The best ice cream you\'ll ever taste!',
      offering2Name: 'Jose`s Rocky Road Kit',
      offering2Votes: 0,
      offering2ImageUrl: 'https://s23209.pcdn.co/wp-content/uploads/2020/03/Best-Ever-Beef-StewIMG_1367.jpg',
      offering2Description: 'No, this is the best ice cream you\'ll ever taste!'
    }
  ];

  await Poll.create(businessPolls.map(poll => ({
    name: poll.name,
    end: poll.end,
    status: poll.status,
    restaurant: restaurant._id,
    offering1Name: poll.offering1Name,
    offering1Votes: poll.offering1Votes,
    offering1ImageUrl: poll.offering1ImageUrl,
    offering1Description: poll.offering1Description,
    offering2Name: poll.offering2Name,
    offering2Votes: poll.offering2Votes,
    offering2ImageUrl: poll.offering2ImageUrl,
    offering2Description: poll.offering2Description
  })));
};
