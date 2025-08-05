// import { NextRequest, NextResponse } from 'next/server';
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// // GET /api/admin/products/migrate - Auto-migrate all products without variants
// export async function GET(request: NextRequest) {
//   try {
    
//     // Find and migrate products without variants in one go
//     const productsWithoutVariants = await prisma.product.findMany({
//       where: {
//         variants: {
//           none: {}
//         }
//       },
//       include: {
//         variants: true
//       }
//     });

//     if (productsWithoutVariants.length === 0) {
//       return NextResponse.json({
//         status: 'success',
//         message: 'All products already have variants',
//         migratedCount: 0,
//         totalProducts: await prisma.product.count()
//       });
//     }

//     const migrationResults = [];
//     const defaultStock = 0; // Default stock for new variants

//     // Process each product
//     for (const product of productsWithoutVariants) {
//       try {
//         // Parse sizes and colors
//         let sizes: string[] = ['XS'];
//         let colors: string[] = ['Black'];

//         try {
//           if (product.sizes) {
//             const parsedSizes = JSON.parse(product.sizes);
//             if (Array.isArray(parsedSizes) && parsedSizes.length > 0) {
//               sizes = parsedSizes.filter(size => size && size.trim());
//             }
//           }
//         } catch (e) {
//           console.warn(`Could not parse sizes for product ${product.id}:`, e);
//         }

//         try {
//           if (product.colors) {
//             const parsedColors = JSON.parse(product.colors);
//             if (Array.isArray(parsedColors) && parsedColors.length > 0) {
//               colors = parsedColors.filter(color => color && color.trim());
//             }
//           }
//         } catch (e) {
//           console.warn(`Could not parse colors for product ${product.id}:`, e);
//         }

//         // Ensure we have at least default values
//         if (sizes.length === 0) sizes = ['One Size'];
//         if (colors.length === 0) colors = ['Default'];

//         // Create variants for each size/color combination
//         const variantsToCreate = [];
//         for (const size of sizes) {
//           for (const color of colors) {
//             variantsToCreate.push({
//               productId: product.id,
//               size: size.trim(),
//               color: color.trim(),
//               stock: defaultStock,
//               images: product?.images || null, // No color-specific images initially
//               sku: null // No variant SKU initially
//             });
//           }
//         }

//         // Create all variants for this product
//         const createdVariants = await prisma.productVariant.createMany({
//           data: variantsToCreate,
//           skipDuplicates: true
//         });

//         migrationResults.push({
//           productId: product.id,
//           productName: product.name,
//           sizesCount: sizes.length,
//           colorsCount: colors.length,
//           variantsCreated: createdVariants.count,
//           combinations: variantsToCreate.map(v => `${v.color} - ${v.size}`)
//         });

//       } catch (error) {
//         console.error(`Error migrating product ${product.id}:`, error);
//         migrationResults.push({
//           productId: product.id,
//           productName: product.name,
//           error: error.message || 'Migration failed'
//         });
//       }
//     }

//     // Calculate totals
//     const totalVariantsCreated = migrationResults.reduce(
//       (sum, result) => sum + (result.variantsCreated || 0), 
//       0
//     );
//     const successfulMigrations = migrationResults.filter(r => !r.error).length;
//     const failedMigrations = migrationResults.filter(r => r.error).length;

//     // Get final counts
//     const totalProducts = await prisma.product.count();
//     const productsWithVariants = await prisma.product.count({
//       where: {
//         variants: {
//           some: {}
//         }
//       }
//     });

//     return NextResponse.json({
//       status: 'success', 
//       message: `✅ Migration completed! ${successfulMigrations} products migrated successfully`,
//       migration: {
//         productsProcessed: productsWithoutVariants.length,
//         successfulMigrations,
//         failedMigrations,
//         totalVariantsCreated
//       },
//       summary: {
//         totalProducts,
//         productsWithVariants,
//         migrationComplete: productsWithVariants === totalProducts
//       },
//       results: migrationResults
//     });

//   } catch (error) {
//     console.error('Error running migration:', error);
//     return NextResponse.json(
//       { error: 'Migration failed', details: error.message },
//       { status: 500 }
//     );
//   }
// }

// // POST /api/admin/products/migrate - Run migration
// export async function POST(request: NextRequest) {
//   try {
//     const { productIds, defaultStock = 0 } = await request.json();

//     let productsToMigrate;

