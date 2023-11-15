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

async function main() {
    try {
        await prisma.service.createMany({
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            data: data,
        });
        console.log('Success');
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

main();
