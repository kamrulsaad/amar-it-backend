import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const data = [
    {
        title: 'High-Speed Fiber 1000',
        description:
            "Experience the future of internet with our High-Speed Fiber 1000 service. Stream, game, and work with lightning-fast speeds that will transform your online experience. With High-Speed Fiber 1000, you can say goodbye to buffering and hello to seamless connectivity. Whether you're a gamer, a movie buff, or a remote worker, this service is designed to meet your needs. Browse, download, and upload without limits. We're redefining what it means to be connected. Welcome to the future of the internet!",
        features: [
            'Blazing Gigabit speeds',
            '24/7 customer support',
            'Free professional installation',
        ],
        charge: 79.99,
        status: 'active',
    },
    {
        title: 'Basic DSL',
        description:
            "Stay connected with our Basic DSL internet service. It's an affordable and reliable choice for casual users who need internet access for everyday tasks. Whether you're checking emails, browsing social media, or shopping online, Basic DSL has got you covered. No need to break the bank for internet access; enjoy a budget-friendly option with consistent performance.",
        features: ['10 Mbps speed', 'Email support', 'No data caps'],
        charge: 29.99,
        status: 'active',
    },
    {
        title: 'Mobile Hotspot',
        description:
            "Stay connected on the go with our Mobile Hotspot service. Whether you're traveling, working remotely, or need a backup internet solution, our 4G LTE Mobile Hotspot provides reliable internet access wherever you are. No need for cables or complicated setups. Just turn it on and stay connected. It's the ultimate convenience in a small package.",
        features: ['4G LTE coverage', 'Portable device', 'No data caps'],
        charge: 49.99,
        status: 'active',
    },
    {
        title: 'Premium Fiber Pro',
        description:
            "Elevate your online experience with Premium Fiber Pro. Enjoy symmetrical speeds that make downloads and uploads lightning-fast. With our Premium Fiber Pro service, you also get the benefit of professional installation and advanced security features to keep your online activities secure. It's the premium choice for those who demand the best.",
        features: [
            'Symmetrical speeds',
            'Professional installation',
            'Advanced security',
        ],
        charge: 99.99,
        status: 'active',
    },
    {
        title: 'Business Fiber Pro',
        description:
            "Take your business to the next level with Business Fiber Pro. This service is designed for businesses that require dedicated support and high-speed internet. You'll get a static IP address and a managed firewall for enhanced security. Stay connected and secure with Business Fiber Pro.",
        features: [
            'Dedicated business support',
            'Static IP address',
            'Managed firewall',
        ],
        charge: 149.99,
        status: 'active',
    },
    {
        title: 'Home DSL Plus',
        description:
            'Home DSL Plus offers high-speed internet with a 50 Mbps connection, ideal for streaming, gaming, and multiple devices. It comes with a free router and no throttling, ensuring you have the best online experience. Say goodbye to buffering and hello to smooth streaming and gaming.',
        features: ['50 Mbps speed', 'Free router', 'No throttling'],
        charge: 39.99,
        status: 'active',
    },
    {
        title: 'Upcoming Satellite Internet',
        description:
            'Get ready for the future of internet connectivity with our upcoming Satellite Internet service. With low latency and global coverage, this service is ideal for remote areas and locations where traditional internet is unavailable. Enjoy the freedom of internet access, no matter where you are.',
        features: ['Low latency', 'Global coverage', 'No need for cables'],
        charge: 69.99,
        status: 'upcoming',
    },
    {
        title: 'Home DSL Basic',
        description:
            "Home DSL Basic is the perfect choice for affordable internet access. With a 5 Mbps speed, it's suitable for light internet users who want a budget-friendly option. There's no contract, so you have the flexibility to choose what works for you without commitment.",
        features: ['5 Mbps speed', 'No contract', 'Affordable pricing'],
        charge: 19.99,
        status: 'active',
    },
    {
        title: 'Cable Internet Plus',
        description:
            'Experience the power of Cable Internet Plus with blazing-fast speeds of 100 Mbps. It comes with free installation and no data caps, making it the ultimate choice for streaming, online gaming, and downloading large files. Say goodbye to slow connections and hello to seamless online experiences.',
        features: ['100 Mbps speed', 'Free installation', 'No data caps'],
        charge: 59.99,
        status: 'active',
    },
    {
        title: 'Upcoming 5G Home Internet',
        description:
            "Get ready for the future of internet connectivity with our upcoming 5G Home Internet service. Experience ultra-fast speeds and low latency, making it perfect for all your online activities, from gaming to video conferencing. It's smart home-ready, ensuring you're prepared for the connected future.",
        features: ['Ultra-fast 5G speeds', 'Low latency', 'Smart home ready'],
        charge: 79.99,
        status: 'upcoming',
    },
    {
        title: 'Family Internet Bundle',
        description:
            "Connect your entire family with our Family Internet Bundle. This service allows for multiple connections and includes parental controls to manage online activities. With an affordable price, it's the perfect solution to keep everyone connected without compromising on security.",
        features: [
            'Multiple connections',
            'Parental controls',
            'Affordable price',
        ],
        charge: 69.99,
        status: 'active',
    },
    {
        title: 'Ultra-Fast Satellite Internet',
        description:
            "Prepare for the launch of our Ultra-Fast Satellite Internet service. It offers blazing-fast speeds, low latency, and global coverage. Whether you're in a remote location or simply want top-tier internet performance, this service is your ticket to the future. Stay connected like never before!",
        features: ['Ultra-fast speeds', 'Low latency', 'Global coverage'],
        charge: 79.99,
        status: 'upcoming',
    },
    {
        title: 'Home Cable Plus',
        description:
            'Elevate your home internet experience with Home Cable Plus. It offers a fast and reliable connection with 200 Mbps speed, making it perfect for streaming, online gaming, and working from home. Enjoy unlimited data and low ping times for an exceptional online experience.',
        features: ['200 Mbps speed', 'Unlimited data', 'Low ping times'],
        charge: 69.99,
        status: 'active',
    },
];

