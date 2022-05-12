<?php

namespace Database\Seeders;

use App\Models\ProductCategory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductCategoryTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Product Categories records
        $product__categories__record = [
            [
                'cat_name' => 'Single Core (Cu or AI/PVC-FRLSH)',
            ],
            [
                'cat_name' => 'Single Core (Cu or AI/PVC-FR/PVC)',
            ],
            [
                'cat_name' => '2 Core (Cu/PVC-FR/ECC/PVC)',
            ],
        ];

        ProductCategory::insert($product__categories__record);
    }
}