import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

async function main() {
  console.log('🌱 Seeding database...');

  // Create categories
  console.log('Creating categories...');
  const menCategory = await prisma.category.upsert({
    where: { slug: 'men' },
    update: {},
    create: {
      name: 'Men',
      slug: 'men',
      description: 'Stylish clothing for men',
      image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg'
    }
  });

  const womenCategory = await prisma.category.upsert({
    where: { slug: 'women' },
    update: {},
    create: {
      name: 'Women',
      slug: 'women',
      description: 'Trendy fashion for women',
      image: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg'
    }
  });

  const kidsCategory = await prisma.category.upsert({
    where: { slug: 'kids' },
    update: {},
    create: {
      name: 'Kids',
      slug: 'kids',
      description: 'Comfortable clothes for children',
      image: 'https://images.pexels.com/photos/1620760/pexels-photo-1620760.jpeg'
    }
  });

  console.log('Categories created successfully!');

  // Create sample products
  console.log('Creating products...');
  const products = [
    {
      name: 'Classic White T-Shirt',
      slug: 'classic-white-t-shirt',
      description: 'A comfortable and versatile white t-shirt made from 100% cotton.',
      price: 29.99,
      comparePrice: 39.99,
      sku: 'CWT001',
      stock: 100,
      images: JSON.stringify([
        'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg',
        'https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg'
      ]),
      sizes: JSON.stringify(['XS', 'S', 'M', 'L', 'XL']),
      colors: JSON.stringify(['White', 'Black', 'Gray']),
      featured: true,
      categoryId: menCategory.id
    },
    {
      name: 'Denim Jacket',
      slug: 'denim-jacket',
      description: 'Classic denim jacket perfect for layering.',
      price: 89.99,
      comparePrice: 120.00,
      sku: 'DJ001',
      stock: 50,
      images: JSON.stringify([
        'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg'
      ]),
      sizes: JSON.stringify(['S', 'M', 'L', 'XL']),
      colors: JSON.stringify(['Blue', 'Black']),
      featured: true,
      categoryId: menCategory.id
    },
    {
      name: 'Floral Summer Dress',
      slug: 'floral-summer-dress',
      description: 'Beautiful floral dress perfect for summer occasions.',
      price: 79.99,
      comparePrice: 99.99,
      sku: 'FSD001',
      stock: 75,
      images: JSON.stringify([
        'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg'
      ]),
      sizes: JSON.stringify(['XS', 'S', 'M', 'L']),
      colors: JSON.stringify(['Pink', 'Blue', 'Yellow']),
      featured: true,
      categoryId: womenCategory.id
    },
    {
      name: 'Kids Rainbow Hoodie',
      slug: 'kids-rainbow-hoodie',
      description: 'Colorful and cozy hoodie for kids.',
      price: 39.99,
      comparePrice: 49.99,
      sku: 'KRH001',
      stock: 60,
      images: JSON.stringify([
        'https://images.pexels.com/photos/1620760/pexels-photo-1620760.jpeg'
      ]),
      sizes: JSON.stringify(['2T', '3T', '4T', '5T', '6T']),
      colors: JSON.stringify(['Rainbow', 'Blue', 'Pink']),
      featured: true,
      categoryId: kidsCategory.id
    },
    {
      name: 'Casual Sneakers',
      slug: 'casual-sneakers',
      description: 'Comfortable sneakers for everyday wear.',
      price: 69.99,
      comparePrice: 89.99,
      sku: 'CS001',
      stock: 80,
      images: JSON.stringify([
        'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg'
      ]),
      sizes: JSON.stringify(['7', '8', '9', '10', '11', '12']),
      colors: JSON.stringify(['White', 'Black', 'Navy']),
      featured: false,
      categoryId: menCategory.id
    },
    {
      name: 'Elegant Blouse',
      slug: 'elegant-blouse',
      description: 'Professional blouse perfect for office wear.',
      price: 59.99,
      comparePrice: 79.99,
      sku: 'EB001',
      stock: 45,
      images: JSON.stringify([
        'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg'
      ]),
      sizes: JSON.stringify(['XS', 'S', 'M', 'L', 'XL']),
      colors: JSON.stringify(['White', 'Navy', 'Pink']),
      featured: false,
      categoryId: womenCategory.id
    }
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {},
      create: product
    });
  }

  console.log('Products created successfully!');

  // Create admin user
  console.log('Creating admin user...');
  const hashedPassword = await hashPassword('admin123');
  await prisma.user.upsert({
    where: { email: 'admin@clothify.com' },
    update: {},
    create: {
      email: 'admin@clothify.com',
      password: hashedPassword,
      firstName: 'Admin',
      lastName: 'User',
      role: 'ADMIN'
    }
  });

  // Create a regular test user
  console.log('Creating test user...');
  const testUserPassword = await hashPassword('test123');
  await prisma.user.upsert({
    where: { email: 'test@clothify.com' },
    update: {},
    create: {
      email: 'test@clothify.com',
      password: testUserPassword,
      firstName: 'Test',
      lastName: 'User',
      phone: '+1234567890',
      role: 'USER'
    }
  });

  console.log('✅ Database seeded successfully!');
  console.log('');
  console.log('🔑 Admin Login:');
  console.log('   Email: admin@clothify.com');
  console.log('   Password: admin123');
  console.log('');
  console.log('👤 Test User Login:');
  console.log('   Email: test@clothify.com');
  console.log('   Password: test123');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });