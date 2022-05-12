<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Models\ProductCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProductCategoryController extends Controller
{
    //Get All Categories
    public function index()
    {
        $product_categories = ProductCategory::all();

        if ($product_categories) {
            return response()->json([
                'status' => 200,
                'product_categories' => $product_categories,
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'product_categories' => 'Not Found.',
            ]);
        }
    }

    //Add new
    public function create()
    {
        return response()->json([
            'status' => 200,
            'message' => 'Add New Page.',
        ]);
    }
    //Store new product Category
    public function store(Request $request)
    {
        if ($request->isMethod('post')) {

            $validator = Validator::make(
                $request->all(),
                [
                    'cat_name' => 'required',
                ],
                [
                    'cat_name.required' => 'Product Category Name Is Required',
                ]
            );

            if ($validator->fails()) {
                ## For send response to the api or jquery
                return response()->json([
                    'status' => '400',
                    'errors' => $validator->errors(),
                ]);
            }

            $product_category = new ProductCategory();
            $product_category->cat_name = $request->cat_name;
            $product_category->save();

            return response()->json([
                'status' => 200,
                'message' => 'Data Inserted Successful.',
                'product_category' => $product_category,
            ]);
        }
    }

    //show single product category
    public function show($id)
    {
        $single_product_category = ProductCategory::find($id);

        if ($single_product_category) {
            return response()->json([
                'status' => 200,
                'single_product_category' => $single_product_category,
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'Not Found.',
            ]);
        }
    }

    // Edit product Category
    public function edit($id)
    {
        $single_product_category = ProductCategory::find($id);

        if ($single_product_category) {
            return response()->json([
                'status' => 200,
                'single_product_category' => $single_product_category,
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'Not Found.',
            ]);
        }
    }
    // Update product Category
    public function update(Request $request, $id)
    {
        $single_product_category = ProductCategory::find($id);

        if ($single_product_category) {

            $validator = Validator::make(
                $request->all(),
                [
                    'cat_name' => 'required',
                ],
                [
                    'cat_name.required' => 'Product Category Name Is Required',
                ]
            );

            if ($validator->fails()) {
                ## For send response to the api or jquery
                return response()->json([
                    'status' => '400',
                    'errors' => $validator->errors(),
                ]);
            }

            $single_product_category->cat_name = $request->cat_name;
            $single_product_category->save();

            return response()->json([
                'status' => 200,
                'message' => 'Product Category Updated Successful.',
                'single_product_category' => $single_product_category,
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'Not Found.',
            ]);
        }
    }

    //Delete product category
    public function destroy($id)
    {
        $single_product_category = ProductCategory::find($id);

        if ($single_product_category) {
            $single_product_category->delete();
            return response()->json([
                'status' => 200,
                'message' => 'Deleted Successful',
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'Not Found.',
            ]);
        }
    }
}
