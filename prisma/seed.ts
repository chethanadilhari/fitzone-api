import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {
    const packages = [
        {
            name: 'Basic Package',
            description: 'Best for: Beginners & casual enthusiasts',
            price: 29.00,
            group_class_count: 5,
            personal_training_count: 0,
            nutrition_consultations: 0,
        },
        {
            name: 'Standard Package',
            description: 'Best for: Fitness enthusiasts & intermediate level',
            price: 49.00,
            group_class_count: -1,
            personal_training_count: 2,
            nutrition_consultations: 4,
        },
        {
            name: 'Premium Package',
            description: 'Best for: Advanced athletes and serious lifters',
            price: 79.00,
            group_class_count: -1,
            personal_training_count: 4,
            nutrition_consultations: 1,
        },
    ];

    for (const pkg of packages) {
        await prisma.package.create({
            data: pkg,
        });
    }

    console.log('Sample packages added successfully');
}

seed()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });