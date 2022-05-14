<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('blog_categories', function (Blueprint $table) {
            $table->id();
            $table->string('categoryName', 255);
            $table->string('categorySlug', 255)->unique();
            $table->integer('parrentCategoryId')->default(0)->comment('0: Main Category');
            $table->string('categoryShortDescription', 255)->nullable();
            $table->string('categoryImage', 255)->nullable();
            $table->tinyInteger('status')->default(1)->comment('0: In-active, 1: Active');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('blog_categories');
    }
};