const homeBannerData = [
    {
        title: 'High-Speed Internet Plans',
        content:
            'Explore our high-speed internet plans with lightning-fast download and upload speeds. Stream, game, and work from home without buffering or interruptions. Choose the plan that suits your needs and enjoy a seamless online experience.',
        image: 'https://res.cloudinary.com/djri0huwq/image/upload/v1698990488/culqmd4m0wel0yiag1h8.png',
    },
    {
        title: '24/7 Customer Support',
        content:
            "Our dedicated customer support team is available 24/7 to assist you with any internet-related issues. We're here to help with troubleshooting, billing inquiries, and technical support. Your satisfaction is our top priority.",
        image: 'https://res.cloudinary.com/djri0huwq/image/upload/v1698990522/cm4lkehbw2kaxyvsofqf.png',
    },
    {
        title: 'Fiber Optic Network',
        content:
            "Experience the power of our advanced fiber optic network. With fiber internet, you'll enjoy unparalleled reliability and blazing-fast speeds. Say goodbye to slow connections and hello to a world of possibilities.",
        image: 'https://res.cloudinary.com/djri0huwq/image/upload/v1698990556/jsayid9wiafgzr8ibx3b.png',
    },
    {
        title: 'Secure and Reliable Connectivity',
        content:
            'We prioritize the security and reliability of your internet connection. Our network is designed to keep your data safe, and we offer features like firewall protection and antivirus software. Trust us for a worry-free online experience.',
        image: 'https://res.cloudinary.com/djri0huwq/image/upload/v1698990587/iaz8pxgeui0ghinieei8.png',
    },
    {
        title: 'Affordable Internet Packages',
        content:
            "Discover affordable internet packages that fit any budget. Whether you're a student, a family, or a small business owner, we have plans that provide great value without breaking the bank. Stay connected without overspending.",
        image: 'https://res.cloudinary.com/djri0huwq/image/upload/v1698990679/yxn41u9p2bineh0hy4g8.png',
    },
];

