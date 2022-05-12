<?php

use App\Http\Controllers\Backend\DashboardController;
use App\Http\Controllers\Backend\PhotoGalleryController;
use App\Http\Controllers\Backend\ProductCategoryController;
use App\Http\Controllers\Backend\VideoGalleryController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => '/v1'], function () {
    Route::group(['prefix' => '/admin'], function () {
        Route::get('/', [DashboardController::class, 'index'])->name('home-page');
        /* ## ========== Product Category Route Start ========== ## */
        Route::group(['prefix' => 'product-category'], function () {
            Route::get('/', [ProductCategoryController::class, 'index'])->name('product-category');
            Route::get('/create', [ProductCategoryController::class, 'create'])->name('product-category.create');
            Route::post('/store', [ProductCategoryController::class, 'store'])->name('product-category.store');
            Route::get('/{id}/show', [ProductCategoryController::class, 'show'])->name('product-category.show');
            Route::get('/{id}/edit', [ProductCategoryController::class, 'edit'])->name('product-category.edit');
            Route::put('/{id}/update', [ProductCategoryController::class, 'update'])->name('product-category.update');
            Route::delete('/{id}/delete', [ProductCategoryController::class, 'destroy'])->name('product-category.detete');
        });
        /* ## ========== Product Category Route End ========== ## */

        /* ## ========== Photo Gallery Route Start ========== ## */
        Route::group(['prefix' => 'photo-gallery'], function () {
            Route::get('/', [PhotoGalleryController::class, 'index'])->name('photo-gallery');
            // Route::get('/create', [PhotoGalleryController::class, 'create'])->name('photo-gallery.create');
            Route::post('/store', [PhotoGalleryController::class, 'store'])->name('photo-gallery.store');
            Route::get('/{id}/show', [PhotoGalleryController::class, 'show'])->name('photo-gallery.show');
            Route::get('/{id}/edit', [PhotoGalleryController::class, 'edit'])->name('photo-gallery.edit');
            Route::put('/{id}/update', [PhotoGalleryController::class, 'update'])->name('product-category.update');
            Route::delete('/{id}/delete', [PhotoGalleryController::class, 'destroy'])->name('photo-gallery.detete');
        });
        /* ## ========== Photo Gallery Route End ========== ## */

        /* ## ========== Video Gallery Route Start ========== ## */
        Route::group(['prefix' => 'video-gallery'], function () {
            Route::get('/', [VideoGalleryController::class, 'index'])->name('video-gallery');
            // Route::get('/create', [VideoGalleryController::class, 'create'])->name('video-gallery.create');
            Route::post('/store', [VideoGalleryController::class, 'store'])->name('video-gallery.store');
            Route::get('/{id}/show', [VideoGalleryController::class, 'show'])->name('video-gallery.show');
            Route::get('/{id}/edit', [VideoGalleryController::class, 'edit'])->name('video-gallery.edit');
            Route::put('/{id}/update', [VideoGalleryController::class, 'update'])->name('product-category.update');
            Route::delete('/{id}/delete', [VideoGalleryController::class, 'destroy'])->name('video-gallery.detete');
        });
        /* ## ========== Video Gallery Route End ========== ## */
    });
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
