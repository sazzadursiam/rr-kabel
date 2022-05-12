<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Models\VideoGallery;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class VideoGalleryController extends Controller
{
    //Get All Videos
    public function index()
    {
        $videos = VideoGallery::all();

        if ($videos) {
            return response()->json([
                'status' => 200,
                'videos' => $videos,
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'Not Found.',
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
                    'title' => 'required',
                    'video' => 'required',
                    'description' => 'nullable',
                ],
                //custom validation message
                [
                    'title.required' => 'Title Is Required',
                    'video.required' => 'Video Link Is Required',
                ]
            );

            if ($validator->fails()) {

                return response()->json([
                    'status' => '400',
                    'errors' => $validator->errors(),
                ]);
            }

            //insert new record
            $model = new VideoGallery();
            $model->title = $request->title;
            //create slug
            $slug = Str::slug($request->title, '-');
            $slug_check = VideoGallery::where('slug', $slug)->count();
            if ($slug_check > 0) {
                $slug = time() . '-' . $slug;
            }

            $model->slug = $slug;
            $model->description = $request->description;
            $model->video = $request->video;

            $model->save();

            return response()->json([
                'status' => 200,
                'message' => 'Data Inserted Successful.',
                'video_gallery' => $model,
            ]);
        }
    }

    // Single video show
    public function show($id)
    {
        $single_video = VideoGallery::find($id);

        if ($single_video) {
            return response()->json([
                'status' => 200,
                'video_gallery' => $single_video,
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'Not Found.',
            ]);
        }
    }

    // Edit video gallery
    public function edit($id)
    {
        $single_video_gallery = VideoGallery::find($id);

        if ($single_video_gallery) {
            return response()->json([
                'status' => 200,
                'video_gallery' => $single_video_gallery,
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'Not Found.',
            ]);
        }
    }

    // Update Video Gallery
    public function update(Request $request, $id)
    {
        $model = VideoGallery::find($id);

        if ($model) {

            //Validation
            $validator = Validator::make(
                $request->all(),
                [
                    'title' => 'required',
                    'video' => 'required',
                    'description' => 'nullable',
                ],
                //custom validation message
                [
                    'title.required' => 'Title Is Required',
                    'video.required' => 'Video Link Is Required',
                ]
            );
            if ($validator->fails()) {

                return response()->json([
                    'status' => '400',
                    'errors' => $validator->errors(),
                ]);
            }

            $model->title = $request->title;
            //create slug
            $slug = Str::slug($request->title, '-');
            $slug_check = VideoGallery::where('slug', $slug)->where('id', '!=', $id)->count();
            if ($slug_check > 0) {
                $slug = time() . '-' . $slug;
            }
            $model->slug = $slug;

            $model->description = $request->description;
            $model->video = $request->video;

            $model->save();

            return response()->json([
                'status' => 200,
                'message' => 'Updated Successful.',
                'video_gallery' => $model,
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'Not Found.',
            ]);
        }
    }

    //Delete Video Gallery
    public function destroy($id)
    {
        $model = VideoGallery::find($id);

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