const faqData = [
    {
        question: 'What types of internet plans do you offer?',
        answer: 'We offer a variety of plans to suit different needs, including high-speed broadband, fiber-optic, and wireless options. You can choose a plan based on your usage requirements and budget.',
    },
    {
        question:
            'How do I check the availability of your internet service in my area?',
        answer: 'You can check the availability of our internet service in your area by visiting our website or contacting our customer service. We provide a coverage map and can assist you in finding the best available options for your location.',
    },
    {
        question: 'What equipment is provided with the internet service?',
        answer: 'We provide a modem or router with our internet service. The type of equipment may vary based on the plan you choose. Our customer support can guide you on the setup process and any additional equipment you might need.',
    },
    {
        question: 'What is the process for troubleshooting internet issues?',
        answer: 'If you experience internet issues, our customer support team is available 24/7 to assist you. You can contact us via phone or online chat, and we will guide you through troubleshooting steps or schedule a technician to resolve the issue promptly.',
    },
    {
        question: 'Is there a data usage limit on your internet plans?',
        answer: 'Some of our plans may have data usage limits, while others offer unlimited data. The specifics depend on the plan you choose. You can find information about data limits in the plan details on our website or by contacting our customer service.',
    },
    {
        question:
            'What security measures are in place to protect my internet connection?',
        answer: 'We prioritize the security of your internet connection. Our services include built-in security features such as firewalls and encryption. Additionally, we recommend best practices for securing your home network, and our customer support can provide guidance on enhancing your online security.',
    },
    {
        question: 'Can I upgrade or downgrade my internet plan at any time?',
        answer: 'Yes, you can upgrade or downgrade your internet plan at any time. Simply contact our customer service, and we will assist you in adjusting your plan based on your current needs and preferences. Changes to your plan may be subject to specific terms and conditions.',
    },
];

const blogCategoryData = [
    {
        title: 'Broadband Technology',
    },
    {
        title: 'Customer Support and Troubleshooting',
    },
    {
        title: 'Internet Security Tips',
    },
];