//     // If specific product IDs provided, migrate only those
//     if (productIds && Array.isArray(productIds)) {
//       productsToMigrate = await prisma.product.findMany({
//         where: {
//           id: { in: productIds },
//           variants: { none: {} }
//         },
//         include: {
//           variants: true
//         }
//       });
//     } else {
//       // Migrate all products without variants
//       productsToMigrate = await prisma.product.findMany({
//         where: {
//           variants: { none: {} }
//         },
//         include: {
//           variants: true
//         }
//       });
//     }

//     if (productsToMigrate.length === 0) {
//       return NextResponse.json({
//         message: 'No products need migration',
//         migratedCount: 0
//       });
//     }

//     const migrationResults = [];

//     // Process each product
//     for (const product of productsToMigrate) {
//       try {
//         // Parse sizes and colors
//         let sizes: string[] = ['One Size'];
//         let colors: string[] = ['Default'];

//         try {
//           if (product.sizes) {
//             const parsedSizes = JSON.parse(product.sizes);
//             if (Array.isArray(parsedSizes) && parsedSizes.length > 0) {
//               sizes = parsedSizes.filter(size => size && size.trim());
//             }
//           }
//         } catch (e) {
//           console.warn(`Could not parse sizes for product ${product.id}:`, e);
//         }

//         try {
//           if (product.colors) {
//             const parsedColors = JSON.parse(product.colors);
//             if (Array.isArray(parsedColors) && parsedColors.length > 0) {
//               colors = parsedColors.filter(color => color && color.trim());
//             }
//           }
//         } catch (e) {
//           console.warn(`Could not parse colors for product ${product.id}:`, e);
//         }

//         // Ensure we have at least default values
//         if (sizes.length === 0) sizes = ['One Size'];
//         if (colors.length === 0) colors = ['Default'];

//         // Create variants for each size/color combination
//         const variantsToCreate = [];
//         for (const size of sizes) {
//           for (const color of colors) {
//             variantsToCreate.push({
//               productId: product.id,
//               size: size.trim(),
//               color: color.trim(),
//               stock: defaultStock,
//               images: null, // No color-specific images initially
//               sku: null // No variant SKU initially
//             });
//           }
//         }

//         // Create all variants for this product
//         const createdVariants = await prisma.productVariant.createMany({
//           data: variantsToCreate,
//           skipDuplicates: true
//         });

//         migrationResults.push({
//           productId: product.id,
//           productName: product.name,
//           sizesCount: sizes.length,
//           colorsCount: colors.length,
//           variantsCreated: createdVariants.count,
//           combinations: variantsToCreate.map(v => `${v.color} - ${v.size}`)
//         });

//       } catch (productError) {
//         console.error(`Error migrating product ${product.id}:`, productError);
//         migrationResults.push({
//           productId: product.id,
//           productName: product.name,
//           error: productError.message || 'Migration failed'
//         });
//       }
//     }

//     // Calculate totals
//     const totalVariantsCreated = migrationResults.reduce(
//       (sum, result) => sum + (result.variantsCreated || 0), 
//       0
//     );
//     const successfulMigrations = migrationResults.filter(r => !r.error).length;
//     const failedMigrations = migrationResults.filter(r => r.error).length;

//     return NextResponse.json({
//       status: 'success',
//       message: `Migration completed: ${successfulMigrations} products migrated successfully`,
//       summary: {
//         totalProductsProcessed: productsToMigrate.length,
//         successfulMigrations,
//         failedMigrations,
//         totalVariantsCreated
//       },
//       results: migrationResults
//     });

//   } catch (error) {
//     console.error('Error running migration:', error);
//     return NextResponse.json(
//       { error: 'Migration failed', details: error.message },
//       { status: 500 }
//     );
//   }
// }

// // DELETE /api/admin/products/migrate - Reset migration (remove all variants)
// export async function DELETE(request: NextRequest) {
//   try {
//     const { productIds } = await request.json();

//     let whereClause = {};
//     if (productIds && Array.isArray(productIds)) {
//       whereClause = { productId: { in: productIds } };
//     }

//     // Delete variants
//     const deletedVariants = await prisma.productVariant.deleteMany({
//       where: whereClause
//     });

//     return NextResponse.json({
//       status: 'success',
//       message: `Reset completed: ${deletedVariants.count} variants removed`,
//       deletedCount: deletedVariants.count
//     });

//   } catch (error) {
//     console.error('Error resetting migration:', error);
//     return NextResponse.json(
//       { error: 'Reset failed', details: error.message },
//       { status: 500 }
//     );
//   }
// }