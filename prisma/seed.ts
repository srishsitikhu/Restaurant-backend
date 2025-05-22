import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const seedUser = async () => {
    const hash = await bcrypt.hash("password", 10);

    const user = await prisma.user.upsert({
        where: { email: "superadmin@gmail.com" },
        update: {},
        create: {
            name: "superAdmin",
            email: "superadmin@gmail.com",
            passwordHash: hash,
            role: "admin"
        },
    });

    console.log("✅ Super admin user seeded successfully.");
};

const main = async () => {
    await seedUser();
};

main()
    .then(() => console.log("🌱 Seeding completed."))
    .catch((error) => {
        console.error("❌ Error seeding database:", error);
    })
    .finally(async () => {
        await prisma.$disconnect();
        console.log("🔌 Disconnected from database.");
    });