const blogData = [
    {
        title: 'The Evolution of Broadband Technology: A Glimpse into High-Speed Connectivity',
        content:
            "Broadband technology has undergone remarkable transformations over the years, revolutionizing how we connect to the internet. From the early days of dial-up to today's lightning-fast fiber-optic networks, this blog explores the fascinating journey of broadband technology.",
        blogCategoryId: 'b7e1b0b7-1a7d-409c-8597-044c107a6ca5',
        image: 'https://res.cloudinary.com/djri0huwq/image/upload/v1700176674/hzqhpyvjp2kzhk9onarx.jpg',
    },
    {
        title: 'Troubleshooting Tips: Navigating Common Internet Issues with Ease',
        content:
            'Customer support is at the core of our mission. In this blog, we delve into effective troubleshooting tips to help you overcome common internet issues swiftly. Discover the tools and techniques that empower you to enjoy a seamless online experience.',
        blogCategoryId: '0dcb6c3b-66b6-4a28-8f0b-1732540f6469',
        image: 'https://res.cloudinary.com/djri0huwq/image/upload/v1700176674/hzqhpyvjp2kzhk9onarx.jpg',
    },
    {
        title: 'Securing Your Connection: Practical Internet Security Tips for a Safe Online Experience',
        content:
            'In an era of increased online threats, prioritizing internet security is paramount. This blog provides actionable tips and best practices to safeguard your digital life. Stay one step ahead of cyber threats with our comprehensive guide.',
        blogCategoryId: '941adace-950b-4c54-a1ab-f7067e2f3854',
        image: 'https://res.cloudinary.com/djri0huwq/image/upload/v1700176674/hzqhpyvjp2kzhk9onarx.jpg',
    },
    {
        title: 'Optimizing Broadband Speed: Unleashing the Full Potential of Your Internet Connection',
        content:
            'Unlock the secrets to maximize your broadband speed. From optimizing router settings to understanding bandwidth allocation, this blog provides practical tips to ensure you get the most out of your high-speed internet connection.',
        blogCategoryId: 'b7e1b0b7-1a7d-409c-8597-044c107a6ca5',
        image: 'https://res.cloudinary.com/djri0huwq/image/upload/v1700176674/hzqhpyvjp2kzhk9onarx.jpg',
    },
    {
        title: 'Empowering Customer Support: A Behind-the-Scenes Look at Resolving Internet Challenges',
        content:
            'Delve into the world of customer support and troubleshooting as we share insights into the strategies and tools our dedicated team employs to address your internet challenges. Learn how we are committed to delivering exceptional service.',
        blogCategoryId: '0dcb6c3b-66b6-4a28-8f0b-1732540f6469',
        image: 'https://res.cloudinary.com/djri0huwq/image/upload/v1700176674/hzqhpyvjp2kzhk9onarx.jpg',
    },
    {
        title: 'Guardians of the Gateway: A Comprehensive Guide to Internet Security Measures',
        content:
            'Embark on a journey to fortify your online defenses. This blog covers the latest internet security measures, including firewalls, antivirus software, and safe browsing practices. Strengthen your digital armor and protect your online world.',
        blogCategoryId: '941adace-950b-4c54-a1ab-f7067e2f3854',
        image: 'https://res.cloudinary.com/djri0huwq/image/upload/v1700176674/hzqhpyvjp2kzhk9onarx.jpg',
    },
    {
        title: 'Fiber-Optic Marvels: Revolutionizing Broadband Technology for the Future',
        content:
            'Explore the cutting-edge world of fiber-optic technology and its role in shaping the future of high-speed internet. Learn about the unparalleled speed and reliability that fiber-optic broadband brings to your digital doorstep.',
        blogCategoryId: 'b7e1b0b7-1a7d-409c-8597-044c107a6ca5',
        image: 'https://res.cloudinary.com/djri0huwq/image/upload/v1700176674/hzqhpyvjp2kzhk9onarx.jpg',
    },
    {
        title: '24/7 Support: Your Lifeline to Uninterrupted Internet Connectivity',
        content:
            'Discover the world-class customer support services that ensure your internet connection remains seamless. This blog sheds light on the dedication and expertise of our support team, available round-the-clock to assist you.',
        blogCategoryId: '0dcb6c3b-66b6-4a28-8f0b-1732540f6469',
        image: 'https://res.cloudinary.com/djri0huwq/image/upload/v1700176674/hzqhpyvjp2kzhk9onarx.jpg',
    },
    {
        title: 'Safeguarding Your Digital Sanctuary: Internet Security Beyond the Basics',
        content:
            'Take a deep dive into advanced internet security practices to fortify your digital sanctuary. From multi-factor authentication to secure VPNs, this blog explores additional layers of protection for a worry-free online experience.',
        blogCategoryId: '941adace-950b-4c54-a1ab-f7067e2f3854',
        image: 'https://res.cloudinary.com/djri0huwq/image/upload/v1700176674/hzqhpyvjp2kzhk9onarx.jpg',
    },
    {
        title: 'Exploring Broadband Innovations: The Rise of Gigabit Internet',
        content:
            'Dive into the world of gigabit internet and witness the latest innovations in broadband technology. Discover how gigabit speeds are reshaping the digital landscape, providing unprecedented connectivity for homes and businesses.',
        blogCategoryId: 'b7e1b0b7-1a7d-409c-8597-044c107a6ca5',
        image: 'https://res.cloudinary.com/djri0huwq/image/upload/v1700176674/hzqhpyvjp2kzhk9onarx.jpg',
    },
    {
        title: 'Troubleshooting Demystified: A Guide to Resolving Common Internet Hiccups',
        content:
            'Unravel the mysteries of internet troubleshooting with this comprehensive guide. From slow connections to connectivity drops, learn the step-by-step process to identify and resolve common internet hiccups with ease.',
        blogCategoryId: '0dcb6c3b-66b6-4a28-8f0b-1732540f6469',
        image: 'https://res.cloudinary.com/djri0huwq/image/upload/v1700176674/hzqhpyvjp2kzhk9onarx.jpg',
    },
    {
        title: 'Cyber Hygiene 101: Best Practices for a Secure Online Experience',
        content:
            'Elevate your cyber hygiene with essential best practices for a secure online experience. This blog covers password management, software updates, and proactive measures to safeguard your digital presence from potential threats.',
        blogCategoryId: '941adace-950b-4c54-a1ab-f7067e2f3854',
        image: 'https://res.cloudinary.com/djri0huwq/image/upload/v1700176674/hzqhpyvjp2kzhk9onarx.jpg',
    },
];

async function main() {
    try {
        // await prisma.service.createMany({
        //     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //     // @ts-ignore
        //     data: data,
        // });
        // await prisma.homeBannerContents.createMany({
        //     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //     // @ts-ignore
        //     data: homeBannerData,
        // });
        // await prisma.fAQ.createMany({
        //     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //     // @ts-ignore
        //     data: faqData,
        // });
        // await prisma.blogCategory.createMany({
        //     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //     // @ts-ignore
        //     data: blogCategoryData,
        // });
        await prisma.blog.createMany({
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            data: blogData,
        });
        // const data = await prisma.service.findMany();
        // console.log(data);
        console.log('Success');
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

main();

/**
 *
 * 
 */
