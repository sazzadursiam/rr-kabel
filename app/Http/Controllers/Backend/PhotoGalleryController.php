<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Models\PhotoGallery;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class PhotoGalleryController extends Controller
{
    //Get All Photo Gallery
    public function index()
    {
        $photo_galleries = PhotoGallery::all();

        if ($photo_galleries) {
            return response()->json([
                'status' => 200,
                'photo_galleries' => $photo_galleries,
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'Not Found.',
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

    //Store New Record
    public function store(Request $request)
    {
        if ($request->isMethod('post')) {

            //Validation
            $validator = Validator::make(
                $request->all(),
                [
                    'title' => 'required',
                    'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
                    'description' => 'nullable',
                ],
                //custom validation message
                [
                    'title.required' => 'Title Is Required',
                ]
            );

            if ($validator->fails()) {

                return response()->json([
                    'status' => '400',
                    'errors' => $validator->errors(),
                ]);
            }

            //insert new record
            $photo_gallery = new PhotoGallery();
            $photo_gallery->title = $request->title;
            //create slug
            $slug = Str::slug($request->title, '-');
            $slug_check = PhotoGallery::where('slug', $slug)->count();
            if ($slug_check > 0) {
                $slug = time() . '-' . $slug;
            }

            $photo_gallery->slug = $slug;
            $photo_gallery->description = $request->description;

            //image upload
            if ($request->hasFile('image')) {
                $image = $request->file('image');
                $new_name = time() . '.' . $request->image->getClientOriginalExtension();
                $path = '/common_image/photo_gallery/';
                $image->move(public_path($path), $new_name);
                $photo_gallery->image = $path . $new_name;
            }

            $photo_gallery->save();

            return response()->json([
                'status' => 200,
                'message' => 'Data Inserted Successful.',
                'photo_gallery' => $photo_gallery,
            ]);
        }
    }

    //show single photo gallery
    public function show($id)
    {
        $single_photo_gallery = PhotoGallery::find($id);

        if ($single_photo_gallery) {
            return response()->json([
                'status' => 200,
                'single_photo_gallery' => $single_photo_gallery,
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'Not Found.',
            ]);
        }
    }

    // Edit photo gallery
    public function edit($id)
    {
        $single_phpto_gallery = PhotoGallery::find($id);

        if ($single_phpto_gallery) {
            return response()->json([
                'status' => 200,
                'single_phpto_gallery' => $single_phpto_gallery,
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'Not Found.',
            ]);
        }
    }

    // Update Photo Gallery
    public function update(Request $request, $id)
    {
        $single_phpto_gallery = PhotoGallery::find($id);

        if ($single_phpto_gallery) {

            //Validation
            $validator = Validator::make(
                $request->all(),
                [
                    'title' => 'required',
                    'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
                    'description' => 'nullable',
                ],
                //custom validation message
                [
                    'title.required' => 'Title Is Required',
                ]
            );
            if ($validator->fails()) {

                return response()->json([
                    'status' => '400',
                    'errors' => $validator->errors(),
                ]);
            }

            $single_phpto_gallery->title = $request->title;
            //create slug
            $slug = Str::slug($request->title, '-');
            $slug_check = PhotoGallery::where('slug', $slug)->where('id', '!=', $id)->count();
            if ($slug_check > 0) {
                $slug = time() . '-' . $slug;
            }
            $single_phpto_gallery->slug = $slug;

            $single_phpto_gallery->description = $request->description;

            //image upload
            if ($request->hasFile('image')) {
                //remove old image form folder if new image comes
                if ($single_phpto_gallery->image != null || $single_phpto_gallery->image != "") {
                    $image_file = public_path($single_phpto_gallery->image);
                    if (file_exists($image_file)) {
                        unlink($image_file);
                    }
                }
                $image = $request->file('image');
                $new_name = time() . '.' . $request->image->getClientOriginalExtension();
                $path = '/common_image/photo_gallery/';
                $image->move(public_path($path), $new_name);
                $single_phpto_gallery->image = $path . $new_name;
            }

            $single_phpto_gallery->save();

            return response()->json([
                'status' => 200,
                'message' => 'Updated Successful.',
                'single_phpto_gallery' => $single_phpto_gallery,
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'Not Found.',
            ]);
        }
    }

    //Delete Photo Gallery
    public function destroy($id)
    {
        $model = PhotoGallery::find($id);

        if ($model) {
            //remove image form folder
            if ($model->image != null || $model->image != "") {
                $image_file = public_path($model->image);
                if (file_exists($image_file)) {
                    unlink($image_file);
                }
            }
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
