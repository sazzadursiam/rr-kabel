<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Models\BlogCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class BlogCategoryController extends Controller
{
    //Get All Videos
    public function index()
    {
        $blogCategories = BlogCategory::orderBy('id', 'DESC')->select('id', 'categoryName', 'categorySlug')->get();

        if ($blogCategories) {
            return response()->json([
                'status' => 200,
                'blogCategories' => $blogCategories,
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'No Record Found.',
            ]);
        }
    }

    //Store New Record
    public function store(Request $request)
    {
        if ($request->isMethod('post')) {

            //Validation
            $validator = Validator::make(
                $request->all(),
                [
                    'categoryName' => 'required',
                ],
                //custom validation message
                [
                    'categoryName.required' => 'Category name is required',
                ]
            );

            if ($validator->fails()) {

                return response()->json([
                    'status' => '400',
                    'errors' => $validator->errors(),
                ]);
            }

            //insert new record
            $model = new BlogCategory();
            $model->categoryName = $request->categoryName;
            //create slug
            $slug = Str::slug($request->categoryName);

            $slug_check = BlogCategory::where('categorySlug', $slug)->count();
            //checking slug exist
            if ($slug_check > 0) {
                $slug = time() . '-' . $slug;
            }

            $model->categorySlug = $slug;

            $model->save();

            return response()->json([
                'status' => 200,
                'message' => 'Data Inserted Successful.',
                'blogCategory' => $model,
            ]);
        }
    }

    //show single Blog Category
    public function show($id)
    {
        $singleBlogCategory = BlogCategory::find($id);

        if ($singleBlogCategory) {
            return response()->json([
                'status' => 200,
                'singleBlogCategory' => $singleBlogCategory,
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'Not Found.',
            ]);
        }
    }

    // Edit Blog Category
    public function edit($id)
    {
        $editInfo = BlogCategory::find($id);

        if ($editInfo) {
            return response()->json([
                'status' => 200,
                'editInfo' => $editInfo,
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'Not Found.',
            ]);
        }
    }

    //Update Record
    public function update(Request $request, $id)
    {


        //Validation
        $validator = Validator::make(
            $request->all(),
            [
                'categoryName' => 'required',
            ],
            //custom validation message
            [
                'categoryName.required' => 'Category name is required',
            ]
        );

        if ($validator->fails()) {

            return response()->json([
                'status' => '400',
                'errors' => $validator->errors(),
            ]);
        }

        //insert new record
        $model = BlogCategory::find($id);
        $model->categoryName = $request->categoryName;
        //create slug
        $slug = Str::slug($request->categoryName);

        $slug_check = BlogCategory::where('categorySlug', $slug)->where('id', '!=', $id)->count();
        //checking slug exist
        if ($slug_check > 0) {
            $slug = time() . '-' . $slug;
        }

        $model->categorySlug = $slug;

        $model->save();

        return response()->json([
            'status' => 200,
            'message' => 'Update Successfull.',
            'blogCategory' => $model,
        ]);
    }

    //Delete Record
    public function destroy($id)
    {
        $model = BlogCategory::find($id);

        if ($model) {
            $model->delete();
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
